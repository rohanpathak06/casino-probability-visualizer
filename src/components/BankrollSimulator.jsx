import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, ReferenceLine } from 'recharts';
import { simulateGames, bankruptcyRisk, formatCurrency, formatPercent } from '../utils/calculations';
import './RouletteVisualizer.css';
import './BankrollSimulator.css';

export default function BankrollSimulator() {
  const [startingBankroll, setStartingBankroll] = useState(1000);
  const [betAmount, setBetAmount] = useState(25);
  const [houseEdge, setHouseEdge] = useState(2.7);
  const [rounds, setRounds] = useState(200);
  const [simulationData, setSimulationData] = useState([]);
  const [isSimulating, setIsSimulating] = useState(false);

  useEffect(() => {
    runSimulation();
  }, [startingBankroll, betAmount, houseEdge, rounds]);

  const runSimulation = () => {
    setIsSimulating(true);
    setTimeout(() => {
      const data = simulateGames(startingBankroll, betAmount, houseEdge, rounds);
      setSimulationData(data);
      setIsSimulating(false);
    }, 100);
  };

  const finalBankroll = simulationData.length > 0 
    ? simulationData[simulationData.length - 1].bankroll 
    : startingBankroll;
  
  const totalWagered = betAmount * rounds;
  const netResult = finalBankroll - startingBankroll;
  const bankruptRisk = bankruptcyRisk(startingBankroll, betAmount, houseEdge, rounds);

  // Calculate expected loss
  const expectedLoss = totalWagered * (houseEdge / 100);
  const expectedBankroll = startingBankroll - expectedLoss;

  return (
    <div className="visualizer-container">
      <div className="visualizer-header">
        <h2 className="visualizer-title">Bankroll Simulator</h2>
        <p className="visualizer-description">
          Watch your money over time with any house edge
        </p>
      </div>

      <div className="controls-panel">
        <div className="control-group">
          <label className="control-label">
            Starting Bankroll: {formatCurrency(startingBankroll)}
          </label>
          <input
            type="range"
            min="100"
            max="10000"
            step="100"
            value={startingBankroll}
            onChange={(e) => setStartingBankroll(Number(e.target.value))}
            className="slider"
          />
        </div>

        <div className="control-group">
          <label className="control-label">
            Bet per Round: {formatCurrency(betAmount)}
          </label>
          <input
            type="range"
            min="1"
            max="200"
            step="1"
            value={betAmount}
            onChange={(e) => setBetAmount(Number(e.target.value))}
            className="slider"
          />
        </div>

        <div className="control-group">
          <label className="control-label">
            House Edge: {formatPercent(houseEdge)}
          </label>
          <input
            type="range"
            min="0.5"
            max="20"
            step="0.1"
            value={houseEdge}
            onChange={(e) => setHouseEdge(Number(e.target.value))}
            className="slider"
          />
          <div className="preset-buttons">
            <button onClick={() => setHouseEdge(0.5)} className="preset-btn">
              Blackjack (0.5%)
            </button>
            <button onClick={() => setHouseEdge(1.4)} className="preset-btn">
              Craps (1.4%)
            </button>
            <button onClick={() => setHouseEdge(2.7)} className="preset-btn">
              Roulette (2.7%)
            </button>
            <button onClick={() => setHouseEdge(5)} className="preset-btn">
              Slots (5%)
            </button>
          </div>
        </div>

        <div className="control-group">
          <label className="control-label">
            Number of Rounds: {rounds}
          </label>
          <input
            type="range"
            min="10"
            max="1000"
            step="10"
            value={rounds}
            onChange={(e) => setRounds(Number(e.target.value))}
            className="slider"
          />
        </div>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">💵</div>
          <div className="stat-content">
            <div className="stat-value">{formatCurrency(finalBankroll)}</div>
            <div className="stat-label">Final Bankroll (Simulated)</div>
            <div className="stat-description">
              Started with {formatCurrency(startingBankroll)}
            </div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">📉</div>
          <div className="stat-content">
            <div className="stat-value" style={{ color: netResult >= 0 ? '#10b981' : '#ef4444' }}>
              {netResult >= 0 ? '+' : ''}{formatCurrency(netResult)}
            </div>
            <div className="stat-label">Net Result</div>
            <div className="stat-description">
              {netResult >= 0 ? 'Lucky run!' : 'Expected outcome'}
            </div>
          </div>
        </div>

        <div className="stat-card highlight">
          <div className="stat-icon">🎯</div>
          <div className="stat-content">
            <div className="stat-value">{formatCurrency(expectedBankroll)}</div>
            <div className="stat-label">Expected Final (Math)</div>
            <div className="stat-description">
              Loss of {formatCurrency(expectedLoss)}
            </div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">⚠️</div>
          <div className="stat-content">
            <div className="stat-value">{formatPercent(bankruptRisk)}</div>
            <div className="stat-label">Bankruptcy Risk</div>
            <div className="stat-description">
              {bankruptRisk > 50 ? 'High risk!' : bankruptRisk > 20 ? 'Moderate risk' : 'Low risk'}
            </div>
          </div>
        </div>
      </div>

      <div className="chart-section">
        <div className="chart-header">
          <div>
            <h3 className="chart-title">Bankroll Progression</h3>
            <p className="chart-subtitle">
              {isSimulating ? 'Running simulation...' : 'Blue line shows one possible outcome. Run again for different results.'}
            </p>
          </div>
          <button onClick={runSimulation} className="simulate-btn">
            🔄 Run New Simulation
          </button>
        </div>
        
        <div className="chart-container">
          <ResponsiveContainer width="100%" height={500}>
            <LineChart data={simulationData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis 
                dataKey="round" 
                stroke="#cbd5e1"
                label={{ value: 'Round Number', position: 'insideBottom', offset: -5, fill: '#cbd5e1' }}
              />
              <YAxis 
                stroke="#cbd5e1"
                label={{ value: 'Bankroll ($)', angle: -90, position: 'insideLeft', fill: '#cbd5e1' }}
                domain={[0, 'auto']}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1e293b', 
                  border: '1px solid #334155',
                  borderRadius: '8px',
                  color: '#f8fafc'
                }}
                formatter={(value, name) => [
                  formatCurrency(value), 
                  name === 'bankroll' ? 'Bankroll' : 'Starting Amount'
                ]}
              />
              <Legend />
              <ReferenceLine 
                y={startingBankroll} 
                stroke="#475569" 
                strokeDasharray="3 3"
                label={{ value: 'Break Even', fill: '#94a3b8' }}
              />
              <ReferenceLine 
                y={expectedBankroll} 
                stroke="#ef4444" 
                strokeDasharray="5 5"
                label={{ value: 'Expected', fill: '#ef4444' }}
              />
              <Line 
                type="monotone" 
                dataKey="bankroll" 
                stroke="#3b82f6" 
                strokeWidth={3}
                dot={false}
                name="Your Bankroll"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="info-box">
        <h4 className="info-title">💡 Understanding the Simulation</h4>
        <ul className="info-list">
          <li>This shows <strong>one possible outcome</strong> - your actual results will vary due to luck (variance)</li>
          <li>The red dashed line shows the <strong>mathematical expectation</strong> - where you'll end up on average</li>
          <li>You might get lucky and win in the short term, but the trend is always toward the house edge</li>
          <li>The longer you play, the closer your actual results will match the mathematical expectation</li>
          <li>Increasing your bet size increases both potential wins and losses (higher variance)</li>
          <li>No betting system can overcome the house edge - the math always catches up</li>
          <li><strong>The house always wins</strong> because they play millions of hands - not just one session</li>
        </ul>
      </div>
    </div>
  );
}
