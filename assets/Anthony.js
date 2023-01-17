//Should grab all changes made to original Sudoku board and turn them into a new array for purposes of hints and solving
function getUserInputs() {

    userPuzzleArray = [];
    userPuzzleString = "";



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
}


// When the hint button is pressed, should color code user inputs with green if correct and red if incorrect
function giveHint() {
    getUserInputs();

    firstEmptyCell = userPuzzleArray.indexOf(".");
    console.log(firstEmptyCell);
    
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

    if(firstEmptyCell == 0||firstEmptyCell == 9||firstEmptyCell == 18||firstEmptyCell == 27||firstEmptyCell == 36||firstEmptyCell == 45||firstEmptyCell == 54||firstEmptyCell == 63||firstEmptyCell == 72) {
        firstEmptyCellColumn = 0;
    } else if(firstEmptyCell == 1||firstEmptyCell == 10||firstEmptyCell == 19||firstEmptyCell == 28||firstEmptyCell == 37||firstEmptyCell == 46||firstEmptyCell == 55||firstEmptyCell == 64||firstEmptyCell == 73){
        firstEmptyCellColumn = 1;
    } else if(firstEmptyCell == 2||firstEmptyCell == 11||firstEmptyCell == 20||firstEmptyCell == 29||firstEmptyCell == 38||firstEmptyCell == 47||firstEmptyCell == 56||firstEmptyCell == 65||firstEmptyCell == 74){
        firstEmptyCellColumn = 2;
    } else if(firstEmptyCell == 3||firstEmptyCell == 12||firstEmptyCell == 21||firstEmptyCell == 30||firstEmptyCell == 39||firstEmptyCell == 48||firstEmptyCell == 57||firstEmptyCell == 66||firstEmptyCell == 75){
        firstEmptyCellColumn = 3;
    } else if(firstEmptyCell == 4||firstEmptyCell == 13||firstEmptyCell == 22||firstEmptyCell == 31||firstEmptyCell == 40||firstEmptyCell == 49||firstEmptyCell == 58||firstEmptyCell == 67||firstEmptyCell == 76){
        firstEmptyCellColumn = 4;
    } else if(firstEmptyCell == 5||firstEmptyCell == 14||firstEmptyCell == 23||firstEmptyCell == 32||firstEmptyCell == 41||firstEmptyCell == 50||firstEmptyCell == 59||firstEmptyCell == 68||firstEmptyCell == 77){
        firstEmptyCellColumn = 5;
    } else if(firstEmptyCell == 6||firstEmptyCell == 15||firstEmptyCell == 24||firstEmptyCell == 33||firstEmptyCell == 42||firstEmptyCell == 51||firstEmptyCell == 60||firstEmptyCell == 69||firstEmptyCell == 78){
        firstEmptyCellColumn = 6;
    } else if(firstEmptyCell == 7||firstEmptyCell == 16||firstEmptyCell == 25||firstEmptyCell == 34||firstEmptyCell == 43||firstEmptyCell == 52||firstEmptyCell == 61||firstEmptyCell == 70||firstEmptyCell == 79){
        firstEmptyCellColumn = 7;
    } else if(firstEmptyCell == 8||firstEmptyCell == 17||firstEmptyCell == 26||firstEmptyCell == 35||firstEmptyCell == 44||firstEmptyCell == 53||firstEmptyCell == 62||firstEmptyCell == 71||firstEmptyCell == 80){
        firstEmptyCellColumn = 8
        ;
    }

    console.log(firstEmptyCellRow);
    console.log(firstEmptyCellColumn);


    
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




    function showHintValue(response){
        document.getElementById('sudoku-table').children[firstEmptyCellRow].children[firstEmptyCellColumn].removeAttribute('class');
        document.getElementById('sudoku-table').children[firstEmptyCellRow].children[firstEmptyCellColumn].textContent = response;
        console.log(document.getElementById('sudoku-table').children[firstEmptyCellRow].children[firstEmptyCellColumn]);
        console.log(document.getElementById('sudoku-table').children[firstEmptyCellRow].children[firstEmptyCellColumn].textContent);
    }
}

