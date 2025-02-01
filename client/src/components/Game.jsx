/*
data we need:
all previous items (array)
current item to beat
all players
players alive
whos turn it is

TODO:
handle playing/eliminated players
disable input messages for all players except current one
prompting openai
*/

import React, { useState } from 'react';


function Game() {
    const [item, setItem] = useState('');

  return (
    <div>
        <h1>Game Page</h1>
        <input
            type="text"
            placeholder="Enter move"
            value={item}
            onChange={(e) => setItem(e.target.value)}
        />
        <button onClick={() => {console.log('move: ', item)}}>Submit move</button>
    </div>
  )
}

export default Game
