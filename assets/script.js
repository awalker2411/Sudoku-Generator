const startGameButton = document.getElementById("start-game");
const hintGameButton = document.getElementById("hint-game");
const solveGameButton = document.getElementById("solve-game");
const gameTracker = document.getElementById("#games")
let puzzle = "";
const puzzleArray = [];
let key = "";
const keyArray = [];

//? board array, will fill as it gets the set numbers from our generateBoard
const board = Array(9).fill(null).map(() => Array(9).fill(null));


function generateBoard16() {
    //! Api for 16x16 + its key
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '72d127291bmsh1e75b0ade2c691bp11f226jsn75f66a8bbb06',
            'X-RapidAPI-Host': 'mega-sudoku-generator.p.rapidapi.com'
        }
    };

    fetch('https://mega-sudoku-generator.p.rapidapi.com/mega', options)
        .then(response => response.json())
        .then(response => console.log(response))
        .catch(err => console.error(err));

    for (let r = 0; r < 16; r++) {
        for (let c = 0; c < 16; c++) {
            let tile = document.createElement("div");
            tile.id = // will be the value of the cell
                tile.classList.add("tile");
            document.getElementById("board").append(tile);
        }
    }
}
//? creates board based on user selected input of difficulty
function startGame() {
    //! This is our API for generating the sudoku 9x9 + its key
    const creator = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '72d127291bmsh1e75b0ade2c691bp11f226jsn75f66a8bbb06',
            'X-RapidAPI-Host': 'sudoku-service.p.rapidapi.com'
        }
    };
    console.log("Game started!");
    fetch('https://sudoku-service.p.rapidapi.com/v1/sudoku?withSolution=true', creator)
        .then(response => response.json())
        .then(response => console.log(response))
        .catch(err => console.error(err));
        
    //? increases the tracker for number of games played by the user
    function gameCount() {
        gameTracker.textContent++;
    }
    //? when the start game button is pressed it should generate a new board

    for (let r = 0; r < 9; r++) {
        for (let c = 0; c < 9; c++) {
            let tile = document.createElement("div");
            tile.id = // will be the value of the cell
                tile.classList.add("tile");
            document.getElementById("board").append(tile);
        }
    }
}


// When the solve button is pressed, wipe user inputs and generate correct numbers for the sudoku board and tell the user how many incorrect entries that they had
// Should also update the 'Completed Puzzles' number and 'Attempted Puzzles' number
function solveGame() {
    const options = {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            'X-RapidAPI-Key': '72d127291bmsh1e75b0ade2c691bp11f226jsn75f66a8bbb06',
            'X-RapidAPI-Host': 'sudoku-service.p.rapidapi.com'
        },
        //? needs to be setup to take our puzzle board  
        body: '{"board":[[5,0,0,0,9,0,0,0,0],[7,9,0,0,0,0,0,0,8],[0,6,0,8,0,0,0,2,5],[9,0,6,0,0,5,0,0,0],[0,0,0,0,0,0,0,4,0],[0,0,0,0,7,1,0,0,0],[0,7,3,0,0,0,4,5,0],[0,0,4,0,6,0,2,0,0],[0,0,0,2,0,0,8,0,0]]}'
    };
    //?this will generate the solution 
    fetch('https://sudoku-service.p.rapidapi.com/v1/sudoku/solve?count=2', options)
        .then(response => response.json())
        .then(response => console.log(response))
        .catch(err => console.error(err));
}

// Listener for start button being clicked
startGameButton.addEventListener("click", startGame);// Main JS script

// Listener for hint button being clicked
startGameButton.addEventListener("click", giveHint);

//Listener for solve button being clicked
startGameButton.addEventListener("click", solveGame);