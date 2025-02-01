import { nanoid } from 'nanoid';
import { getGameResult } from './utils/openai.js';
import { Server } from 'socket.io';
import { lobbies } from './routes/lobby.js';

export const setupSocket = (server) => {
    const io = new Server(server, {
        cors: {
            origin: '*',
            methods: ['GET', 'POST']
        },
    });

    io.on('connection', (socket) => {
        console.log(`User connected: ${socket.id}`);

        // Create a lobby
        socket.on('createLobby', (playerName) => {
            const lobbyId = nanoid(8);
            console.log(`User: ${socket.id} created the lobby ${lobbyId}`);
            if(playerName)
            {
                lobbies[lobbyId] = {players: [], hostId: socket.id, items: [], currentTurnIndex: 0};
                lobbies[lobbyId].players.push({id: socket.id, name: playerName});
                socket.join(lobbyId);
                io.to(lobbyId).emit('gameCreated', {status: 'Success'});
            }
        })

        socket.on('join-lobby', (lobbyId, callback) => {
            if (lobbies[lobbyId]) {
                socket.join(lobbyId);
                lobbies[lobbyId].users.push(userId);
                callback({
                    success: true,
                    messages: lobbies[lobbyId].messages,
                    userId,
                    currentTurn:
                        lobbies[lobbyId].users[
                            lobbies[lobbyId].currentTurnIndex
                        ],
                });
            } else {
                callback({ success: false, error: 'Lobby not found' });
            }
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
            console.log(`User disconnected: ${socket.id}`);
        });
    });
};