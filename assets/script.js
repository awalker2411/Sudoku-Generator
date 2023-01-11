
//? creates board based on user selected input of difficulty
function generateBoard() {

}

//? increases the tracker for number of games played by the user
function gameCount() {

}


//? when the start game button is pressed it should generate a new board
function startGame() {
    generateBoard();
    console.log("Game started!");
}

// When the hint button is pressed, should color code user inputs with green if correct and red if incorrect
function giveHint() {

}

// When the solve button is pressed, wipe user inputs and generate correct numbers for the sudoku board and tell the user how many incorrect entries that they had
// Should also update the 'Completed Puzzles' number and 'Attempted Puzzles' number
function solveGame() {
    gameCount();
}

// Listener for start button being clicked
const startGameButton = document.getElementById("start-game");
startGameButton.addEventListener("click", startGame);// Main JS script

// Listener for hint button being clicked
const hintGameButton = document.getElementById("hint-game");
startGameButton.addEventListener("click", giveHint);

//Listener for solve button being clicked
const solveGameButton = document.getElementById("solve-game");
startGameButton.addEventListener("click", solveGame);