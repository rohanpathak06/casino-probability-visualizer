import React from 'react';
import './GameSelector.css';

const games = [
  { 
    id: 'roulette', 
    name: 'Roulette', 
    icon: '🎰', 
    edge: '2.7% - 5.26%',
    description: 'Wheel of fortune'
  },
  { 
    id: 'blackjack', 
    name: 'Blackjack', 
    icon: '🃏', 
    edge: '0.5% - 4%',
    description: 'Card counting possible'
  },
  { 
    id: 'slots', 
    name: 'Slot Machines', 
    icon: '🎲', 
    edge: '2% - 15%',
    description: 'Pure chance'
  },
  { 
    id: 'craps', 
    name: 'Craps', 
    icon: '🎲', 
    edge: '1.4% - 16.7%',
    description: 'Dice game'
  },
  { 
    id: 'simulator', 
    name: 'Bankroll Simulator', 
    icon: '💰', 
    edge: 'Variable',
    description: 'See your money over time'
  }
];

export default function GameSelector({ selectedGame, onSelectGame }) {
  return (
    <div className="game-selector">
      <h2 className="selector-title">Choose Your Game</h2>
      <div className="game-grid">
        {games.map((game) => (
          <button
            key={game.id}
            className={`game-card ${selectedGame === game.id ? 'active' : ''}`}
            onClick={() => onSelectGame(game.id)}
          >
            <div className="game-icon">{game.icon}</div>
            <div className="game-info">
              <h3 className="game-name">{game.name}</h3>
              <p className="game-description">{game.description}</p>
              <div className="game-edge">
                <span className="edge-label">House Edge:</span>
                <span className="edge-value">{game.edge}</span>
              </div>
            </div>
            <div className="game-indicator"></div>
          </button>
        ))}
      </div>
    </div>
  );
}
