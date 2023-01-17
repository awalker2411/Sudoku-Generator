//Should grab all changes made to original Sudoku board and turn them into a new array for purposes of hints and solving
function getUserInputs() {

    userPuzzleArray = [];



    for(let j = 0; j < 9; j++){
        for(let i = 0; i < 9; i++) {
            tempPuzzArray[i] = document.getElementById('sudoku-table').children[j].children[i].textContent;
            if(tempPuzzArray[i] == "") {
                tempPuzzArray[i] = ".";
            }
        }
        userPuzzleArray = userPuzzleArray.concat(tempPuzzArray);
    }
    userPuzzleString = userPuzzleArray.join("");
    console.log(userPuzzleArray);
    console.log(userPuzzleString);
}


// When the hint button is pressed, should color code user inputs with green if correct and red if incorrect
function giveHint() {
    getUserInputs();

    let firstEmptyCell = userPuzzleArray.indexOf(".");
    
    if(firstEmptyCell < 10) {
        firstEmptyCellRow = 0;
    } else if(firstEmptyCell > 9 && firstEmptyCell < 19){
        firstEmptyCellRow = 1;
    } else if(firstEmptyCell > 18 && firstEmptyCell < 28){
        firstEmptyCellRow = 2;
    } else if(firstEmptyCell > 27 && firstEmptyCell < 37){
        firstEmptyCellRow = 3;
    } else if(firstEmptyCell > 36 && firstEmptyCell < 46){
        firstEmptyCellRow = 4;
    } else if(firstEmptyCell > 45 && firstEmptyCell < 55){
        firstEmptyCellRow = 5;
    } else if(firstEmptyCell > 54 && firstEmptyCell < 64){
        firstEmptyCellRow = 6;
    } else if(firstEmptyCell > 63 && firstEmptyCell < 73){
        firstEmptyCellRow = 7;
    } else if(firstEmptyCell > 72 && firstEmptyCell < 82){
        firstEmptyCellRow = 8;
    }

    if(firstEmptyCell = 0,9,18,27,36,45,54,63,72) {
        firstEmptyCellColumn = 0;
    } else if(firstEmptyCell = 1,10,19,28,37,46,55,64,73){
        firstEmptyCellColumn = 1;
    } else if(firstEmptyCell = 2,11,20,29,38,47,56,65,74){
        firstEmptyCellColumn = 2;
    } else if(firstEmptyCell = 3,12,21,30,39,48,57,66,75){
        firstEmptyCellColumn = 3;
    } else if(firstEmptyCell = 4,13,22,31,40,49,58,67,76){
        firstEmptyCellColumn = 4;
    } else if(firstEmptyCell = 5,14,23,32,41,50,59,68,77){
        firstEmptyCellColumn = 5;
    } else if(firstEmptyCell = 6,15,24,33,42,51,60,69,78){
        firstEmptyCellColumn = 6;
    } else if(firstEmptyCell = 7,16,25,34,43,52,61,70,79){
        firstEmptyCellColumn = 7;
    } else if(firstEmptyCell = 8,17,26,35,44,53,62,71,80){
        firstEmptyCellColumn = 8;
    }


    
    const options = {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            'X-RapidAPI-Key': '72d127291bmsh1e75b0ade2c691bp11f226jsn75f66a8bbb06',
            'X-RapidAPI-Host': 'sudoku-service.p.rapidapi.com'
        },
        body: '{"cell":{"row":'+ firstEmptyCellRow +',"column":'+ firstEmptyCellColumn +'},"puzzle":"'+ userPuzzleString +'"}'
    };
    
    fetch('https://sudoku-service.p.rapidapi.com/v1/sudoku/hint', options)
        .then(response => response.json())
        .then(response => showHintValue(response.value))
        .catch(err => console.error(err));




    function showHintValue(element){
        element = document.getElementById('sudoku-table').children[firstEmptyCellRow].children[firstEmptyCellColumn].textContent;
    }
}

// When the solve button is pressed, should compare user input to key, overwrite incorrect user entires on the table, display the number of incorrect entires, and then update the completed puzzles number
function solveGame() {
    getUserInputs();

    for (let i = 0; i < keyArray; i++) {
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
