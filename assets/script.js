
const startGameButton = document.getElementById("start-game");
const hintGameButton = document.getElementById("hint-game");
const solveGameButton = document.getElementById("solve-game");




//? board array, will fill as it gets the set numbers from our generateBoard
const board = Array(9).fill(null).map(() => Array(9).fill(null));


//! Api for Solving the code
const solver = {
    method: 'POST',
    headers: {
        'content-type': 'application/json',
        'X-RapidAPI-Key': '72d127291bmsh1e75b0ade2c691bp11f226jsn75f66a8bbb06',
        'X-RapidAPI-Host': 'sudoku-solver3.p.rapidapi.com'
    },

    body: '{"input":[number array here use 0 for missing numbers]}'
};

fetch('https://sudoku-solver3.p.rapidapi.com/sudokusolver/', solver)
    .then(response => response.json())
    .then(response => console.log(response.puzzle))
    .catch(err => console.error(err));
//! This is our API for generating the sudoku
const creator = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': '72d127291bmsh1e75b0ade2c691bp11f226jsn75f66a8bbb06',
        'X-RapidAPI-Host': 'sudoku-service.p.rapidapi.com'
    }
};

fetch('https://sudoku-service.p.rapidapi.com/v1/sudoku?withSolution=true', creator)
    .then(response => response.json())
    .then(response => console.log(response))
    .catch(err => console.error(err));

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
startGameButton.addEventListener("click", startGame);// Main JS script

// Listener for hint button being clicked
startGameButton.addEventListener("click", giveHint);

//Listener for solve button being clicked
startGameButton.addEventListener("click", solveGame);