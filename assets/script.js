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
        let puzzleArray16 = Array.from(response.puzzle);
        let solutionArray16 = Array.from(response.solution);
        localStorage.setItem('puzzleArray16', puzzleArray16);
        localStorage.setItem('solution16', solutionArray16);

        //!this should split the string into a 16x16 array to be read by the board
        var mainArray = [];

        for (var i = 0; i < puzzleArray.length; i += 16) {
            var subString = puzzleArray.slice(i, i + 16);
            var subArray = subString.split("").map(Number);
            mainArray.push(subArray);
        }

        console.log(puzzleArray)
        console.log(mainArray)
        //! creates the table
        var table = document.createElement("table");
        table.setAttribute("id", "sudoku-table");
        //! rows and cells
        for (var i = 0; i < 16; i++) {
            var col = document.createElement("tr");
            for (var j = 0; j < 16; j++) {
                var row = document.createElement("td");
                var value = puzzleArray[i][j];
                if (value === '.') {
                    row.innerHTML = "";
                    row.setAttribute("class", "empty-cell");
                    var input = document.createElement("input");
                    input.setAttribute("type", "text");
                    input.setAttribute("class", "empty-cell-input");
                    row.appendChild(input);
                    input.addEventListener("input", function (event) {
                        //Code to handle user input
                    });
                } else {
                    row.innerHTML = value;
                }
                col.appendChild(row);
            }
            table.appendChild(col);
        }
        //Append table to the container
        document.getElementById("board").appendChild(table);
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
        let puzzleArray = (response.puzzle);
        let solutionArray = Array.from(response.solution);
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
                if (value == 'NaN') {
                    row.innerHTML = "";
                    row.setAttribute("class", "empty-cell");
                    var input = document.createElement("input");
                    input.setAttribute("type", "text");
                    input.setAttribute("class", "empty-cell-input");
                    row.appendChild(input);
                    input.addEventListener("input", function (event) {
                        //Code to handle user input
                    });
                } else {
                    row.innerHTML = value;
                }
                col.appendChild(row);
            }
            table.appendChild(col);
        }
        //Append table to the container
        document.getElementById("board").appendChild(table);
    }
}
// When the hint button is pressed, should color code user inputs with green if correct and red if incorrect
function giveHint() {

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
//startGameButton.addEventListener("click", solveGame);
