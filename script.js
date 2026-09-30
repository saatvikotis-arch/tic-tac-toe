// --- Sound Engine (Web Audio API) ---
class SoundEngine {
  constructor() {
    this.audioCtx = null;
    this.muted = false;
  }

  init() {
    if (!this.audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      this.audioCtx = new AudioContext();
    }
    if (this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
  }

  playMove(isX) {
    if (this.muted) return;
    this.init();
    const osc = this.audioCtx.createOscillator();
    const gain = this.audioCtx.createGain();

    osc.type = isX ? 'triangle' : 'sine';
    osc.frequency.setValueAtTime(isX ? 440 : 330, this.audioCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(isX ? 660 : 495, this.audioCtx.currentTime + 0.08);

    gain.gain.setValueAtTime(0.2, this.audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.audioCtx.currentTime + 0.12);

    osc.connect(gain);
    gain.connect(this.audioCtx.destination);

    osc.start();
    osc.stop(this.audioCtx.currentTime + 0.12);
  }

  playWin() {
    if (this.muted) return;
    this.init();
    const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
    notes.forEach((freq, idx) => {
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();
      const startTime = this.audioCtx.currentTime + idx * 0.09;

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, startTime);

      gain.gain.setValueAtTime(0.25, startTime);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.25);

      osc.connect(gain);
      gain.connect(this.audioCtx.destination);

      osc.start(startTime);
      osc.stop(startTime + 0.25);
    });
  }

  playTie() {
    if (this.muted) return;
    this.init();
    const notes = [350, 310, 270];
    notes.forEach((freq, idx) => {
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();
      const startTime = this.audioCtx.currentTime + idx * 0.1;

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(freq, startTime);

      gain.gain.setValueAtTime(0.15, startTime);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.18);

      osc.connect(gain);
      gain.connect(this.audioCtx.destination);

      osc.start(startTime);
      osc.stop(startTime + 0.18);
    });
  }

  playClick() {
    if (this.muted) return;
    this.init();
    const osc = this.audioCtx.createOscillator();
    const gain = this.audioCtx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(600, this.audioCtx.currentTime);
    gain.gain.setValueAtTime(0.08, this.audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.audioCtx.currentTime + 0.05);

    osc.connect(gain);
    gain.connect(this.audioCtx.destination);

    osc.start();
    osc.stop(this.audioCtx.currentTime + 0.05);
  }
}

// --- Confetti System in Crimson & White ---
class ConfettiEffect {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    this.ctx = this.canvas.getContext('2d');
    this.particles = [];
    this.animationId = null;
    this.resize();
    window.addEventListener('resize', () => this.resize());
  }

  resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  trigger() {
    this.particles = [];
    const colors = ['#ff1e4d', '#ff3366', '#ffffff', '#e2e8f0', '#990024', '#ff758f'];
    for (let i = 0; i < 90; i++) {
      this.particles.push({
        x: this.canvas.width / 2,
        y: this.canvas.height / 2,
        w: Math.random() * 8 + 4,
        h: Math.random() * 8 + 4,
        color: colors[Math.floor(Math.random() * colors.length)],
        vx: (Math.random() - 0.5) * 16,
        vy: (Math.random() - 0.5) * 16 - 3,
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 10,
        opacity: 1,
        decay: Math.random() * 0.015 + 0.01
      });
    }

    if (this.animationId) cancelAnimationFrame(this.animationId);
    this.animate();
  }

  animate() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    let active = false;

    for (let p of this.particles) {
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.35; // gravity
      p.vx *= 0.98;
      p.rotation += p.rotationSpeed;
      p.opacity -= p.decay;

      if (p.opacity > 0) {
        active = true;
        this.ctx.save();
        this.ctx.translate(p.x, p.y);
        this.ctx.rotate((p.rotation * Math.PI) / 180);
        this.ctx.fillStyle = p.color;
        this.ctx.globalAlpha = Math.max(0, p.opacity);
        this.ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
        this.ctx.restore();
      }
    }

    if (active) {
      this.animationId = requestAnimationFrame(() => this.animate());
    } else {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
  }
}

// --- Game Logic & State ---
const GameState = {
  board: Array(9).fill(''),
  currentPlayer: 'X',
  isGameActive: true,
  gameMode: 'pve', // 'pvp' or 'pve'
  difficulty: 'hard', // 'easy', 'medium', 'hard'
  scores: { X: 0, O: 0, ties: 0 },
  winningConditions: [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6]             // Diagonals
  ]
};

const sounds = new SoundEngine();
let confetti;

