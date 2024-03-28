const cells = document.querySelectorAll('.cell');
const message = document.getElementById('message');
const restartBtn = document.getElementById('restartBtn');

let currentPlayer = 'X';
let gameState = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

const winPatterns = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function handleCellClick(index) {
  if (gameState[index] === '' && gameActive) {
    gameState[index] = currentPlayer;
    cells[index].textContent = currentPlayer;
    checkGameStatus();
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  }
}

function checkGameStatus() {
  for (let pattern of winPatterns) {
    const [a, b, c] = pattern;
    if (gameState[a] !== '' && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
      gameActive = false;
      message.textContent = `${gameState[a]} wins!`;
      return;
    }
  }

  if (!gameState.includes('')) {
    gameActive = false;
    message.textContent = "It's a draw!";
  }
}

function restartGame() {
  currentPlayer = 'X';
  gameState = ['', '', '', '', '', '', '', '', ''];
  gameActive = true;
  cells.forEach(cell => cell.textContent = '');
  message.textContent = '';
}

cells.forEach((cell, index) => {
  cell.addEventListener('click', () => handleCellClick(index));
});

restartBtn.addEventListener('click', restartGame);
