import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import NavBar from './components/NavBar';
import Footer from './components/footer';
import LobbySetup from './components/LobbySetup';
import HowToPlay from './components/HowToPlay';
import Test from './components/Test';
import Lobby from './components/Lobby';
import Game from './components/Game';

function App() {
  return (
    <Router>
      <div className='App bg-gradient-to-b from-[#7D00C6] to-[#DF00A4] min-h-screen flex flex-col'>
        <div className='content flex-grow'>
          <NavBar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/howtoplay" element={<HowToPlay/>} />
            <Route path="/lobby-setup" element={<LobbySetup />} />
            <Route path="/lobby" element={<Lobby />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
