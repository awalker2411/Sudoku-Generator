const startGameButton = document.getElementById("start-game");
const hintGameButton = document.getElementById("hint-game");
const solveGameButton = document.getElementById("solve-game");
const gameTracker = document.getElementById("#games")


let puzzle9 = "";
let solution9 = "";
const puzzleArray = [];
const keyArray = [];
localStorage.getItem('puzzleArray', puzzle9);
localStorage.getItem('solution', solution9);
console.log("outisde function", solution9, puzzle9)




//? board array, will fill as it gets the set numbers from our generateBoard
const board = Array(9).fill(null).map(() => Array(9).fill(null));


function generateBoard16() {
    console.log("this is the 16x16 game")
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
        .then(response => makeBoard(response))
        .catch(err => console.error(err));

    function makeBoard(response) {
        let puzzle16 = response.puzzle;
        console.log(puzzle16)
        for (let r = 0; r < 16; r++) {
            for (let c = 0; c < 16; c++) {
                let tile = document.createElement("div");
                tile.id = // will be the value of the cell
                    tile.classList.add("tile");
                document.getElementById("board").append(tile);
            }
        }
    }
}
//? creates board based on user selected input of difficulty
function startGame() {
    console.log("this is the 9x9 game")
    //! This is our API for generating the sudoku 9x9 + its key
    const creator = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '72d127291bmsh1e75b0ade2c691bp11f226jsn75f66a8bbb06',
            'X-RapidAPI-Host': 'sudoku-service.p.rapidapi.com'
        }
    };

    fetch('https://sudoku-service.p.rapidapi.com/v1/sudoku?withSolution=true', creator)
        .then(response => response.json())
        .then(response => makeBoard(response))
        .catch(err => console.error(err));

    //? increases the tracker for number of games played by the user
    function gameCount() {
        gameTracker.textContent++;
    }
    //? when the start game button is pressed it should generate a new board
    function makeBoard(response) {
        let puzzle9 = response.puzzle;
        let puzzleArray = Array.from(response.puzzle);
        let solution = response.solution;
        localStorage.setItem('puzzleArray', puzzleArray);
        localStorage.setItem('solution', solution);
        console.log("inside function", solution9, puzzle9)

        for (let r = 0; r < 9; r++) {
            for (let c = 0; c < 9; c++) {
                let tile = document.createElement("div");
                tile.id = // will be the value of the cell
                    tile.classList.add("tile");
                document.getElementById("board").append(tile);
        }
    }
}
}

// When the hint button is pressed, should color code user inputs with green if correct and red if incorrect
function giveHint() {


// When the hint button is pressed, should color code user inputs with green if correct and red if incorrect
function giveHint() {



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
}
// Listener for start button being clicked
startGameButton.addEventListener("click", startGame);// Main JS script

// Listener for hint button being clicked
startGameButton.addEventListener("click", giveHint);

//Listener for solve button being clicked
//startGameButton.addEventListener("click", solveGame);