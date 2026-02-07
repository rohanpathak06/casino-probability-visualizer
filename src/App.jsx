import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from './components/Header';
import GameSelector from './components/GameSelector';
import RouletteVisualizer from './components/RouletteVisualizer';
import BlackjackVisualizer from './components/BlackjackVisualizer';
import SlotsVisualizer from './components/SlotsVisualizer';
import CrapsVisualizer from './components/CrapsVisualizer';
import BankrollSimulator from './components/BankrollSimulator';
import './App.css';

function App() {
  const [selectedGame, setSelectedGame] = useState('roulette');

  const renderGame = () => {
    switch (selectedGame) {
      case 'roulette':
        return <RouletteVisualizer />;
      case 'blackjack':
        return <BlackjackVisualizer />;
      case 'slots':
        return <SlotsVisualizer />;
      case 'craps':
        return <CrapsVisualizer />;
      case 'simulator':
        return <BankrollSimulator />;
      default:
        return <RouletteVisualizer />;
    }
  };

  return (
    <div className="app">
      <Header />
      
      <main className="main-content">
        <GameSelector 
          selectedGame={selectedGame} 
          onSelectGame={setSelectedGame} 
        />
        
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedGame}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {renderGame()}
          </motion.div>
        </AnimatePresence>
      </main>

      <footer className="footer">
        <div className="footer-content">
          <div className="footer-section">
            <h3 className="footer-title">Educational Purpose</h3>
            <p className="footer-text">
              This tool is designed to educate about probability and the mathematical principles 
              behind casino games. Understanding these concepts can help you make informed decisions.
            </p>
          </div>
          
          <div className="footer-section">
            <h3 className="footer-title">The Mathematics Never Lie</h3>
            <p className="footer-text">
              Every casino game has a built-in house edge. While you might win in the short term, 
              the mathematical expectation always favors the house over time. This isn't opinion—it's 
              mathematics.
            </p>
          </div>
          
          <div className="footer-section">
            <h3 className="footer-title">Responsible Gaming</h3>
            <p className="footer-text">
              If you choose to gamble, set strict limits, never bet money you can't afford to lose, 
              and recognize that the house always has a mathematical advantage. Gambling should only 
              be for entertainment, never to make money.
            </p>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p className="footer-disclaimer">
            🎓 Built for educational purposes • Understanding probability helps you make better decisions
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
