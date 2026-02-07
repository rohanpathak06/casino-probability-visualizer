import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { rouletteCalculations, calculateExpectedValue, formatCurrency, formatPercent } from '../utils/calculations';
import './RouletteVisualizer.css';

export default function RouletteVisualizer() {
  const [variant, setVariant] = useState('european');
  const [betAmount, setBetAmount] = useState(10);
  const [selectedBet, setSelectedBet] = useState(0);

  const config = rouletteCalculations[variant];
  const bets = config.getBets();
  const currentBet = bets[selectedBet];
  const expectedValue = calculateExpectedValue(betAmount, currentBet.probability, currentBet.payout);
  const houseEdge = config.getHouseEdge();

  // Prepare chart data
  const chartData = bets.map(bet => ({
    name: bet.name,
    expectedValue: calculateExpectedValue(betAmount, bet.probability, bet.payout),
    houseEdge: ((bet.payout + 1) * bet.probability - 1) * -100
  }));

  return (
    <div className="visualizer-container">
      <div className="visualizer-header">
        <h2 className="visualizer-title">Roulette Analysis</h2>
        <p className="visualizer-description">
          Understanding how the green zero(s) create the house edge
        </p>
      </div>

      <div className="controls-panel">
        <div className="control-group">
          <label className="control-label">Roulette Variant</label>
          <div className="button-group">
            <button
              className={`toggle-btn ${variant === 'european' ? 'active' : ''}`}
              onClick={() => setVariant('european')}
            >
              European (37 pockets)
            </button>
            <button
              className={`toggle-btn ${variant === 'american' ? 'active' : ''}`}
              onClick={() => setVariant('american')}
            >
              American (38 pockets)
            </button>
          </div>
        </div>

        <div className="control-group">
          <label className="control-label">Bet Amount: {formatCurrency(betAmount)}</label>
          <input
            type="range"
            min="1"
            max="100"
            value={betAmount}
            onChange={(e) => setBetAmount(Number(e.target.value))}
            className="slider"
          />
        </div>

        <div className="control-group">
          <label className="control-label">Bet Type</label>
          <select 
            value={selectedBet} 
            onChange={(e) => setSelectedBet(Number(e.target.value))}
            className="select-input"
          >
            {bets.map((bet, index) => (
              <option key={index} value={index}>
                {bet.name} ({bet.numbers} numbers, {bet.payout}:1 payout)
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="stats-grid">
        <div className="stat-card highlight">
          <div className="stat-icon">🎯</div>
          <div className="stat-content">
            <div className="stat-value">{formatPercent(houseEdge)}</div>
            <div className="stat-label">House Edge</div>
            <div className="stat-description">
              {variant === 'european' 
                ? 'With one zero (0)' 
                : 'With two zeros (0, 00) - Worse odds!'}
            </div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">💰</div>
          <div className="stat-content">
            <div className="stat-value">{formatCurrency(expectedValue)}</div>
            <div className="stat-label">Expected Value</div>
            <div className="stat-description">
              Average outcome per {formatCurrency(betAmount)} bet
            </div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">🎲</div>
          <div className="stat-content">
            <div className="stat-value">{formatPercent(currentBet.probability * 100)}</div>
            <div className="stat-label">Win Probability</div>
            <div className="stat-description">
              {currentBet.numbers} out of {config.pockets} pockets
            </div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">📊</div>
          <div className="stat-content">
            <div className="stat-value">{currentBet.payout}:1</div>
            <div className="stat-label">Payout Ratio</div>
            <div className="stat-description">
              Win {formatCurrency(betAmount * currentBet.payout)}
            </div>
          </div>
        </div>
      </div>

      <div className="chart-section">
        <h3 className="chart-title">Expected Value by Bet Type</h3>
        <p className="chart-subtitle">Notice: All bets have negative expected value (you lose money on average)</p>
        <div className="chart-container">
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis 
                dataKey="name" 
                stroke="#cbd5e1"
                angle={-45}
                textAnchor="end"
                height={100}
                fontSize={12}
              />
              <YAxis 
                stroke="#cbd5e1"
                label={{ value: 'Expected Value ($)', angle: -90, position: 'insideLeft', fill: '#cbd5e1' }}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1e293b', 
                  border: '1px solid #334155',
                  borderRadius: '8px',
                  color: '#f8fafc'
                }}
                formatter={(value) => [formatCurrency(value), 'Expected Value']}
              />
              <Bar dataKey="expectedValue" radius={[8, 8, 0, 0]}>
                {chartData.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={index === selectedBet ? '#f59e0b' : '#059669'} 
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
          <li>Every bet in roulette has a <strong>negative expected value</strong> - you lose money on average</li>
          <li>The house edge comes from the green zero(s) - numbers that don't pay on most bets</li>
          <li>European roulette ({formatPercent(rouletteCalculations.european.getHouseEdge())}) is better than American ({formatPercent(rouletteCalculations.american.getHouseEdge())})</li>
          <li>No betting system or strategy can overcome the mathematical house edge</li>
          <li>Over 100 spins, you can expect to lose about {formatPercent(houseEdge)} of your total wagers</li>
        </ul>
      </div>
    </div>
  );
}
