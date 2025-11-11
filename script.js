const cells = document.querySelectorAll('[data-cell]');
const message = document.getElementById('message');
const restartBtn = document.getElementById('restartBtn');
let currentPlayer = 'X';
let board = ["", "", "", "", "", "", "", "", ""];
let isGameActive = true;

const winPatterns = [
    [0,1,2], [3,4,5], [6,7,8], // rows
    [0,3,6], [1,4,7], [2,5,8], // columns
    [0,4,8], [2,4,6]           // diagonals
];

function handleCellClick(e) {
    const idx = Array.from(cells).indexOf(e.target);
    if (board[idx] !== "" || !isGameActive) return;
    board[idx] = currentPlayer;
    e.target.textContent = currentPlayer;
    if (checkWinner()) {
        message.textContent = `Player ${currentPlayer} wins!`;
        isGameActive = false;
        return;
    }
    if (board.every(cell => cell !== "")) {
        message.textContent = "It's a draw!";
        isGameActive = false;
        return;
    }
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    message.textContent = `Player ${currentPlayer}'s turn`;
}

function checkWinner() {
    return winPatterns.some(pattern => 
      pattern.every(idx => board[idx] === currentPlayer)
    );
}

function restartGame() {
    board = ["", "", "", "", "", "", "", "", ""];
    cells.forEach(cell => cell.textContent = "");
    currentPlayer = 'X';
    isGameActive = true;
    message.textContent = `Player ${currentPlayer}'s turn`;
}

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
restartBtn.addEventListener('click', restartGame);

// Initialize
message.textContent = `Player ${currentPlayer}'s turn`;