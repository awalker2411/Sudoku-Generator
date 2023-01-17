const startGameButton = document.getElementById("start-game");
const hintGameButton = document.getElementById("hint-game");
const solveGameButton = document.getElementById("solve-game");
const easy = document.getElementById("#easyBtn")
const medium = document.getElementById("#medBtn")
const hard = document.getElementById("#hardBtn")
let difficulty = "easy"
let puzzle = "";
let solution = "";
const puzzleArray = [];
let userPuzzleArray = [];
let tempPuzzArray = [];
let firstEmptyCellRow;
let firstEmptyCellColumn;
let userPuzzleString;
let keyArray = [];
let completedPuzzles = localStorage.getItem('completedPuzzles')||0;
let attemptedPuzzles = localStorage.getItem('attemptedPuzzles')||0;
let incorrectEntries;
localStorage.getItem('puzzleArray', puzzle);
localStorage.getItem('solution', solution);


//? creates board based on user selected input of difficulty
function startGame() {
    function removeAllChildNodes(parent) {
        while (parent.firstChild) {
            parent.removeChild(parent.firstChild);
        }
    }
    const board = document.getElementById("board");
    console.log(board)
    removeAllChildNodes(board);
    attemptedPuzzles++;

    //! This is our API for generating the sudoku 9x9 + its key
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

    function makeBoard(response) {
        let puzzleArray = ".517...899...4....73..95..4....1.....4.63..91....5.6.2.7..869236.2..481.38..214.6 "
        let solutionArray = Array.from(response.solution);
        keyArray = keyArray.concat(solutionArray);
        localStorage.setItem('puzzleArray', puzzleArray);
        localStorage.setItem('solution', solutionArray);

        //!this should split the string into a 9x9 array to be read by the board
        var mainArray = [];

        for (var i = 0; i < puzzleArray.length; i += 9) {
            var subString = puzzleArray.slice(i, i + 9);
            var subArray = subString.split("").map(Number);
            mainArray.push(subArray);
        }

        console.log(puzzleArray)
        console.log(mainArray)

        //! creates the table
        var table = document.createElement("table");
        table.setAttribute("id", "sudoku-table");
        //! rows and cells
        for (var i = 0; i < 9; i++) {
            var col = document.createElement("tr");
            for (var j = 0; j < 9; j++) {
                var row = document.createElement("td");
                var value = mainArray[i][j];
                if (value > "0" || value < "9") {
                    row.innerHTML = value;
                } else {
                    row.innerHTML = value;
                    row.innerHTML = "";
                    row.setAttribute("class", "empty-cell");
                    var input = document.createElement("span");
                    input.setAttribute("type", "number");
                    input.setAttribute("contenteditable", "true");
                    input.setAttribute("min", "1");
                    input.setAttribute("max", "9");
                    row.appendChild(input);
                    input.addEventListener("input", function (event) {
                        //Code to handle user input
                    });
                }
                col.appendChild(row);
            }
            table.appendChild(col);
        }
        //Append table to the container
        document.getElementById("board").appendChild(table);
        var empty_cells = 0;
        for (var i = 0; i < puzzleArray.length; i++) {
            if (puzzleArray[i] === ".") {
                empty_cells++;

            }
        }
        if (empty_cells <= 30) {
            difficulty = "easy"
            console.log(empty_cells)
            console.log(difficulty)
        } else if (empty_cells <= 60) {
            difficulty = "medium"
            console.log(empty_cells)
            console.log(difficulty)
        } else {
            difficulty = "hard"
            console.log(empty_cells)
            console.log(difficulty)
        }
    }
}

//? motivational quote
function getQuote() {
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '72d127291bmsh1e75b0ade2c691bp11f226jsn75f66a8bbb06',
            'X-RapidAPI-Host': 'famous-quotes4.p.rapidapi.com'
        }
    };

    fetch('https://famous-quotes4.p.rapidapi.com/random?category=all&count=2', options)
        .then(response => response.json())
        .then(response => console.log(response))
        .catch(err => console.error(err));
    function makeQuote(response) {
        let quoteAuthor = "yooooo"
        let quoteText = "fgdsgaggggggggggggg"
        console.log(quoteAuthor, quoteText)

        // Get the elements by their ID
        var quoteElement = document.getElementById("quote");
        var authorElement = document.getElementById("author");

        // Insert the quote and author into the elements
        quoteElement.innerHTML = quoteText;
        authorElement.innerHTML = quoteAuthor;

    }
    makeQuote()
}
window.onload = getQuote();
// When the solve button is pressed, wipe user inputs and generate correct numbers for the sudoku board and tell the user how many incorrect entries that they had
// Should also update the 'Completed Puzzles' number and 'Attempted Puzzles' number
// function solveGame() {
//     const options = {
//         method: 'POST',
//         headers: {
//             'content-type': 'application/json',
//             'X-RapidAPI-Key': '72d127291bmsh1e75b0ade2c691bp11f226jsn75f66a8bbb06',
//             'X-RapidAPI-Host': 'sudoku-service.p.rapidapi.com'
//         },
//         //? needs to be setup to take our puzzle board  
//         body: '{"board":[[5,0,0,0,9,0,0,0,0],[7,9,0,0,0,0,0,0,8],[0,6,0,8,0,0,0,2,5],[9,0,6,0,0,5,0,0,0],[0,0,0,0,0,0,0,4,0],[0,0,0,0,7,1,0,0,0],[0,7,3,0,0,0,4,5,0],[0,0,4,0,6,0,2,0,0],[0,0,0,2,0,0,8,0,0]]}'
//     };
//     //?this will generate the solution 
//     fetch('https://sudoku-service.p.rapidapi.com/v1/sudoku/solve?count=2', options)
//         .then(response => response.json())
//         .then(response => console.log(response))
//         .catch(err => console.error(err));
// }
// Listener for start button being clicked
startGameButton.addEventListener("click", startGame);// Main JS script

// Listener for hint button being clicked
hintGameButton.addEventListener("click", giveHint);

//Listener for solve button being clicked
//solveGameButton.addEventListener("click", solveGame);