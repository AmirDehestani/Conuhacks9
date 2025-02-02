import { io } from 'socket.io-client'

const socket = io('http://localhost:5000');

export function createLobby(playerName) {
    socket.emit('createLobby', playerName.trim(), (response) => {
        if (response.status === 'Success') {
            console.log(`Lobby created by: ${playerName}`);
            return true;
        }
        console.log(response.error);
        return false;
    });
  }

export function joinLobby(lobbyCode, playerName) {    
    socket.emit('joinLobby', {lobbyId: lobbyCode, playerName: playerName.trim()}, (response) => {
        if (response.status === 'Success') {
            console.log(`Lobby join by: ${playerName}`);
            return true;
        }
        console.log(response.error);
        return false;
    });
  }