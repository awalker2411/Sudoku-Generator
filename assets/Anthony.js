//Should grab all changes made to original Sudoku board and turn them into a new array for purposes of hints and solving
function getUserInputs() {

    for(i = 0; i < puzzle9Array; i++) {
        userPuzzle9Array[i] = document.getElementById.(sudokuBoxID).textContent()
        if(userPuzzle9Array[i] === " ") {
            userPuzzle9Array[i] = ".";

        }
    }

}


// When the hint button is pressed, should color code user inputs with green if correct and red if incorrect
function giveHint() {

    for(i = 0; i < solution9; i++) {
        if(userPuzzle9Array[i] === solution9Array[i]) {
            document.getElementById.(sudokuBoxID).classList.add(textToGreen);
        } else {
            document.getElementById.(sudokuBoxID).classList.add(textToRed);
        }
    }

}

function solveGame() {

}