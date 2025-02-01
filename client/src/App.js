import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';

function App() {
  return (
    <Router>
      <div className='App'>
        <div className='content'>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/info" element={<div>Info Page</div>} />
            <Route path="/createJoin" element={<div>Create or Join</div>} />
            <Route path="/lobby" element={<div>Lobby Page</div>} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
