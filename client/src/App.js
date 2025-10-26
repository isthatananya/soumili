import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Hero from './components/Hero';
import Puzzle from './components/Puzzle';
import SurpriseGateway from './components/SurpriseGateway';
import MessageBoard from './components/MessageBoard';
import HallOfMemoirs from './components/HallOfMemoirs';
import CandyMemoryMachine from './components/CandyMemoryMachine';
import EasterEggHunt from './components/EasterEggHunt';

function App() {
  return (
    <Router>
      <div className="App min-h-screen bg-gradient-to-br from-pixel-pink to-pixel-white">
        <Routes>
          <Route path="/" element={
            <div className="space-y-0">
              <Hero />
              <Puzzle />
              <SurpriseGateway />
            </div>
          } />
          <Route path="/messages" element={<MessageBoard />} />
          <Route path="/memoirs" element={<HallOfMemoirs />} />
          <Route path="/candy" element={<CandyMemoryMachine />} />
          <Route path="/egghunt" element={<EasterEggHunt />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
