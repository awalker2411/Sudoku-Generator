//Should grab all changes made to original Sudoku board and turn them into a new array for purposes of hints and solving
function getUserInputs() {

    for(i = 0; i < puzzleArray; i++) {
        userPuzzleArray[i] = document.querySelector('#sudokuBoard :nth-child(' + i + ')');
        if(userPuzzleArray[i] === " ") {
            userPuzzleArray[i] = ".";

        }
    }

}


// When the hint button is pressed, should color code user inputs with green if correct and red if incorrect
function giveHint() {
    getUserInputs();

    for(i = 0; i < keyArray; i++) {
        if(userPuzzleArray[i] === keyArray[i]) {
            document.querySelector('#sudokuBoard :nth-child(' + i + ')').classList.add(textToGreen);
        } else {
            document.querySelector('#sudokuBoard :nth-child(' + i + ')').classList.add(textToRed);
        }
    }

}

// When the solve button is pressed, should compare user input to key, overwrite incorrect user entires on the table, display the number of incorrect entires, and then update the completed puzzles number
function solveGame() {
    getUserInputs();

    for (i = 0; i < keyArray; i++) {
        if(userPuzzleArray[i] === keyArray[i]) {
            return;
        } else {
            document.querySelector('#sudokuBoard :nth-child(' + i + ')').textContent(keyArray[i]);
            document.querySelector('#sudokuBoard :nth-child(' + i + ')').classList.add(textToRed);
            incorrectEntries++;
        }
    }

    let incorrectEntriesMessage = document.createElement('div').textContent(incorrectEntries);
    table.append(incorrectEntriesMessage);

    if (incorrectEntries === 0) {
        localStorage.setItem('completedPuzzles', completedPuzzles++);
    }

}