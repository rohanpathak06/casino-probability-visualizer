import React, { useEffect, useState } from 'react';
import './CardShared.css';
import './ProbGaugeCard.css';

export default function ProbGaugeCard({ winProb }) {
  const [offset, setOffset] = useState(283); // initial max offset
  const radius = 90;
  const circumference = Math.PI * radius; // ~282.7

  // Calculate specific dash offset based on percentage
  useEffect(() => {
    // delay slightly to allow mount animation
    const timer = setTimeout(() => {
      const percentage = Math.max(0, Math.min(100, winProb)) / 100;
      setOffset(circumference - (percentage * circumference));
    }, 100);
    return () => clearTimeout(timer);
  }, [winProb, circumference]);

  const pLabel = winProb.toFixed(2);
  const houseLabel = (100 - winProb).toFixed(2);
  const isWin = winProb > 50;
  const isLose = winProb < 50;

  let gaugeColor = 'var(--text-primary)';
  if (isWin) gaugeColor = 'var(--prob-win)';
  if (isLose) gaugeColor = 'var(--prob-lose)';

  return (
    <div className="bento-card prob-gauge-card">
      <div className="card-header">
        <span className="card-eyebrow">[ MODEL ]</span>
        <h2 className="card-title">Run Probability</h2>
      </div>
      
      <div className="gauge-container">
        <svg className="gauge-svg" viewBox="0 0 200 110">
          <path
            className="gauge-track"
            d="M 10 100 A 90 90 0 0 1 190 100"
            fill="none"
          />
          <path
            className="gauge-fill"
            d="M 10 100 A 90 90 0 0 1 190 100"
            fill="none"
            stroke={gaugeColor}
            strokeDasharray={circumference}
            strokeDashoffset={offset}
          />
        </svg>
        <div className="gauge-center-content">
          <div className="gauge-number mono">{pLabel}%</div>
          <div className="gauge-label">Win Probability</div>
        </div>
      </div>

      <div className="gauge-pills">
        <div className="pill player-pill">
          PL: {pLabel}%
        </div>
        <div className="pill house-pill">
          HS: {houseLabel}%
        </div>
      </div>
    </div>
  );
}
