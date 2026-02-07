import React from 'react';
import './Header.css';

export default function Header() {
  return (
    <header className="header">
      <div className="header-content">
        <div className="header-logo">
          <div className="logo-icon">
            <span className="dice">⚄</span>
            <span className="dice">⚁</span>
          </div>
          <div className="header-text">
            <h1 className="header-title">Casino Mathematics</h1>
            <p className="header-subtitle">Understanding the House Edge</p>
          </div>
        </div>
        
        <div className="header-stats">
          <div className="stat-chip">
            <span className="stat-label">Educational Tool</span>
          </div>
        </div>
      </div>
      
      <div className="header-divider"></div>
    </header>
  );
}
