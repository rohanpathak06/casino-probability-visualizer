import React from 'react';
import './CardShared.css';
import './OutcomeTableCard.css';

export default function OutcomeTableCard({ outcomes }) {
  if (!outcomes || outcomes.length === 0) return null;

  const maxProb = Math.max(...outcomes.map(o => o.prob));

  return (
    <div className="bento-card outcome-table-card">
      <div className="card-header">
        <span className="card-eyebrow">[ OUTCOMES ]</span>
        <h2 className="card-title">Event Matrix</h2>
      </div>

      <div className="table-container">
        <div className="table-header">
          <div className="col col-outcome">OUTCOME</div>
          <div className="col col-count">COUNT</div>
          <div className="col col-prob">PROBABILITY</div>
          <div className="col col-ev">EV IMPACT</div>
        </div>

        <div className="table-body">
          {outcomes.map((row, i) => {
            const isWin = row.label === 'Win';
            const isLose = row.label === 'Lose';
            const rowClass = isWin ? 'row-win' : isLose ? 'row-lose' : 'row-neutral';
            const probPct = (row.prob * 100).toFixed(2);
            const barWidth = `${(row.prob / maxProb) * 100}%`;

            return (
              <div key={i} className={`table-row ${rowClass}`}>
                <div className="col col-outcome">{row.label}</div>
                <div className="col col-count mono">{row.count}</div>
                
                <div className="col col-prob prob-cell">
                  <div className="prob-bar" style={{ width: barWidth }} />
                  <span className="mono relative z-1">{probPct}%</span>
                </div>
                
                <div className="col col-ev mono">
                  {row.evImpact < 0 ? '-' : '+'}${Math.abs(row.evImpact).toFixed(2)}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
