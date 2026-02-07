/**
 * Casino Game Calculations
 * Mathematical formulas for various casino games
 */

// Roulette calculations
export const rouletteCalculations = {
  european: {
    pockets: 37, // 0-36
    zeroPockets: 1,
    getName: () => 'European Roulette',
    getHouseEdge: () => (1 / 37) * 100,
    getBets: () => [
      { name: 'Straight Up', payout: 35, probability: 1/37, numbers: 1 },
      { name: 'Split', payout: 17, probability: 2/37, numbers: 2 },
      { name: 'Street', payout: 11, probability: 3/37, numbers: 3 },
      { name: 'Corner', payout: 8, probability: 4/37, numbers: 4 },
      { name: 'Six Line', payout: 5, probability: 6/37, numbers: 6 },
      { name: 'Dozen', payout: 2, probability: 12/37, numbers: 12 },
      { name: 'Column', payout: 2, probability: 12/37, numbers: 12 },
      { name: 'Red/Black', payout: 1, probability: 18/37, numbers: 18 },
      { name: 'Even/Odd', payout: 1, probability: 18/37, numbers: 18 },
      { name: 'Low/High', payout: 1, probability: 18/37, numbers: 18 },
    ]
  },
  american: {
    pockets: 38, // 0, 00, 1-36
    zeroPockets: 2,
    getName: () => 'American Roulette',
    getHouseEdge: () => (2 / 38) * 100,
    getBets: () => [
      { name: 'Straight Up', payout: 35, probability: 1/38, numbers: 1 },
      { name: 'Split', payout: 17, probability: 2/38, numbers: 2 },
      { name: 'Street', payout: 11, probability: 3/38, numbers: 3 },
      { name: 'Corner', payout: 8, probability: 4/38, numbers: 4 },
      { name: 'Six Line', payout: 5, probability: 6/38, numbers: 6 },
      { name: 'Dozen', payout: 2, probability: 12/38, numbers: 12 },
      { name: 'Column', payout: 2, probability: 12/38, numbers: 12 },
      { name: 'Red/Black', payout: 1, probability: 18/38, numbers: 18 },
      { name: 'Even/Odd', payout: 1, probability: 18/38, numbers: 18 },
      { name: 'Low/High', payout: 1, probability: 18/38, numbers: 18 },
      { name: 'Five Number', payout: 6, probability: 5/38, numbers: 5 }, // Worst bet!
    ]
  }
};

// Calculate expected value for a bet
export function calculateExpectedValue(betAmount, probability, payout) {
  const winAmount = betAmount * payout;
  const loseAmount = -betAmount;
  const winProbability = probability;
  const loseProbability = 1 - probability;
  
  return (winAmount * winProbability) + (loseAmount * loseProbability);
}

// Calculate return to player percentage
export function calculateRTP(probability, payout) {
  return ((probability * (payout + 1)) * 100);
}

// Blackjack calculations
export const blackjackCalculations = {
  perfectStrategy: {
    getName: () => 'Perfect Basic Strategy',
    getHouseEdge: () => 0.5,
    getDescription: () => 'Using mathematically optimal decisions'
  },
  average: {
    getName: () => 'Average Player',
    getHouseEdge: () => 2.0,
    getDescription: () => 'Typical player without strategy'
  },
  poor: {
    getName: () => 'Poor Strategy',
    getHouseEdge: () => 4.0,
    getDescription: () => 'Making sub-optimal decisions'
  },
  counting: {
    getName: () => 'Card Counting (Skilled)',
    getHouseEdge: () => -0.5, // Player advantage!
    getDescription: () => 'Advanced technique (banned in most casinos)'
  }
};

// Slot machine calculations
export const slotCalculations = {
  loose: {
    getName: () => 'Loose Slots',
    getHouseEdge: () => 2.0,
    getRTP: () => 98.0,
    getDescription: () => 'Best payout slots (rare)'
  },
  average: {
    getName: () => 'Average Slots',
    getHouseEdge: () => 5.0,
    getRTP: () => 95.0,
    getDescription: () => 'Typical slot machine'
  },
  tight: {
    getName: () => 'Tight Slots',
    getHouseEdge: () => 10.0,
    getRTP: () => 90.0,
    getDescription: () => 'Low payout slots'
  },
  airport: {
    getName: () => 'Airport/Grocery Slots',
    getHouseEdge: () => 15.0,
    getRTP: () => 85.0,
    getDescription: () => 'Worst odds (convenience locations)'
  }
};

// Craps calculations
export const crapsCalculations = {
  getBets: () => [
    { name: 'Pass Line', houseEdge: 1.41, description: 'Most common bet' },
    { name: "Don't Pass", houseEdge: 1.36, description: 'Slightly better odds' },
    { name: 'Pass Line + Odds', houseEdge: 0.85, description: 'With maximum odds' },
    { name: 'Field', houseEdge: 5.56, description: 'One-roll bet' },
    { name: 'Any 7', houseEdge: 16.67, description: 'Worst bet in craps' },
    { name: 'Hardways', houseEdge: 11.11, description: 'Poor odds' },
  ]
};

// Simulate multiple rounds
export function simulateGames(
  startingBankroll,
  betAmount,
  houseEdge,
  numberOfRounds
) {
  const results = [];
  let bankroll = startingBankroll;
  
  for (let round = 0; round <= numberOfRounds; round++) {
    if (round === 0) {
      results.push({ round, bankroll });
      continue;
    }
    
    // Player wins with probability (1 - houseEdge/100)
    // This is simplified; real games have specific probabilities
    const playerWinChance = 1 - (houseEdge / 100);
    const won = Math.random() < playerWinChance;
    
    if (won) {
      bankroll += betAmount;
    } else {
      bankroll -= betAmount;
    }
    
    // Stop if bankrupt
    if (bankroll <= 0) {
      bankroll = 0;
      results.push({ round, bankroll });
      break;
    }
    
    results.push({ round, bankroll });
  }
  
  return results;
}

// Calculate probability of going bankrupt
export function bankruptcyRisk(startingBankroll, betAmount, houseEdge, rounds) {
  const expectedLossPerRound = betAmount * (houseEdge / 100);
  const expectedLoss = expectedLossPerRound * rounds;
  const expectedBankroll = startingBankroll - expectedLoss;
  
  // Simplified risk calculation
  if (expectedBankroll <= 0) {
    return 100;
  }
  
  const variance = betAmount * Math.sqrt(rounds);
  const riskFactor = (startingBankroll - expectedLoss) / variance;
  
  if (riskFactor < 0) return 100;
  if (riskFactor > 3) return 0;
  
  return Math.max(0, Math.min(100, (1 - riskFactor / 3) * 100));
}

// Format currency
export function formatCurrency(amount) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(amount);
}

// Format percentage
export function formatPercent(value, decimals = 2) {
  return `${value.toFixed(decimals)}%`;
}
