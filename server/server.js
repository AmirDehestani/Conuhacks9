import app from './app.js';
import http from 'http';
import config from './utils/config.js';
import { setupSocket } from './socket.js';

const server = http.createServer(app);
setupSocket(server);

server.listen(config.PORT, () => {
    console.log(`Server is running at http://localhost:${config.PORT}`);
});
