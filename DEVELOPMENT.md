# 👨‍💻 Development Guide

This guide is for developers who want to extend or customize the Casino Probability Visualizer.

## Architecture Overview

### Component Structure

```
App.jsx (Main container)
├── Header.jsx (Branding and title)
├── GameSelector.jsx (Game selection UI)
└── Game Visualizers (Rendered conditionally)
    ├── RouletteVisualizer.jsx
    ├── BlackjackVisualizer.jsx
    ├── SlotsVisualizer.jsx
    ├── CrapsVisualizer.jsx
    └── BankrollSimulator.jsx
```

### Data Flow

1. User selects a game in `GameSelector`
2. `selectedGame` state updates in `App.jsx`
3. Appropriate visualizer component is rendered
4. Visualizer uses utility functions from `calculations.js`
5. Results displayed via Recharts components

## Adding a New Casino Game

### Step 1: Add Calculations

Edit `src/utils/calculations.js`:

```javascript
export const baccaratCalculations = {
  player: {
    getName: () => 'Player Bet',
    getHouseEdge: () => 1.24,
    getPayout: () => 1,
    getDescription: () => 'Bet on player hand'
  },
  banker: {
    getName: () => 'Banker Bet',
    getHouseEdge: () => 1.06,
    getPayout: () => 0.95, // 5% commission
    getDescription: () => 'Best bet in baccarat'
  },
  tie: {
    getName: () => 'Tie Bet',
    getHouseEdge: () => 14.36,
    getPayout: () => 8,
    getDescription: () => 'Worst bet - avoid!'
  }
};
```

### Step 2: Create Visualizer Component

Create `src/components/BaccaratVisualizer.jsx`:

```javascript
import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis } from 'recharts';
import { baccaratCalculations } from '../utils/calculations';
import './RouletteVisualizer.css'; // Reuse shared styles

export default function BaccaratVisualizer() {
  const [betType, setBetType] = useState('banker');
  
  // Your component logic here
  
  return (
    <div className="visualizer-container">
      {/* Your UI here */}
    </div>
  );
}
```

### Step 3: Update Game Selector

Edit `src/components/GameSelector.jsx`:

```javascript
const games = [
  // ... existing games
  { 
    id: 'baccarat', 
    name: 'Baccarat', 
    icon: '🎴', 
    edge: '1.06% - 14.36%',
    description: 'Banker bet is best'
  }
];
```

### Step 4: Add to App Router

Edit `src/App.jsx`:

```javascript
import BaccaratVisualizer from './components/BaccaratVisualizer';

// In renderGame function:
case 'baccarat':
  return <BaccaratVisualizer />;
```

## Styling Guidelines

### Using Theme Variables

Always use CSS variables for consistency:

```css
.my-component {
  background: var(--surface);
  color: var(--text-primary);
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: var(--spacing-md);
}
```

### Color Meanings

- **Emerald** (`--emerald`): Positive, good choices, player advantage
- **Gold** (`--gold`): Highlights, active states, attention
- **Ruby** (`--ruby`): Negative, bad choices, house advantage
- **Slate** (`--slate`): Backgrounds, surfaces
- **Text colors**: `--text-primary` (headings), `--text-secondary` (body)

### Component Patterns

#### Stat Card
```javascript
<div className="stat-card">
  <div className="stat-icon">🎯</div>
  <div className="stat-content">
    <div className="stat-value">2.7%</div>
    <div className="stat-label">House Edge</div>
    <div className="stat-description">European roulette</div>
  </div>
</div>
```

#### Control Group
```javascript
<div className="control-group">
  <label className="control-label">Bet Amount: $10</label>
  <input
    type="range"
    min="1"
    max="100"
    value={betAmount}
    onChange={(e) => setBetAmount(Number(e.target.value))}
    className="slider"
  />
</div>
```

## Working with Recharts

### Basic Bar Chart

```javascript
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

const data = [
  { name: 'Bet A', value: 2.7 },
  { name: 'Bet B', value: 5.26 }
];

<ResponsiveContainer width="100%" height={400}>
  <BarChart data={data}>
    <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
    <XAxis dataKey="name" stroke="#cbd5e1" />
    <YAxis stroke="#cbd5e1" />
    <Tooltip 
      contentStyle={{ 
        backgroundColor: '#1e293b',
        border: '1px solid #334155',
        borderRadius: '8px',
        color: '#f8fafc'
      }}
    />
    <Bar dataKey="value" fill="#059669" radius={[8, 8, 0, 0]} />
  </BarChart>
</ResponsiveContainer>
```

### Basic Line Chart

```javascript
import { LineChart, Line, XAxis, YAxis } from 'recharts';

<ResponsiveContainer width="100%" height={400}>
  <LineChart data={data}>
    <XAxis dataKey="round" />
    <YAxis />
    <Line 
      type="monotone" 
      dataKey="bankroll" 
      stroke="#3b82f6" 
      strokeWidth={2}
      dot={false}
    />
  </LineChart>
</ResponsiveContainer>
```

