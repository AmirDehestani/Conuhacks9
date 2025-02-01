import express from 'express';
import cors from 'cors';
import lobbyRouter from './routes/lobby.js';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/', lobbyRouter);

export default app;
