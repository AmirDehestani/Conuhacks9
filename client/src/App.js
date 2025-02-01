import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import NavBar from './components/NavBar';
import Footer from './components/footer';

function App() {
  return (
    <Router>
      <div className='App bg-gradient-to-b from-[#7D00C6] to-[#DF00A4] min-h-screen flex flex-col'>
        <div className='content flex-grow'>
          <NavBar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/info" element={<div>Info Page</div>} />
            <Route path="/createJoin" element={<div>Create or Join</div>} />
            <Route path="/lobby" element={<div>Lobby Page</div>} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
