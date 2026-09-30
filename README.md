# 🎮 Tic-Tac-Toe Master

A modern, responsive, and feature-rich Tic-Tac-Toe game built purely using **HTML5**, **CSS3**, and **Vanilla JavaScript** with zero external runtime dependencies.

---

## ✨ Features

- **👥 Two Game Modes**:
  - **Local Multiplayer (2 Players)**: Pass & play on the same device.
  - **Single Player vs AI**: Play against the computer.
- **🧠 3 AI Difficulty Levels**:
  - **Easy**: Random moves for casual fun.
  - **Medium**: Balanced mix of smart tactics and randomness.
  - **Hard (Unbeatable)**: Powered by the optimal **Minimax algorithm** — will always win or tie!
- **🔊 Synthesized Web Audio**:
  - Built-in dynamic sound effects for moves, wins, ties, and button clicks without external audio files.
  - Quick mute/unmute toggle button.
- **🎉 Interactive Visuals & Polish**:
  - Confetti particle celebration upon winning.
  - Glowing active turn indicators and winning cell highlights.
  - Smooth glassmorphism UI with responsive design for desktop, tablet, and mobile devices.
- **📊 Persistent Scoreboard**:
  - Tracks Player X wins, Player O wins, and Draws.
  - Stored locally in `localStorage` across page reloads.

---

## 📁 Project Structure

```text
tic-tac-toe/
├── index.html     # Semantic HTML layout and UI components
├── style.css      # Modern styling, glassmorphism, animations & responsive layout
├── script.js      # Game logic, Minimax AI engine, Web Audio synthesis & particle effects
└── README.md      # Documentation and instructions
```

---

## 🚀 How to Run and Play

### Option 1: Direct File Opening
1. Clone or download this repository:
   ```bash
   git clone https://github.com/saatvikotis-arch/tic-tac-toe.git
   ```
2. Double-click or open `index.html` in any modern web browser (Chrome, Edge, Firefox, Safari).

### Option 2: Local Server (Optional)
If you prefer running a local server:
```bash
# Using Python 3
python -m http.server 8000

# Or using Node.js (npx)
npx serve
```
Then navigate to `http://localhost:8000` in your browser.

---

## 🎯 Rules & Controls

- **Objective**: Be the first player to align 3 of your marks (`X` or `O`) horizontally, vertically, or diagonally.
- **Controls**:
  - **Mouse/Touch**: Click or tap any empty grid cell to place your mark.
  - **Keyboard Accessibility**: Use `Tab` to navigate cells and press `Enter` or `Space` to place a mark.
- **New Game**: Click the "New Game" button to start a fresh round without clearing overall scores.
- **Reset Scores**: Click the "Reset Scores" button to clear score counters back to 0.

---

## 🛠️ Built With

- **HTML5**: Semantic tags & accessible ARIA grid roles.
- **CSS3**: Custom CSS variables, Flexbox, CSS Grid, glassmorphism effects, keyframe animations.
- **JavaScript (ES6+)**: Clean modular architecture, Minimax Decision Rule, Web Audio API, HTML5 Canvas.

---

## 📄 License

This project is licensed under the MIT License.