import React, { useState } from 'react'
import { io } from 'socket.io-client'

const socket = io('http://localhost:5000');

function Test() {
    const [playerName, setPlayerName] = useState('');

  function createGame() {
    if (!playerName.trim()) {
      alert("Please enter your name before creating a lobby.");
      return;
    }

    socket.emit('createLobby', { name: playerName });
    console.log(`Lobby created by: ${playerName}`);
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
      
      <button onClick={createGame}>
        Create Game
      </button>
    </div>
  )
}

export default Test