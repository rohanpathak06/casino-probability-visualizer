import React from 'react';
import './CardShared.css';
import './ExpectedValueCard.css';

export default function ExpectedValueCard({ expectedValue }) {
  const isNeg = expectedValue < 0;
  const evColorClass = isNeg ? 'ev-neg' : 'ev-pos';
  const borderClass = isNeg ? 'border-neg' : 'border-pos';

  const evVal = Math.abs(expectedValue).toFixed(2);
  const sign = isNeg ? '-' : '+';
  
  const ev100 = (expectedValue * 100).toFixed(2);
  const ev1000 = (expectedValue * 1000).toFixed(2);

  return (
    <div className={`bento-card ev-card ${borderClass}`}>
      <div className="card-header">
        <span className="card-eyebrow">[ EXPECTED VALUE ]</span>
      </div>

      <div className={`ev-main mono ${evColorClass}`}>
        {sign}${evVal}
      </div>
      <div className="ev-formula">
        EV = (Win Prob × Payout) − (Loss Prob × Bet)
      </div>

      <hr className="ev-divider" />

      <div className="ev-projections">
        <div className="ev-row">
          <span className="ev-proj-label">Over 100 hands:</span>
          <span className={`ev-proj-val mono ${evColorClass}`}>
            {expectedValue < 0 ? '-' : '+'}${Math.abs(ev100).toFixed(2)}
          </span>
        </div>
        <div className="ev-row">
          <span className="ev-proj-label">Over 1,000 hands:</span>
          <span className={`ev-proj-val mono ${evColorClass}`}>
             {expectedValue < 0 ? '-' : '+'}${Math.abs(ev1000).toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  );
}
