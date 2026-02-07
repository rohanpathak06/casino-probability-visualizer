# 🎰 Casino Probability Visualizer & House Edge Calculator

An educational web application that visualizes the mathematics behind casino games, demonstrating why "the house always wins" over time through interactive probability calculations and simulations.

![Casino Probability Visualizer](https://img.shields.io/badge/Education-Probability-green) ![React](https://img.shields.io/badge/React-18.2.0-blue) ![Vite](https://img.shields.io/badge/Vite-5.0-purple)

## 🎯 Features

### Game Analysis Tools

1. **Roulette Analyzer**
   - Compare European (37 pockets) vs American (38 pockets) variants
   - Visualize expected value for all bet types
   - See how the green zero(s) create the house edge
   - Interactive controls for bet amount and bet type

2. **Blackjack Strategy Comparison**
   - Compare house edge across different playing strategies
   - Perfect basic strategy vs average player vs poor decisions
   - Includes card counting scenario (player advantage)
   - Calculate expected losses over time

3. **Slot Machine Mathematics**
   - Analyze different RTP (Return to Player) percentages
   - Visualize bankroll depletion over thousands of spins
   - Compare loose slots (98% RTP) vs tight slots (85% RTP)
   - Real-time simulation of money flow

4. **Craps Bet Analysis**
   - Compare all craps bets from best (Pass Line + Odds: 0.85%) to worst (Any 7: 16.67%)
   - Color-coded visualization of good, fair, and bad bets
   - Understand why some bets are significantly better than others

5. **Bankroll Simulator**
   - Simulate any number of rounds with customizable parameters
   - Adjustable starting bankroll, bet size, and house edge
   - Visual comparison of expected vs actual outcomes
   - Bankruptcy risk calculator
   - Preset configurations for different games

### Educational Features

- **Mathematical Accuracy**: All calculations based on real probability theory
- **Interactive Visualizations**: Charts and graphs using Recharts library
- **Real-time Calculations**: Instant feedback as you adjust parameters
- **Clear Explanations**: Key insights for each game type
- **Responsive Design**: Works on desktop, tablet, and mobile devices

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v16 or higher)
- **npm** or **yarn** package manager

Check if you have Node.js installed:
```bash
node --version
```

