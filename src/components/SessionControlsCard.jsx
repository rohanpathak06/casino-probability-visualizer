import React, { useState } from 'react';
import './CardShared.css';
import './SessionControlsCard.css';

export default function SessionControlsCard({ config, onRun }) {
  const [localConfig, setLocalConfig] = useState(config);

  const handleRun = () => {
    onRun(localConfig);
  };

  return (
    <div className="bento-card session-controls-card">
      <div className="card-header">
        <span className="card-eyebrow">[ CONFIG ]</span>
        <h2 className="card-title">Session Parameters</h2>
      </div>

      <div className="form-grid">
        <div className="input-group">
          <label>ROUNDS</label>
          <input 
            type="number" 
            className="input" 
            value={localConfig.rounds} 
            onChange={e => setLocalConfig({...localConfig, rounds: Number(e.target.value)})}
          />
        </div>
        
        <div className="input-group">
          <label>STARTING BANKROLL</label>
          <input 
            type="number" 
            className="input" 
            value={localConfig.bankroll} 
            onChange={e => setLocalConfig({...localConfig, bankroll: Number(e.target.value)})}
          />
        </div>
        
        <div className="input-group">
          <label>BET SIZE</label>
          <input 
            type="number" 
            className="input" 
            value={localConfig.betSize} 
            onChange={e => setLocalConfig({...localConfig, betSize: Number(e.target.value)})}
          />
        </div>
      </div>

      <div className="strategy-group">
        <label>STRATEGY MODE</label>
        <div className="pill-toggle">
          {['Basic', 'Random', 'Optimal'].map(str => (
            <button
              key={str}
              className={`pill-btn ${localConfig.strategy === str ? 'active' : ''}`}
              onClick={() => setLocalConfig({...localConfig, strategy: str})}
            >
              {str}
            </button>
          ))}
        </div>
      </div>

      <button className="run-btn" onClick={handleRun}>
        RUN SIMULATION →
      </button>
    </div>
  );
}
