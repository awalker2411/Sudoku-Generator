//Should grab all changes made to original Sudoku board and turn them into a new array for purposes of hints and solving
function getUserInputs() {
    for(i = 0; i < puzzleArray; i++) {
        userPuzzleArray[i] = document.getElementById.(sudokuBoxID).textContent()
        if(userPuzzleArray[i] === " ") {
            userPuzzleArray[i] = ".";
        }
    }

}


// When the hint button is pressed, should color code user inputs with green if correct and red if incorrect
function giveHint() {
    

}