import React, { useEffect, useState } from 'react';
import './CardShared.css';
import './StreakVisualizer.css';

export default function StreakVisualizer({ streakData, pushCount, maxWinStreak, maxLoseStreak }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(false);
    const t = setTimeout(() => setMounted(true), 10);
    return () => clearTimeout(t);
  }, [streakData]);

  if (!streakData || streakData.length === 0) {
    return (
      <div className="bento-card streak-visualizer full-width">
        <div className="placeholder-strip">
          <span className="placeholder-text">Run a simulation to see streak data</span>
        </div>
      </div>
    );
  }

  return (
    <div className="bento-card streak-visualizer full-width">
      <div className="card-header">
        <span className="card-eyebrow">[ STREAK MAP ]</span>
        <h2 className="card-title">Session DNA</h2>
      </div>

      <div className="dna-strip">
        {streakData.map((outcome, i) => {
          const typeClass = outcome === 'win' ? 'sq-win' : outcome === 'lose' ? 'sq-lose' : 'sq-push';
          const delayVar = { '--delay': `${i * 8}ms` };
          
          return (
            <div 
              key={i} 
              className={`dna-sq ${typeClass} ${mounted ? 'animate-in' : ''}`}
              style={delayVar}
              title={`Round ${i + 1}: ${outcome.toUpperCase()}`}
            />
          );
        })}
      </div>

      <div className="streak-stats">
        <div className="streak-stat">
          <span className="stat-label">Longest Win Streak:</span>
          <span className="stat-value mono val-win">{maxWinStreak}</span>
        </div>
        <div className="streak-stat">
          <span className="stat-label">Longest Loss Streak:</span>
          <span className="stat-value mono val-lose">{maxLoseStreak}</span>
        </div>
        <div className="streak-stat">
          <span className="stat-label">Pushes:</span>
          <span className="stat-value mono val-push">{pushCount}</span>
        </div>
      </div>
    </div>
  );
}