## Calculation Functions

### Adding New Calculations

Keep all math in `calculations.js`:

```javascript
// Calculate something complex
export function calculateComplexMetric(param1, param2) {
  // Your mathematical formula
  const result = (param1 * param2) / 100;
  return result;
}

// Format for display
export function formatCustom(value) {
  return `${value.toFixed(2)} units`;
}
```

### Mathematical Accuracy

- Always use precise formulas
- Comment your calculations
- Include sources for formulas when possible
- Test edge cases (0, negative numbers, very large numbers)

## Animation with Framer Motion

### Page Transitions

Already implemented in `App.jsx`:

```javascript
<AnimatePresence mode="wait">
  <motion.div
    key={selectedGame}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.3 }}
  >
    {renderGame()}
  </motion.div>
</AnimatePresence>
```

### Custom Animations

```javascript
import { motion } from 'framer-motion';

<motion.div
  initial={{ scale: 0 }}
  animate={{ scale: 1 }}
  transition={{ type: "spring", stiffness: 260, damping: 20 }}
>
  Your content
</motion.div>
```

## Performance Optimization

### Memoization

```javascript
import { useMemo } from 'react';

const expensiveCalculation = useMemo(() => {
  return simulateGames(bankroll, betSize, edge, rounds);
}, [bankroll, betSize, edge, rounds]);
```

### Debouncing Sliders

```javascript
import { useState, useEffect } from 'react';

const [tempValue, setTempValue] = useState(betAmount);

useEffect(() => {
  const timer = setTimeout(() => {
    setBetAmount(tempValue);
  }, 300);
  return () => clearTimeout(timer);
}, [tempValue]);

<input
  type="range"
  value={tempValue}
  onChange={(e) => setTempValue(Number(e.target.value))}
/>
```

## Testing

### Manual Testing Checklist

- [ ] All sliders work smoothly
- [ ] Charts render without errors
- [ ] Numbers update correctly
- [ ] Mobile responsive (test at 375px, 768px, 1024px)
- [ ] No console errors
- [ ] Animations are smooth (60fps)

### Browser Testing

Test in:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Building for Production

### Optimize Build

```bash
# Create production build
npm run build

# Build size analysis
npm run build -- --mode analyze
```

### Environment Variables

Create `.env` file if needed:

```
VITE_API_URL=https://api.example.com
VITE_ANALYTICS_ID=UA-12345678-1
```

Access in code:
```javascript
const apiUrl = import.meta.env.VITE_API_URL;
```

## Code Style Guide

### Naming Conventions

- Components: PascalCase (`RouletteVisualizer`)
- Functions: camelCase (`calculateExpectedValue`)
- CSS classes: kebab-case (`stat-card`)
- Constants: UPPER_SNAKE_CASE (`MAX_BET_AMOUNT`)

### File Organization

```javascript
// 1. Imports
import React, { useState } from 'react';
import { BarChart } from 'recharts';
import { calculations } from '../utils/calculations';
import './Component.css';

// 2. Constants
const MAX_VALUE = 100;

// 3. Component
export default function MyComponent() {
  // 3a. State
  const [value, setValue] = useState(0);
  
  // 3b. Derived values
  const calculated = value * 2;
  
  // 3c. Functions
  const handleChange = (e) => {
    setValue(e.target.value);
  };
  
  // 3d. Render
  return (
    <div>
      {/* JSX */}
    </div>
  );
}
```

## Common Pitfalls

### ❌ Don't

```javascript
// Don't calculate in render without memoization
{heavyCalculation(data)}

// Don't use magic numbers
<div style={{ padding: '16px' }}>

// Don't mutate state directly
state.value = 10;
```

### ✅ Do

```javascript
// Use useMemo for expensive calculations
const result = useMemo(() => heavyCalculation(data), [data]);

// Use CSS variables
<div style={{ padding: 'var(--spacing-md)' }}>

// Set state properly
setValue(10);
```

## Deployment

### Deploy to Netlify

1. Build the project: `npm run build`
2. Drag the `dist` folder to Netlify Drop
3. Done!

### Deploy to Vercel

```bash
npm install -g vercel
vercel
```

### Deploy to GitHub Pages

```bash
# Install gh-pages
npm install --save-dev gh-pages

# Add to package.json scripts:
"deploy": "vite build && gh-pages -d dist"

# Deploy
npm run deploy
```

## Resources

- [React Docs](https://react.dev)
- [Vite Docs](https://vitejs.dev)
- [Recharts Docs](https://recharts.org)
- [Framer Motion Docs](https://www.framer.com/motion/)
- [MDN Web Docs](https://developer.mozilla.org)

---

Happy coding! 🚀 Feel free to experiment and add new features!
