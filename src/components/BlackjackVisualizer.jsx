import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { blackjackCalculations, formatPercent } from '../utils/calculations';
import './RouletteVisualizer.css';

export default function BlackjackVisualizer() {
  const [numHands, setNumHands] = useState(100);
  const [betSize, setBetSize] = useState(25);
  const [strategy, setStrategy] = useState('perfectStrategy');

  const strategies = Object.keys(blackjackCalculations).map(key => ({
    key,
    ...blackjackCalculations[key]
  }));

  const currentStrategy = blackjackCalculations[strategy];
  const houseEdge = currentStrategy.getHouseEdge();
  const expectedLoss = numHands * betSize * (houseEdge / 100);

  // Chart data for different strategies
  const chartData = strategies.map(s => ({
    name: s.getName(),
    houseEdge: s.getHouseEdge(),
    expectedLoss: numHands * betSize * (s.getHouseEdge() / 100)
  }));

  return (
    <div className="visualizer-container">
      <div className="visualizer-header">
        <h2 className="visualizer-title">Blackjack Analysis</h2>
        <p className="visualizer-description">
          How your strategy affects the house edge
        </p>
      </div>

      <div className="controls-panel">
        <div className="control-group">
          <label className="control-label">Your Strategy</label>
          <div className="button-group">
            {strategies.map((s) => (
              <button
                key={s.key}
                className={`toggle-btn ${strategy === s.key ? 'active' : ''}`}
                onClick={() => setStrategy(s.key)}
              >
                {s.getName()}
              </button>
            ))}
          </div>
        </div>

        <div className="control-group">
          <label className="control-label">Number of Hands: {numHands}</label>
          <input
            type="range"
            min="10"
            max="1000"
            step="10"
            value={numHands}
            onChange={(e) => setNumHands(Number(e.target.value))}
            className="slider"
          />
        </div>

        <div className="control-group">
          <label className="control-label">Bet Size per Hand: ${betSize}</label>
          <input
            type="range"
            min="5"
            max="100"
            step="5"
            value={betSize}
            onChange={(e) => setBetSize(Number(e.target.value))}
            className="slider"
          />
        </div>
      </div>

      <div className="stats-grid">
        <div className="stat-card highlight">
          <div className="stat-icon">📊</div>
          <div className="stat-content">
            <div className="stat-value">
              {houseEdge > 0 ? '+' : ''}{formatPercent(houseEdge)}
            </div>
            <div className="stat-label">House Edge</div>
            <div className="stat-description">
              {currentStrategy.getDescription()}
            </div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">💸</div>
          <div className="stat-content">
            <div className="stat-value">
              ${Math.abs(expectedLoss).toFixed(2)}
            </div>
            <div className="stat-label">
              Expected {expectedLoss > 0 ? 'Loss' : 'Gain'}
            </div>
            <div className="stat-description">
              After {numHands} hands at ${betSize}/hand
            </div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">🎲</div>
          <div className="stat-content">
            <div className="stat-value">${numHands * betSize}</div>
            <div className="stat-label">Total Wagered</div>
            <div className="stat-description">
              {numHands} hands × ${betSize}
            </div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">⏱️</div>
          <div className="stat-content">
            <div className="stat-value">{Math.round(numHands / 60)} hrs</div>
            <div className="stat-label">Playing Time</div>
            <div className="stat-description">
              At ~60 hands per hour
            </div>
          </div>
        </div>
      </div>

      <div className="chart-section">
        <h3 className="chart-title">House Edge by Strategy</h3>
        <p className="chart-subtitle">
          Notice how strategy dramatically affects the house edge
          {strategies.some(s => s.getHouseEdge() < 0) && ' (negative = player advantage!)'}
        </p>
        <div className="chart-container">
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis 
                dataKey="name" 
                stroke="#cbd5e1"
                angle={-15}
                textAnchor="end"
                height={100}
                fontSize={12}
              />
              <YAxis 
                stroke="#cbd5e1"
                label={{ value: 'House Edge (%)', angle: -90, position: 'insideLeft', fill: '#cbd5e1' }}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1e293b', 
                  border: '1px solid #334155',
                  borderRadius: '8px',
                  color: '#f8fafc'
                }}
                formatter={(value) => [formatPercent(value), 'House Edge']}
              />
              <Bar dataKey="houseEdge" radius={[8, 8, 0, 0]}>
                {chartData.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={entry.houseEdge < 0 ? '#10b981' : entry.houseEdge < 2 ? '#f59e0b' : '#ef4444'} 
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="info-box">
        <h4 className="info-title">💡 Key Insights</h4>
        <ul className="info-list">
          <li>Blackjack has the <strong>lowest house edge</strong> of any casino game when played with perfect strategy</li>
          <li>Basic strategy reduces the house edge to around <strong>0.5%</strong> - compared to 2-4% for average players</li>
          <li><strong>Card counting</strong> can actually give skilled players an advantage, which is why casinos ban it</li>
          <li>Every mistake you make increases the house edge - learning basic strategy is crucial</li>
          <li>Even with perfect strategy, the house still wins in the long run (just more slowly)</li>
          <li>Insurance and side bets typically have much higher house edges - avoid them!</li>
        </ul>
      </div>
    </div>
  );
}
