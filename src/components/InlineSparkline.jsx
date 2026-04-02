import React from 'react';

export default function InlineSparkline({ data, positiveTrend = true }) {
  if (!data || data.length < 2) return null;

  const width = 60;
  const height = 24;
  
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const stepX = width / (data.length - 1);

  const points = data.map((val, i) => {
    const x = i * stepX;
    const y = height - ((val - min) / range) * height;
    return `${x},${y}`;
  }).join(' ');

  const strokeColor = positiveTrend ? 'var(--accent)' : 'var(--prob-lose)';

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
      <polyline 
        points={points} 
        stroke={strokeColor} 
        strokeWidth="1.2" 
        fill="none" 
        strokeLinejoin="round" 
        strokeLinecap="round"
      />
    </svg>
  );
}
