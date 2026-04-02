import React from 'react';
import './HeroStatBand.css';

export default function HeroStatBand({ stats }) {
  const formatPercentage = (val) => Number(val).toFixed(2) + '%';
  const formatCurrency = (val) => {
    const isNeg = val < 0;
    const num = Math.abs(val);
    return (isNeg ? '-' : '') + '$' + num.toFixed(2);
  };

  const getProbColor = (prob) => {
    if (prob > 50) return 'var(--prob-win)';
    if (prob < 50) return 'var(--prob-lose)';
    return 'var(--text-primary)';
  };

  return (
    <div className="hero-stat-band">
      <div className="stat-block">
        <label className="stat-label">WIN PROBABILITY</label>
        <div className="stat-value mono" style={{ color: getProbColor(stats.winProb) }}>
          {formatPercentage(stats.winProb)}
        </div>
      </div>
      <div className="stat-divider" />
      
      <div className="stat-block">
        <label className="stat-label">HOUSE EDGE</label>
        <div className="stat-value mono">
          {formatPercentage(stats.houseEdge)}
        </div>
      </div>
      <div className="stat-divider" />
      
      <div className="stat-block">
        <label className="stat-label">EXPECTED VALUE</label>
        <div className="stat-value mono" style={{ color: stats.expectedValue < 0 ? 'var(--prob-lose)' : 'var(--prob-win)' }}>
          {formatCurrency(stats.expectedValue)}
        </div>
      </div>
      <div className="stat-divider" />
      
      <div className="stat-block">
        <label className="stat-label">RETURN TO PLAYER</label>
        <div className="stat-value mono">
          {formatPercentage(stats.rtp)}
        </div>
      </div>
    </div>
  );
}
