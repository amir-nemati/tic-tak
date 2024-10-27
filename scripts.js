const board = document.getElementById("gameBoard");
const cells = document.querySelectorAll(".cell");
const gameStatus = document.getElementById("gameStatus");
const restartButton = document.getElementById("restartButton");

let currentPlayer = "X";
let gameActive = true;
let gameState = Array(9).fill("");

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

const handleCellClick = (event) => {
    const clickedCell = event.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute("data-index"));

    if (gameState[clickedCellIndex] !== "" || !gameActive) {
        return;
    }

    gameState[clickedCellIndex] = currentPlayer;
    clickedCell.textContent = currentPlayer;

    checkResult();
};

const checkResult = () => {
    let roundWon = false;
    for (let i = 0; i < winningConditions.length; i++) {
        const [a, b, c] = winningConditions[i];
        if (gameState[a] === "" || gameState[b] === "" || gameState[c] === "") {
            continue;
        }
        if (gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        gameStatus.textContent = `Player ${currentPlayer} wins!`;
        gameActive = false;
        return;
    }

    if (!gameState.includes("")) {
        gameStatus.textContent = "It's a draw!";
        gameActive = false;
    }

    currentPlayer = currentPlayer === "X" ? "O" : "X";
};

const restartGame = () => {
    gameActive = true;
    currentPlayer = "X";
    gameState.fill("");
    gameStatus.textContent = "";
    cells.forEach((cell) => {
        cell.textContent = "";
    });
};

cells.forEach((cell) => {
    cell.addEventListener("click", handleCellClick);
});

restartButton.addEventListener("click", restartGame);
