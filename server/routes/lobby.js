import { nanoid } from 'nanoid';
import express from 'express';

const route = express();
export const lobbies = {};

route.post('/create-lobby', (req, res) => {
    const lobbyId = nanoid(8);
    lobbies[lobbyId] = {
        messages: [],
        users: [],
        currentTurnIndex: 0,
    };
    res.json({ lobbyId });
});

export default route;