// When the solve button is pressed, should compare user input to key, overwrite incorrect user entires on the table, display the number of incorrect entires, and then update the completed puzzles number
function solveGame() {
    getUserInputs();

    for (let i = 0; i < 81; i++) {

        firstEmptyCell = userPuzzleArray[i];
    
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
    
        if(firstEmptyCell == 0||firstEmptyCell == 9||firstEmptyCell == 18||firstEmptyCell == 27||firstEmptyCell == 36||firstEmptyCell == 45||firstEmptyCell == 54||firstEmptyCell == 63||firstEmptyCell == 72) {
            firstEmptyCellColumn = 0;
        } else if(firstEmptyCell == 1||firstEmptyCell == 10||firstEmptyCell == 19||firstEmptyCell == 28||firstEmptyCell == 37||firstEmptyCell == 46||firstEmptyCell == 55||firstEmptyCell == 64||firstEmptyCell == 73){
            firstEmptyCellColumn = 1;
        } else if(firstEmptyCell == 2||firstEmptyCell == 11||firstEmptyCell == 20||firstEmptyCell == 29||firstEmptyCell == 38||firstEmptyCell == 47||firstEmptyCell == 56||firstEmptyCell == 65||firstEmptyCell == 74){
            firstEmptyCellColumn = 2;
        } else if(firstEmptyCell == 3||firstEmptyCell == 12||firstEmptyCell == 21||firstEmptyCell == 30||firstEmptyCell == 39||firstEmptyCell == 48||firstEmptyCell == 57||firstEmptyCell == 66||firstEmptyCell == 75){
            firstEmptyCellColumn = 3;
        } else if(firstEmptyCell == 4||firstEmptyCell == 13||firstEmptyCell == 22||firstEmptyCell == 31||firstEmptyCell == 40||firstEmptyCell == 49||firstEmptyCell == 58||firstEmptyCell == 67||firstEmptyCell == 76){
            firstEmptyCellColumn = 4;
        } else if(firstEmptyCell == 5||firstEmptyCell == 14||firstEmptyCell == 23||firstEmptyCell == 32||firstEmptyCell == 41||firstEmptyCell == 50||firstEmptyCell == 59||firstEmptyCell == 68||firstEmptyCell == 77){
            firstEmptyCellColumn = 5;
        } else if(firstEmptyCell == 6||firstEmptyCell == 15||firstEmptyCell == 24||firstEmptyCell == 33||firstEmptyCell == 42||firstEmptyCell == 51||firstEmptyCell == 60||firstEmptyCell == 69||firstEmptyCell == 78){
            firstEmptyCellColumn = 6;
        } else if(firstEmptyCell == 7||firstEmptyCell == 16||firstEmptyCell == 25||firstEmptyCell == 34||firstEmptyCell == 43||firstEmptyCell == 52||firstEmptyCell == 61||firstEmptyCell == 70||firstEmptyCell == 79){
            firstEmptyCellColumn = 7;
        } else if(firstEmptyCell == 8||firstEmptyCell == 17||firstEmptyCell == 26||firstEmptyCell == 35||firstEmptyCell == 44||firstEmptyCell == 53||firstEmptyCell == 62||firstEmptyCell == 71||firstEmptyCell == 80){
            firstEmptyCellColumn = 8
            ;
        }

        if(userPuzzleArray[i] = ".") {
            userPuzzleArray[i] = 0;
        }

        if(userPuzzleArray[i] == keyArray[i]) {
            return;
        } else {
            document.getElementById('sudokuBoard').children[firstEmptyCellRow].children[firstEmptyCellColumn].textContent = keyArray[i];
            document.getElementById('sudokuBoard').children[firstEmptyCellRow].children[firstEmptyCellColumn].classList.add('textToRed');
            incorrectEntries++;
        }
    }

    let incorrectEntriesMessage = document.createElement('div').textContent(incorrectEntries);
    table.append(incorrectEntriesMessage);

    if (incorrectEntries === 0) {
        localStorage.setItem('completedPuzzles', completedPuzzles++);
    }

}
