import React from 'react';
import { GAMES } from '../utils/simulation';
import './CardShared.css';
import './GameSelectorCard.css';

export default function GameSelectorCard({ activeGameId, onSelectGame }) {
  const getBadgeClass = (rtp) => {
    if (rtp >= 98) return 'badge-high';
    if (rtp >= 94) return 'badge-mid';
    return 'badge-low';
  };

  return (
    <div className="bento-card game-selector-card">
      <div className="card-header">
        <span className="card-eyebrow">[ GAME ]</span>
        <h2 className="card-title">Select Game</h2>
      </div>
      <div className="game-list">
        {GAMES.map(game => {
          const isActive = game.id === activeGameId;
          return (
            <button 
              key={game.id} 
              className={`game-row ${isActive ? 'active' : ''}`}
              onClick={() => onSelectGame(game.id)}
            >
              <span className="game-name">{game.name}</span>
              <span className={`game-rtp-badge mono ${getBadgeClass(game.rtp)}`}>
                {game.rtp.toFixed(2)}%
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
