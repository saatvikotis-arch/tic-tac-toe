# 🎮 Tic-Tac-Toe Master (Red & Black Edition)

A modern, responsive, and high-performance Tic-Tac-Toe game styled in a sleek **Crimson Red & Obsidian Black theme**, built purely using **HTML5**, **CSS3**, and **Vanilla JavaScript** with zero external dependencies.

---

## ✨ Features

- **🎨 Crimson & Obsidian Theme**:
  - Deep black aesthetic with glowing crimson red neon accents.
  - Pixel-perfect inline SVG audio controls and responsive controls grid without overflows.
- **👥 Two Game Modes**:
  - **Local Multiplayer (2 Players)**: Pass & play on the same device.
  - **Single Player vs AI**: Play against the computer.
- **🧠 3 AI Difficulty Levels**:
  - **Easy**: Casual, relaxed moves.
  - **Medium**: Balanced mix of smart tactics and randomness.
  - **Hard (Unbeatable)**: Powered by the **Minimax algorithm** — guaranteed win or tie!
- **🔊 Synthesized Web Audio**:
  - Real-time sound effects for moves, win fanfare, tie notes, and clicks synthesized in-browser.
  - Built-in mute/unmute audio control.
- **🎉 Particle Celebration & Animations**:
  - Custom confetti particle celebration upon winning.
  - Pulsing victory cell highlights and active turn indicators.
- **📊 Persistent Scoreboard**:
  - Tracks Player X wins, Player O wins, and Draws across sessions using `localStorage`.

---

## 📁 Project Structure

```text
tic-tac-toe/
├── index.html     # Semantic HTML layout and UI components
├── style.css      # Crimson & Obsidian theme, grid layout & animations
├── script.js      # Game logic, Minimax AI, Web Audio synthesis & particles
└── README.md      # Documentation and instructions
```

---

## 🚀 How to Run and Play

### Option 1: Direct File Opening
1. Clone or download this repository:
   ```bash
   git clone https://github.com/saatvikotis-arch/tic-tac-toe.git
   ```
2. Double-click or open `index.html` in any modern web browser.

### Option 2: Local Server (Optional)
```bash
python -m http.server 8000
```
Then navigate to `http://localhost:8000` in your browser.

---

## 🎯 Rules & Controls

- **Objective**: Align 3 marks (`X` or `O`) horizontally, vertically, or diagonally.
- **Controls**:
  - **Mouse/Touch**: Click/tap any empty cell to place your mark.
  - **Keyboard**: Use `Tab` to navigate and `Enter` or `Space` to place a mark.
- **New Game**: Start a fresh round without clearing cumulative scores.
- **Reset Scores**: Reset all score counters back to 0.

---

## 🛠️ Built With

- **HTML5**: Semantic & accessible ARIA elements.
- **CSS3**: CSS Grid, Flexbox, custom CSS variables, glassmorphism, keyframe animations.
- **JavaScript (ES6+)**: Minimax decision algorithm, Web Audio API, HTML5 Canvas.

---

## 📄 License

This project is licensed under the MIT License.