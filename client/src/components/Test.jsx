import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { io } from 'socket.io-client';
import { socket } from './LobbySetup';

//import { createLobby, joinLobby } from '../services/lobbyServices';

function Test() {
    const [playerName, setPlayerName] = useState('');
    const [lobbyCode, setLobbyCode] = useState('');
    const navigate = useNavigate();

    function createLobby() {
        socket.emit('createLobby', playerName.trim(), (response) => {
            if (response.status === 'Success') {
                console.log(`Lobby created by: ${playerName}`);
                navigate('/lobby');
            }
            console.log(response.error);
        });
    }

    function joinLobby() {
        socket.emit(
            'joinLobby',
            { lobbyId: lobbyCode, playerName: playerName.trim() },
            (response) => {
                if (response.status === 'Success') {
                    console.log(`Lobby join by: ${playerName}`);
                    navigate('/lobby');
                }
                console.log(response.error);
            }
        );
    }

    return (
        <div>
            <h1>Test Page</h1>
            <input
                type="text"
                placeholder="Enter your name"
                value={playerName}
                onChange={(e) => setPlayerName(e.target.value)}
            />
            <button onClick={createLobby}>Create Lobby</button>
            <hr />
            <input
                type="text"
                placeholder="Enter lobby code"
                value={lobbyCode}
                onChange={(e) => setLobbyCode(e.target.value)}
            />
            <button onClick={joinLobby}>Join Lobby</button>
        </div>
    );
}

export default Test;