// DOM Elements
const cells = document.querySelectorAll('.cell');
const statusText = document.getElementById('status-text');
const restartBtn = document.getElementById('restart-btn');
const resetScoreBtn = document.getElementById('reset-score-btn');
const gameModeSelect = document.getElementById('game-mode');
const difficultySelect = document.getElementById('ai-difficulty');
const difficultyWrapper = document.getElementById('difficulty-wrapper');
const soundToggleBtn = document.getElementById('sound-toggle');
const soundIconOn = document.getElementById('sound-icon-on');
const soundIconOff = document.getElementById('sound-icon-off');
const playerOLabel = document.getElementById('player-o-label');
const scoreXCard = document.getElementById('score-x-card');
const scoreOCard = document.getElementById('score-o-card');
const scoreXEl = document.getElementById('score-x');
const scoreOEl = document.getElementById('score-o');
const scoreTiesEl = document.getElementById('score-ties');

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  confetti = new ConfettiEffect('confetti-canvas');
  loadScores();
  setupEventListeners();
  updateUI();
});

function setupEventListeners() {
  cells.forEach(cell => {
    cell.addEventListener('click', handleCellClick);
    cell.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        cell.click();
      }
    });
  });

  restartBtn.addEventListener('click', () => {
    sounds.playClick();
    restartGame();
  });

  resetScoreBtn.addEventListener('click', () => {
    sounds.playClick();
    resetScores();
  });

  gameModeSelect.addEventListener('change', (e) => {
    sounds.playClick();
    GameState.gameMode = e.target.value;
    difficultyWrapper.style.visibility = GameState.gameMode === 'pve' ? 'visible' : 'hidden';
    playerOLabel.textContent = GameState.gameMode === 'pve' ? 'AI (Player O)' : 'Player O';
    restartGame();
  });

  difficultySelect.addEventListener('change', (e) => {
    sounds.playClick();
    GameState.difficulty = e.target.value;
    restartGame();
  });

  soundToggleBtn.addEventListener('click', () => {
    sounds.muted = !sounds.muted;
    if (sounds.muted) {
      soundIconOn.classList.add('hidden');
      soundIconOff.classList.remove('hidden');
    } else {
      soundIconOn.classList.remove('hidden');
      soundIconOff.classList.add('hidden');
      sounds.playClick();
    }
  });
}

function handleCellClick(e) {
  const clickedCell = e.currentTarget;
  const index = parseInt(clickedCell.getAttribute('data-index'), 10);

  if (GameState.board[index] !== '' || !GameState.isGameActive) return;

  makeMove(index, GameState.currentPlayer);

  if (GameState.isGameActive && GameState.gameMode === 'pve' && GameState.currentPlayer === 'O') {
    // Disable board briefly for AI move
    setBoardInteractive(false);
    setTimeout(() => {
      if (GameState.isGameActive) {
        aiMove();
        setBoardInteractive(true);
      }
    }, 320);
  }
}

function makeMove(index, player) {
  GameState.board[index] = player;
  const cell = cells[index];
  cell.textContent = player;
  cell.classList.add(player.toLowerCase());
  sounds.playMove(player === 'X');

  checkResult();
}

function setBoardInteractive(enable) {
  cells.forEach(cell => {
    if (enable && cell.textContent === '') {
      cell.classList.remove('disabled');
      cell.setAttribute('tabindex', '0');
    } else {
      cell.classList.add('disabled');
      cell.setAttribute('tabindex', '-1');
    }
  });
}

function checkResult() {
  let roundWon = false;
  let winningCombo = null;

  for (let i = 0; i < GameState.winningConditions.length; i++) {
    const [a, b, c] = GameState.winningConditions[i];
    if (GameState.board[a] && GameState.board[a] === GameState.board[b] && GameState.board[a] === GameState.board[c]) {
      roundWon = true;
      winningCombo = [a, b, c];
      break;
    }
  }

  if (roundWon) {
    GameState.isGameActive = false;
    const winner = GameState.currentPlayer;
    GameState.scores[winner]++;
    saveScores();
    updateScoreDisplay();

    winningCombo.forEach(idx => cells[idx].classList.add('winning-cell'));
    confetti.trigger();
    sounds.playWin();

    const winnerName = GameState.gameMode === 'pve' && winner === 'O' ? 'AI (O)' : `Player ${winner}`;
    statusText.innerHTML = `🎉 <span class="${winner.toLowerCase()}-turn">${winnerName} Wins!</span>`;
    updateTurnIndicator(null);
    return;
  }

  const isTie = !GameState.board.includes('');
  if (isTie) {
    GameState.isGameActive = false;
    GameState.scores.ties++;
    saveScores();
    updateScoreDisplay();
    sounds.playTie();
    statusText.innerHTML = `🤝 <span style="color: var(--color-draw)">It's a Draw!</span>`;
    updateTurnIndicator(null);
    return;
  }

  // Switch Player
  GameState.currentPlayer = GameState.currentPlayer === 'X' ? 'O' : 'X';
  updateUI();
}