If not installed, download from [nodejs.org](https://nodejs.org/)

### Installation

1. **Navigate to the project directory**
```bash
cd casino-probability-visualizer
```

2. **Install dependencies**
```bash
npm install
```

This will install:
- React 18.2.0
- React DOM 18.2.0
- Recharts 2.10.3 (for charts)
- Framer Motion 10.16.16 (for animations)
- Vite 5.0.8 (build tool)
- @vitejs/plugin-react (Vite React plugin)

### Running Locally

**Start the development server:**
```bash
npm run dev
```

The application will automatically open in your default browser at:
```
http://localhost:3000
```

If it doesn't open automatically, manually navigate to `http://localhost:3000`

### Building for Production

**Create an optimized production build:**
```bash
npm run build
```

**Preview the production build:**
```bash
npm run preview
```

The production files will be in the `dist/` folder, ready to deploy to any static hosting service.

## 📁 Project Structure

```
casino-probability-visualizer/
├── index.html                 # Entry HTML file
├── package.json              # Dependencies and scripts
├── vite.config.js           # Vite configuration
├── src/
│   ├── main.jsx             # React entry point
│   ├── App.jsx              # Main application component
│   ├── App.css              # App-specific styles
│   ├── index.css            # Global styles and theme
│   ├── components/          # React components
│   │   ├── Header.jsx
│   │   ├── Header.css
│   │   ├── GameSelector.jsx
│   │   ├── GameSelector.css
│   │   ├── RouletteVisualizer.jsx
│   │   ├── RouletteVisualizer.css
│   │   ├── BlackjackVisualizer.jsx
│   │   ├── SlotsVisualizer.jsx
│   │   ├── SlotsVisualizer.css
│   │   ├── CrapsVisualizer.jsx
│   │   ├── CrapsVisualizer.css
│   │   ├── BankrollSimulator.jsx
│   │   └── BankrollSimulator.css
│   └── utils/
│       └── calculations.js   # Mathematical calculations
└── README.md                # This file
```

## 🎨 Design Philosophy

The application uses a sophisticated casino-inspired aesthetic:

- **Color Palette**: Rich jewel tones (emerald, gold, ruby) on dark backgrounds
- **Typography**: Playfair Display for headings (elegant serif) + DM Mono for data (monospace)
- **Visual Effects**: Gradient backgrounds, shadows, and subtle animations
- **Accessibility**: High contrast ratios and clear visual hierarchy

## 🧮 Mathematical Concepts Explained

### House Edge
The mathematical advantage the casino has over players, expressed as a percentage. For example:
- Roulette (European): 2.7%
- Roulette (American): 5.26%
- Blackjack (perfect strategy): 0.5%
- Slots: 2% - 15%

### Expected Value (EV)
The average amount you can expect to win or lose per bet:
```
EV = (Win Amount × Win Probability) + (Loss Amount × Loss Probability)
```

### Return to Player (RTP)
The percentage of all wagered money that a slot machine pays back:
```
RTP = 100% - House Edge
```

### Why the House Always Wins
1. **Law of Large Numbers**: Over many trials, results converge to mathematical expectation
2. **Negative Expected Value**: Every bet has EV < 0 (except card counting)
3. **Unlimited Bankroll**: Casinos can outlast any winning streak
4. **Time Advantage**: The longer you play, the more certain the house edge becomes

## 🎓 Educational Use Cases

- **Mathematics Education**: Teaching probability and expected value
- **Financial Literacy**: Understanding risk and expected returns
- **Decision Making**: Seeing how small edges compound over time
- **Responsible Gaming**: Making informed choices about gambling

## ⚙️ Technology Stack

- **Frontend Framework**: React 18
- **Build Tool**: Vite (fast, modern build tool)
- **Charting Library**: Recharts (React-based charts)
- **Animation**: Framer Motion
- **Styling**: CSS3 with custom properties (CSS variables)
- **Font**: Google Fonts (Playfair Display, DM Mono)

## 🔧 Customization

### Changing the Theme

Edit the CSS variables in `src/index.css`:

```css
:root {
  --emerald-deep: #064e3b;
  --gold: #f59e0b;
  --ruby: #dc2626;
  /* ... modify colors as needed */
}
```

### Adding New Games

1. Create a new visualizer component in `src/components/`
2. Add calculations to `src/utils/calculations.js`
3. Update `GameSelector.jsx` to include the new game
4. Add the component to `App.jsx` switch statement

## 📊 Key Insights Provided

- **All casino bets have negative expected value** (except card counting)
- **Short-term variance** can create winning sessions, but long-term math always wins
- **Different games have vastly different house edges** - knowledge helps you choose better
- **Betting systems don't work** - they can't overcome mathematical house edge
- **The longer you play, the more likely you are to lose** - this is mathematical certainty

## 🛠️ Troubleshooting

**Port 3000 already in use?**
```bash
# Edit vite.config.js and change the port:
server: {
  port: 3001,  // or any available port
  open: true
}
```

**Dependencies not installing?**
```bash
# Clear npm cache and reinstall
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

**Build errors?**
```bash
# Make sure you're using Node.js v16+
node --version

# Update npm
npm install -g npm@latest
```

## 📝 License

This project is for educational purposes. Feel free to use and modify for learning about probability and statistics.

## ⚠️ Disclaimer

This application is designed for educational purposes only. It demonstrates mathematical principles of probability and expected value. 

**Important:**
- Gambling involves real financial risk
- The house always has a mathematical advantage
- No strategy or system can overcome the house edge (except card counting, which is banned)
- If you choose to gamble, do so responsibly with money you can afford to lose
- Seek help if gambling becomes a problem

## 🤝 Contributing

This is an educational project. Suggestions for improvements:
- Additional casino games (baccarat, pai gow, etc.)
- More detailed strategy comparisons
- Enhanced visualizations
- Mobile optimizations

## 📚 Further Reading

- "The Theory of Gambling and Statistical Logic" by Richard Epstein
- "Beat the Dealer" by Edward O. Thorp
- Khan Academy: Probability and Statistics
- MIT OpenCourseWare: Probability courses

---

**Built with ❤️ for education and mathematical literacy**

*Remember: Understanding the mathematics helps you make informed decisions. The house edge is not opinion—it's mathematics.*
#   c a s i n o - p r o b a b i l i t y - v i s u a l i z e r  
 