import React, { useState, useEffect } from 'react';
import HeaderNav from './components/HeaderNav';
import HeroStatBand from './components/HeroStatBand';
import GameSelectorCard from './components/GameSelectorCard';
import ProbGaugeCard from './components/ProbGaugeCard';
import DistributionChartCard from './components/DistributionChartCard';
import SessionControlsCard from './components/SessionControlsCard';
import StreakVisualizer from './components/StreakVisualizer';
import OutcomeTableCard from './components/OutcomeTableCard';
import ExpectedValueCard from './components/ExpectedValueCard';
import HouseEdgeCard from './components/HouseEdgeCard';
import { runSimulation } from './utils/simulation';

import './App.css';

export default function App() {
  const [sessionConfig, setSessionConfig] = useState({
    gameId: 'bj',
    rounds: 1000,
    bankroll: 1000,
    betSize: 10,
    strategy: 'Optimal'
  });

  const [simData, setSimData] = useState(null);

  const triggerSimulation = (config) => {
    setSessionConfig(config);
    const data = runSimulation(config);
    setSimData(data);
  };

  useEffect(() => {
    triggerSimulation(sessionConfig);
  }, []);

  if (!simData) return <div className="loading">Initializing Terminal...</div>;

  return (
    <div className="terminal-app">
      <HeaderNav />
      <main className="dashboard-content">
        <HeroStatBand stats={simData.stats} />
        
        <div className="bento-grid">
          {/* Main Layout Rows using CSS Grid Area approach or standard columns */}
          
          {/* Left Column (Primary Viz) */}
          <div className="bento-col main-biz">
            <div className="row flex-gap">
              <ProbGaugeCard winProb={simData.stats.winProb} />
              <DistributionChartCard />
            </div>
            <StreakVisualizer 
              streakData={simData.streakData.slice(0, 80)} // Show slice to fit nicely
              pushCount={simData.pushCount}
              maxWinStreak={simData.maxWinStreak}
              maxLoseStreak={simData.maxLoseStreak}
            />
            <div className="row flex-gap align-start">
              <OutcomeTableCard outcomes={simData.outcomes} />
              <ExpectedValueCard expectedValue={simData.stats.expectedValue} />
            </div>
          </div>

          {/* Right Column (Controls & Config) */}
          <div className="bento-col side-viz">
            <SessionControlsCard 
              config={sessionConfig} 
              onRun={triggerSimulation} 
            />
            <GameSelectorCard 
              activeGameId={sessionConfig.gameId} 
              onSelectGame={id => triggerSimulation({...sessionConfig, gameId: id})}
            />
            <HouseEdgeCard 
              totalEdge={simData.stats.houseEdge} 
              breakdown={simData.houseEdgeBreakdown} 
            />
          </div>

        </div>
      </main>
    </div>
  );
}
