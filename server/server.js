const express = require('express');
const http = require('http');
const path = require('path')
const { Server } = require('socket.io');

const PORT = 5000;

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static(path.join(__dirname, '../client/public')));

io.on('connection', (socket) => {
  console.log(`${socket.id} connected`);
})

server.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
})