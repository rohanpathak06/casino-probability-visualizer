import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { slotCalculations, formatPercent, formatCurrency } from '../utils/calculations';
import './RouletteVisualizer.css';

export default function SlotsVisualizer() {
  const [slotType, setSlotType] = useState('average');
  const [spins, setSpins] = useState(1000);
  const [betPerSpin, setBetPerSpin] = useState(1);

  const slots = Object.keys(slotCalculations).map(key => ({
    key,
    ...slotCalculations[key]
  }));

  const currentSlot = slotCalculations[slotType];
  const houseEdge = currentSlot.getHouseEdge();
  const rtp = currentSlot.getRTP();
  const totalWagered = spins * betPerSpin;
  const expectedReturn = totalWagered * (rtp / 100);
  const expectedLoss = totalWagered - expectedReturn;

  // Simulate bankroll over time
  const generateSimulation = () => {
    const data = [];
    let bankroll = totalWagered;
    const returnRate = rtp / 100;
    
    for (let spin = 0; spin <= spins; spin += Math.max(1, Math.floor(spins / 50))) {
      const expected = totalWagered - (spin * betPerSpin * (houseEdge / 100));
      const variance = Math.sqrt(spin) * betPerSpin * 2;
      const randomWalk = (Math.random() - 0.5) * variance;
      
      data.push({
        spin,
        bankroll: Math.max(0, expected + randomWalk),
        expected: Math.max(0, expected)
      });
    }
    
    return data;
  };

  const simulationData = generateSimulation();

  return (
    <div className="visualizer-container">
      <div className="visualizer-header">
        <h2 className="visualizer-title">Slot Machine Analysis</h2>
        <p className="visualizer-description">
          Understanding Return to Player (RTP) and house edge
        </p>
      </div>

      <div className="controls-panel">
        <div className="control-group">
          <label className="control-label">Slot Machine Type</label>
          <div className="button-group">
            {slots.map((s) => (
              <button
                key={s.key}
                className={`toggle-btn ${slotType === s.key ? 'active' : ''}`}
                onClick={() => setSlotType(s.key)}
              >
                {s.getName()}
              </button>
            ))}
          </div>
        </div>

        <div className="control-group">
          <label className="control-label">Number of Spins: {spins}</label>
          <input
            type="range"
            min="100"
            max="10000"
            step="100"
            value={spins}
            onChange={(e) => setSpins(Number(e.target.value))}
            className="slider"
          />
        </div>

        <div className="control-group">
          <label className="control-label">Bet per Spin: {formatCurrency(betPerSpin)}</label>
          <input
            type="range"
            min="0.25"
            max="5"
            step="0.25"
            value={betPerSpin}
            onChange={(e) => setBetPerSpin(Number(e.target.value))}
            className="slider"
          />
        </div>
      </div>

      <div className="stats-grid">
        <div className="stat-card highlight">
          <div className="stat-icon">🎰</div>
          <div className="stat-content">
            <div className="stat-value">{formatPercent(rtp)}</div>
            <div className="stat-label">RTP (Return to Player)</div>
            <div className="stat-description">
              {currentSlot.getDescription()}
            </div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">📉</div>
          <div className="stat-content">
            <div className="stat-value">{formatPercent(houseEdge)}</div>
            <div className="stat-label">House Edge</div>
            <div className="stat-description">
              Casino keeps this percentage
            </div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">💸</div>
          <div className="stat-content">
            <div className="stat-value">{formatCurrency(expectedLoss)}</div>
            <div className="stat-label">Expected Loss</div>
            <div className="stat-description">
              After {spins.toLocaleString()} spins
            </div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">💰</div>
          <div className="stat-content">
            <div className="stat-value">{formatCurrency(expectedReturn)}</div>
            <div className="stat-label">Expected Return</div>
            <div className="stat-description">
              From {formatCurrency(totalWagered)} wagered
            </div>
          </div>
        </div>
      </div>

      <div className="chart-section">
        <h3 className="chart-title">Bankroll Over Time (Simulated)</h3>
        <p className="chart-subtitle">
          Your money gradually depletes due to the house edge. Individual sessions vary, but the trend is always down.
        </p>
        <div className="chart-container">
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={simulationData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis 
                dataKey="spin" 
                stroke="#cbd5e1"
                label={{ value: 'Number of Spins', position: 'insideBottom', offset: -5, fill: '#cbd5e1' }}
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
                formatter={(value) => [formatCurrency(value), '']}
              />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="bankroll" 
                stroke="#f59e0b" 
                strokeWidth={2}
                dot={false}
                name="Simulated Bankroll"
              />
              <Line 
                type="monotone" 
                dataKey="expected" 
                stroke="#ef4444" 
                strokeWidth={2}
                strokeDasharray="5 5"
                dot={false}
                name="Expected (Mathematical)"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="chart-section" style={{ marginTop: 'var(--spacing-lg)' }}>
        <h3 className="chart-title">RTP Comparison Across Slot Types</h3>
        <div className="comparison-grid">
          {slots.map(s => {
            const slotRTP = s.getRTP();
            const slotEdge = s.getHouseEdge();
            return (
              <div key={s.key} className={`comparison-card ${slotType === s.key ? 'active' : ''}`}>
                <div className="comparison-header">
                  <h4>{s.getName()}</h4>
                  <span className="comparison-rtp">{formatPercent(slotRTP)} RTP</span>
                </div>
                <div className="comparison-bar">
                  <div 
                    className="comparison-fill player"
                    style={{ width: `${slotRTP}%` }}
                  >
                    <span className="bar-label">You get: {formatPercent(slotRTP)}</span>
                  </div>
                  <div 
                    className="comparison-fill house"
                    style={{ width: `${slotEdge}%` }}
                  >
                    <span className="bar-label">House: {formatPercent(slotEdge)}</span>
                  </div>
                </div>
                <p className="comparison-description">{s.getDescription()}</p>
                <p className="comparison-math">
                  Per $100 wagered: <strong>{formatCurrency(slotRTP)}</strong> back, 
                  <strong className="loss"> {formatCurrency(slotEdge)}</strong> lost
                </p>
              </div>
            );
          })}
        </div>
      </div>

      <div className="info-box">
        <h4 className="info-title">💡 Key Insights</h4>
        <ul className="info-list">
          <li>Slot machines have <strong>no skill element</strong> - they're pure probability with a guaranteed house edge</li>
          <li>RTP (Return to Player) is the percentage returned over millions of spins - not your session</li>
          <li>A 95% RTP means you lose <strong>$5 for every $100</strong> wagered on average</li>
          <li>Airport and grocery store slots typically have the <strong>worst odds</strong> (75-85% RTP)</li>
          <li>Higher denomination slots usually have better RTP, but you lose money faster</li>
          <li>Progressive jackpots look enticing but come from a portion of everyone's losses</li>
          <li><strong>The house always wins</strong> because the math is programmed in their favor</li>
        </ul>
      </div>
    </div>
  );
}