function updateUI() {
  const current = GameState.currentPlayer;
  const isAI = GameState.gameMode === 'pve' && current === 'O';
  const label = isAI ? 'AI (O)' : `Player ${current}`;
  statusText.innerHTML = `${label}'s Turn`;
  updateTurnIndicator(current);
}

function updateTurnIndicator(player) {
  scoreXCard.classList.remove('active-turn');
  scoreOCard.classList.remove('active-turn');
  if (player === 'X') scoreXCard.classList.add('active-turn');
  if (player === 'O') scoreOCard.classList.add('active-turn');
}

function restartGame() {
  GameState.board = Array(9).fill('');
  GameState.isGameActive = true;
  GameState.currentPlayer = 'X';

  cells.forEach(cell => {
    cell.textContent = '';
    cell.className = 'cell';
    cell.setAttribute('tabindex', '0');
  });

  updateUI();
}

function resetScores() {
  GameState.scores = { X: 0, O: 0, ties: 0 };
  saveScores();
  updateScoreDisplay();
}

function saveScores() {
  localStorage.setItem('ticTacToe_scores', JSON.stringify(GameState.scores));
}

function loadScores() {
  const saved = localStorage.getItem('ticTacToe_scores');
  if (saved) {
    try {
      GameState.scores = JSON.parse(saved);
    } catch (e) {
      GameState.scores = { X: 0, O: 0, ties: 0 };
    }
  }
  updateScoreDisplay();
}

function updateScoreDisplay() {
  scoreXEl.textContent = GameState.scores.X;
  scoreOEl.textContent = GameState.scores.O;
  scoreTiesEl.textContent = GameState.scores.ties;
}

// --- AI Implementation ---
function aiMove() {
  let moveIndex;

  if (GameState.difficulty === 'easy') {
    moveIndex = getRandomMove();
  } else if (GameState.difficulty === 'medium') {
    // 50% minimax optimal, 50% random
    moveIndex = Math.random() < 0.5 ? getBestMoveMinimax() : getRandomMove();
  } else {
    // Hard: Unbeatable Minimax
    moveIndex = getBestMoveMinimax();
  }

  if (moveIndex !== undefined && moveIndex !== -1) {
    makeMove(moveIndex, 'O');
  }
}

function getRandomMove() {
  const availableMoves = [];
  GameState.board.forEach((val, idx) => {
    if (val === '') availableMoves.push(idx);
  });
  if (availableMoves.length === 0) return -1;
  return availableMoves[Math.floor(Math.random() * availableMoves.length)];
}

function getBestMoveMinimax() {
  let bestScore = -Infinity;
  let bestMove = -1;
  const board = [...GameState.board];

  for (let i = 0; i < 9; i++) {
    if (board[i] === '') {
      board[i] = 'O';
      let score = minimax(board, 0, false);
      board[i] = '';
      if (score > bestScore) {
        bestScore = score;
        bestMove = i;
      }
    }
  }
  return bestMove;
}

function minimax(board, depth, isMaximizing) {
  const winner = checkWinnerForBoard(board);
  if (winner === 'O') return 10 - depth;
  if (winner === 'X') return depth - 10;
  if (!board.includes('')) return 0;

  if (isMaximizing) {
    let maxEval = -Infinity;
    for (let i = 0; i < 9; i++) {
      if (board[i] === '') {
        board[i] = 'O';
        let evaluation = minimax(board, depth + 1, false);
        board[i] = '';
        maxEval = Math.max(maxEval, evaluation);
      }
    }
    return maxEval;
  } else {
    let minEval = Infinity;
    for (let i = 0; i < 9; i++) {
      if (board[i] === '') {
        board[i] = 'X';
        let evaluation = minimax(board, depth + 1, true);
        board[i] = '';
        minEval = Math.min(minEval, evaluation);
      }
    }
    return minEval;
  }
}

function checkWinnerForBoard(board) {
  for (let cond of GameState.winningConditions) {
    const [a, b, c] = cond;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a];
    }
  }
  return null;
}