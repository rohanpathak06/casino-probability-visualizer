import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { crapsCalculations, formatPercent } from '../utils/calculations';
import './RouletteVisualizer.css';

export default function CrapsVisualizer() {
  const bets = crapsCalculations.getBets();
  
  // Sort bets by house edge
  const sortedBets = [...bets].sort((a, b) => a.houseEdge - b.houseEdge);

  return (
    <div className="visualizer-container">
      <div className="visualizer-header">
        <h2 className="visualizer-title">Craps Analysis</h2>
        <p className="visualizer-description">
          Understanding the wide range of house edges in craps
        </p>
      </div>

      <div className="chart-section">
        <h3 className="chart-title">House Edge by Bet Type</h3>
        <p className="chart-subtitle">
          Craps offers both the best and worst bets in the casino - choose wisely!
        </p>
        <div className="chart-container">
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={sortedBets} layout="horizontal">
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis type="number" stroke="#cbd5e1" unit="%" />
              <YAxis 
                dataKey="name" 
                type="category" 
                stroke="#cbd5e1"
                width={150}
                fontSize={12}
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
              <Bar dataKey="houseEdge" radius={[0, 8, 8, 0]}>
                {sortedBets.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={
                      entry.houseEdge < 2 ? '#10b981' : 
                      entry.houseEdge < 6 ? '#f59e0b' : 
                      '#ef4444'
                    } 
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bets-grid">
        <div className="bet-category good">
          <h3 className="category-title">
            <span className="category-icon">✅</span>
            Good Bets (Low House Edge)
          </h3>
          {bets.filter(b => b.houseEdge < 2).map((bet, i) => (
            <div key={i} className="bet-card">
              <div className="bet-header">
                <h4 className="bet-name">{bet.name}</h4>
                <span className="bet-edge good">{formatPercent(bet.houseEdge)}</span>
              </div>
              <p className="bet-description">{bet.description}</p>
            </div>
          ))}
        </div>

        <div className="bet-category medium">
          <h3 className="category-title">
            <span className="category-icon">⚠️</span>
            Fair Bets (Medium House Edge)
          </h3>
          {bets.filter(b => b.houseEdge >= 2 && b.houseEdge < 10).map((bet, i) => (
            <div key={i} className="bet-card">
              <div className="bet-header">
                <h4 className="bet-name">{bet.name}</h4>
                <span className="bet-edge medium">{formatPercent(bet.houseEdge)}</span>
              </div>
              <p className="bet-description">{bet.description}</p>
            </div>
          ))}
        </div>

        <div className="bet-category bad">
          <h3 className="category-title">
            <span className="category-icon">❌</span>
            Bad Bets (High House Edge)
          </h3>
          {bets.filter(b => b.houseEdge >= 10).map((bet, i) => (
            <div key={i} className="bet-card">
              <div className="bet-header">
                <h4 className="bet-name">{bet.name}</h4>
                <span className="bet-edge bad">{formatPercent(bet.houseEdge)}</span>
              </div>
              <p className="bet-description">{bet.description}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="info-box">
        <h4 className="info-title">💡 Key Insights</h4>
        <ul className="info-list">
          <li>Craps has the <strong>best and worst bets</strong> in the casino at the same table</li>
          <li>Pass Line with odds (0.85%) is one of the best bets you can make in any casino game</li>
          <li><strong>"Odds" bets</strong> have zero house edge - the casino pays true odds</li>
          <li>Center table "proposition bets" like Any 7 (16.67%) are terrible for players</li>
          <li>The more complicated and exciting-sounding the bet, the worse it usually is</li>
          <li>Stick to Pass/Don't Pass with maximum odds for the best chance</li>
        </ul>
      </div>
    </div>
  );
}
