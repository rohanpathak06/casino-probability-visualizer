import React from 'react';
import './CardShared.css';
import './HouseEdgeCard.css';

export default function HouseEdgeCard({ totalEdge, breakdown }) {
  if (!breakdown) return null;
  
  const maxImpact = Math.max(...breakdown.map(b => b.impact), 1);

  return (
    <div className="bento-card house-edge-card">
      <div className="card-header">
        <span className="card-eyebrow">[ HOUSE EDGE ]</span>
        <h2 className="card-title">Risk Factors</h2>
      </div>

      <div className="edge-list">
        {breakdown.map((item, i) => {
          const width = `${Math.min(100, Math.max(0, (item.impact / maxImpact) * 100))}%`;
          
          return (
            <div key={i} className="edge-row">
              <div className="edge-bg-bar" style={{ width }} />
              <span className="edge-factor relative z-1">{item.factor}</span>
              <span className="edge-value mono relative z-1">
                {item.impact > 0 ? '+' : ''}{item.impact.toFixed(2)}%
              </span>
            </div>
          );
        })}
      </div>

      <div className="edge-total">
        <span>Total House Edge</span>
        <span className="total-val mono">{totalEdge.toFixed(2)}%</span>
      </div>
    </div>
  );
}
