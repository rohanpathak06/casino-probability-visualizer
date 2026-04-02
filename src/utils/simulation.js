/**
 * Core simulation logic for the Casino Probability Visualizer.
 * Returns visually representative data mapped to the required dashboard components.
 */

export const GAMES = [
  { id: 'bj', name: 'Blackjack', rtp: 99.5, defaultEv: -0.5 },
  { id: 'roulette_eur', name: 'Roulette (European)', rtp: 97.3, defaultEv: -2.7 },
  { id: 'roulette_am', name: 'Roulette (American)', rtp: 94.74, defaultEv: -5.26 },
  { id: 'craps', name: 'Craps', rtp: 98.59, defaultEv: -1.41 },
  { id: 'baccarat', name: 'Baccarat', rtp: 98.94, defaultEv: -1.06 },
  { id: 'slots', name: 'Slots', rtp: 92.0, defaultEv: -8.0 },
];

export function runSimulation(config) {
  const { gameId, rounds, bankroll, betSize, strategy } = config;
  
  const game = GAMES.find(g => g.id === gameId) || GAMES[0];
  
  // Base win probability derived from RTP (simplified mock)
  let winProbBase = (game.rtp / 2) / 100;
  if (strategy === 'Optimal' && game.id === 'bj') winProbBase += 0.01;
  else if (strategy === 'Random') winProbBase -= 0.05;
  
  const winProb = Math.max(0.1, Math.min(0.9, winProbBase));
  const pushProb = game.id === 'bj' ? 0.08 : game.id === 'baccarat' ? 0.09 : 0.02;
  const loseProb = 1 - winProb - pushProb;

  // Streak visualizer array
  const streakData = [];
  let currentWinStreak = 0;
  let currentLoseStreak = 0;
  let maxWinStreak = 0;
  let maxLoseStreak = 0;
  let pushCount = 0;

  for (let i = 0; i < rounds; i++) {
    const r = Math.random();
    if (r < winProb) {
      streakData.push('win');
      currentWinStreak++;
      currentLoseStreak = 0;
      if (currentWinStreak > maxWinStreak) maxWinStreak = currentWinStreak;
    } else if (r < winProb + pushProb) {
      streakData.push('push');
      pushCount++;
      currentWinStreak = 0;
      currentLoseStreak = 0;
    } else {
      streakData.push('lose');
      currentLoseStreak++;
      currentWinStreak = 0;
      if (currentLoseStreak > maxLoseStreak) maxLoseStreak = currentLoseStreak;
    }
  }

  // Outcome distribution data (e.g., specific hand totals or just outcomes)
  const outcomes = [
    { label: 'Win', count: streakData.filter(h => h === 'win').length, prob: winProb, evImpact: winProb * betSize },
    { label: 'Push', count: pushCount, prob: pushProb, evImpact: 0 },
    { label: 'Lose', count: streakData.filter(h => h === 'lose').length, prob: loseProb, evImpact: -loseProb * betSize }
  ];

  // Specific EV Math
  const evPerHand = (winProb * betSize) - (loseProb * betSize);
  const houseEdge = -evPerHand / betSize * 100;

  // Recent history sparkline (mock data centered around 0)
  const sparklineData = Array.from({ length: 20 }, (_, i) => {
    return Math.sin(i * 0.5) * 10 + (Math.random() * 5 - 2.5);
  });

  return {
    game,
    stats: {
      winProb: winProb * 100,
      houseEdge: Math.max(0, houseEdge),
      expectedValue: evPerHand,
      rtp: game.rtp
    },
    streakData,
    maxWinStreak,
    maxLoseStreak,
    pushCount,
    outcomes,
    sparklineData,
    houseEdgeBreakdown: [
      { factor: 'Base house advantage', impact: (loseProb - winProb) * 100 },
      { factor: 'Push frequency buffer', impact: pushProb * 100 }
    ]
  };
}
