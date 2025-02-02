import React, { useState, useContext } from 'react';
import {socket} from './LobbySetup'
import { LobbyContext } from '../contexts/LobbyContext.js';


function Game() {
    const [item, setItem] = useState('');
    const { lobbyCode } = useContext(LobbyContext);

    function playerMove()
    {
        socket.emit('playerMove', {lobbyCode, item});
    }

  return (
    <div>
        <h1>Game Page</h1>
        <input
            type="text"
            placeholder="Enter move"
            value={item}
            onChange={(e) => setItem(e.target.value)}
        />
        <button onClick={() => playerMove()}>Submit move</button>
    </div>
  )
}

export default Game