import React, { useState, useEffect } from 'react';
import './CardShared.css';
import './DistributionChartCard.css';

export default function DistributionChartCard({ distributionData = [] }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 50);
    return () => clearTimeout(t);
  }, []);

  // Use dummy data if none provided to ensure the chart always looks "data dense"
  const data = distributionData.length > 0 ? distributionData : Array.from({ length: 21 }, (_, i) => {
    const val = 10 + i;
    const isWin = val >= 20;
    const isNeutral = val === 19;
    
    // Bell curve-ish random
    const prob = Math.exp(-Math.pow(val - 20, 2) / 20) * 15 + (Math.random() * 2);
    
    return {
      label: val,
      prob: prob,
      type: isNeutral ? 'neutral' : isWin ? 'win' : 'lose'
    };
  });

  const maxProb = Math.max(...data.map(d => d.prob), 1);
  const chartHeight = 160;

  return (
    <div className="bento-card dist-chart-card">
      <div className="card-header">
        <span className="card-eyebrow">[ DIST ]</span>
        <h2 className="card-title">Outcome Distribution</h2>
      </div>

      <div className="chart-container">
        {/* Background Grid Lines Mock */}
        <div className="chart-grid">
          <div className="grid-line" style={{ bottom: '25%' }} />
          <div className="grid-line" style={{ bottom: '50%' }} />
          <div className="grid-line" style={{ bottom: '75%' }} />
        </div>

        <div className="chart-bars">
          {data.map((d, i) => {
            const h = mounted ? (d.prob / maxProb) * chartHeight : 0;
            const typeClass = d.type === 'win' ? 'bar-win' : d.type === 'lose' ? 'bar-lose' : 'bar-neutral';
            
            return (
              <div key={i} className="bar-group">
                <div 
                  className={`bar ${typeClass}`} 
                  style={{ height: `${h}px` }}
                  title={`Outcome: ${d.label} | Prob: ${d.prob.toFixed(2)}%`}
                >
                  <div className="tooltip-mock mono">
                    {d.prob.toFixed(1)}%
                  </div>
                </div>
                {i % 4 === 0 && <span className="x-axis-label mono">{d.label}</span>}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
