import { nanoid } from 'nanoid';
import { getGameResult } from './utils/openai.js';
import { Server } from 'socket.io';
import { lobbies } from './routes/lobby.js';

const users = {};

export const setupSocket = (server) => {
    const io = new Server(server, {
        cors: {
            origin: '*',
            methods: ['GET', 'POST'],
        },
    });

    io.on('connection', (socket) => {
        console.log(`User connected: ${socket.id}`);

        // Create a lobby
        socket.on('createLobby', (playerName, callback) => {
            const lobbyId = nanoid(8);
            if (!playerName) {
                callback({
                    status: 'Failed',
                    error: 'Create lobby failed, no player name',
                });
            }
            console.log(`User: ${socket.id} created the lobby ${lobbyId}`);
            lobbies[lobbyId] = {
                players: [],
                hostId: socket.id,
                items: [],
                currentTurnIndex: 0,
            };
            lobbies[lobbyId].players.push({ id: socket.id, name: playerName });
            users[socket.id] = lobbyId; // Store the lobbyId for each user
            socket.join(lobbyId);
            callback({ status: 'Success' });
            return;
        });

        socket.on('joinLobby', ({ lobbyId, playerName }, callback) => {
            if (!lobbies[lobbyId]) {
                callback({
                    status: 'Failed',
                    error: 'Failed to join lobby, lobby not found',
                });
                return;
            }
            if (!playerName) {
                callback({
                    status: 'Failed',
                    error: 'Failed to join lobby, no player name',
                });
                return;
            }

            lobbies[lobbyId].players.push({ id: socket.id, name: playerName });
            users[socket.id] = lobbyId; // Store the lobbyId for each user
            socket.join(lobbyId);
            callback({ status: 'Success' });
            return;
        });

        socket.on('post-message', ({ lobbyId, userId, message }, callback) => {
            const lobby = lobbies[lobbyId];
            if (!lobby) {
                callback({ success: false, error: 'Lobby not found' });
                return;
            }

            const currentUserId = lobby.users[lobby.currentTurnIndex];
            if (userId !== currentUserId) {
                callback({ success: false, error: 'Not your turn' });
                return;
            }

            const newMessage = { userId, message };
            lobby.messages.push(newMessage);

            // Advance the turn
            lobby.currentTurnIndex =
                (lobby.currentTurnIndex + 1) % lobby.users.length;

            // Notify all users in the lobby
            io.to(lobbyId).emit('new-message', {
                message: newMessage,
                currentTurn: lobby.users[lobby.currentTurnIndex],
            });

            if (lobby.currentTurnIndex === 0) {
                const lastTwoMessages = lobby.messages.slice(-2);
                getGameResult(lastTwoMessages[0], lastTwoMessages[1]).then(
                    (result) => {
                        io.to(lobbyId).emit('new-message', {
                            message: {
                                userId: 'server',
                                message: `The winner is ${result.winner}. Reason: ${result.reason}`,
                                image_url: result.image_url,
                            },
                            currentTurn: lobby.users[lobby.currentTurnIndex],
                        });
                    }
                );
            }

            callback({ success: true });
        });

        socket.on('disconnect', () => {
            const lobbyId = users[socket.id];

            if (!lobbyId) {
                return;
            }

            const lobby = lobbies[lobbyId];

            if (!lobby) {
                return;
            }

            delete users[socket.id];

            if (
                lobby.players[lobby.currentTurnIndex].id === socket.id &&
                lobby.currentTurnIndex == lobby.players.length - 1
            ) {
                lobby.currentTurnIndex = 0; // Reset the turn if the leaving player is the last player and it's their turn
            }

            lobby.players = lobby.players.filter(
                (player) => player.id !== socket.id
            );

            if (lobby.players.length === 0) {
                delete lobbies[lobbyId]; // Delete the lobby if no players left
            } else if (lobby.hostId === socket.id) {
                lobby.hostId = lobby.players[0].id; // Assign a new host if the host leaves
            }
        });
    });
};
