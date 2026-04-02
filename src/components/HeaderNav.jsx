import React from 'react';
import './HeaderNav.css';

export default function HeaderNav() {
  return (
    <header className="header-nav">
      <div className="header-left">
        <span className="app-name">RISK-MODEL</span>
        <span className="dot-separator">·</span>
        <span className="page-title">Probability Visualizer</span>
        <span className="eyebrow-tag">[ V1 ]</span>
      </div>
      <div className="header-right">
        <button className="ghost-icon-btn" aria-label="Info">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="16" x2="12" y2="12"></line>
            <line x1="12" y1="8" x2="12.01" y2="8"></line>
          </svg>
        </button>
      </div>
    </header>
  );
}
