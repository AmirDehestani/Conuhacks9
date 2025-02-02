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
            io.to(lobbyId).emit('usersList', lobbies[lobbyId].players, lobbies[lobbyId].hostId); // For existing players to see the new player
            callback({
                status: 'Success',
                lobbyCode: lobbyId,
                players: lobbies[lobbyId].players,
            });
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
            callback({ status: 'Success', players: lobbies[lobbyId].players });

            io.to(lobbyId).emit('usersList', lobbies[lobbyId].players, lobbies[lobbyId].hostId); // For existing players to see the new player
        });

        socket.on('startGame', (lobbyCode) => {
            if (!lobbies[lobbyCode]) return;

            const playerIDs = Object.keys(lobbies[lobbyCode].players);

            // Initialize game state
            lobbies[lobbyCode].game = {
                players: playerIDs, // Ordered list of player IDs
                currentTurnIndex: 0, // Start with the first player
                previousMove: "Rock", // First move is always "Rock"
            };

            const firstPlayerID = playerIDs[0];
            const firstPlayerName = lobbies[lobbyCode].players[firstPlayerID].name; // Get name

            // Notify all players that the game has started
            io.to(lobbyCode).emit("gameStarted", {
                lobbyCode,
                currentTurn: firstPlayerName, // Send the actual name instead of socket ID
            });

            console.log(`Game started in lobby ${lobbyCode}. First turn: ${firstPlayerName}`);
        });

        socket.on("playerMove", async ({ lobbyCode, item }) => {
            console.log('item is:', item);
            console.log('previous item is:', lobbies[lobbyCode].game.previousMove);
            if (!lobbies[lobbyCode]) return;
            
            const game = lobbies[lobbyCode].game;
            const playerID = game.players[game.currentTurnIndex];
            
            // Ensure only the current player can submit a move
            if (socket.id !== playerID) {
              //  return;
            }
    
            const playerName = lobbies[lobbyCode].players[playerID].name; // Get name
            
            
            // Add move to game log
            //const logMessage = `Player ${playerName} played ${move}`;
            //io.to(lobbyCode).emit("updateGameLog", logMessage);
            try
            {
                const result = await getGameResult(game.previousMove, item);
                console.log("Game Result:", result);

                // Move to the next player
                game.previousMove = item;
                game.currentTurnIndex = (game.currentTurnIndex + 1) % game.players.length;
                const nextPlayerID = game.players[game.currentTurnIndex];
                const nextPlayerName = lobbies[lobbyCode].players[nextPlayerID].name;

                console.log(`Next turn: ${nextPlayerName}`);

                // Notify all players whose turn it is
                io.to(lobbyCode).emit("updateGame", {
                    currentTurn: nextPlayerName,
                    result, // Optionally send the result to players
                });

            } catch(e)
            {
                console.error('error getting res');
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
                io.to(lobbyId).emit('usersList', lobby.players);
            } else {
                io.to(lobbyId).emit('usersList', lobby.players);
            }
        });
    });
};
