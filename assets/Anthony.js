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
    console.log('firstEmptyCell', firstEmptyCell);
    console.log(userPuzzleArray);

    if(firstEmptyCell < 9) { 
        firstEmptyCellRow = 0;
    } else if(firstEmptyCell > 8 && firstEmptyCell < 18){ 
        firstEmptyCellRow = 1;
    } else if(firstEmptyCell > 17 && firstEmptyCell < 27){ 
        firstEmptyCellRow = 2;
    } else if(firstEmptyCell > 26 && firstEmptyCell < 36){
        firstEmptyCellRow = 3;
    } else if(firstEmptyCell > 35 && firstEmptyCell < 45){
        firstEmptyCellRow = 4;
    } else if(firstEmptyCell > 44 && firstEmptyCell < 54){
        firstEmptyCellRow = 5;
    } else if(firstEmptyCell > 53 && firstEmptyCell < 63){
        firstEmptyCellRow = 6;
    } else if(firstEmptyCell > 62 && firstEmptyCell < 72){
        firstEmptyCellRow = 7;
    } else if(firstEmptyCell > 71 && firstEmptyCell < 81){
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

    let cellNum;
    let rowNum;
    let colNum;


    for (let i = 0; i < 81; i++) {

        let cellNum = i;

        if(cellNum < 9) { 
            rowNum = 0;
        } else if(cellNum > 8 && cellNum < 18){ 
            rowNum = 1;
        } else if(cellNum > 17 && cellNum < 27){ 
            rowNum = 2;
        } else if(cellNum > 26 && cellNum < 36){
            rowNum = 3;
        } else if(cellNum > 35 && cellNum < 45){
            rowNum = 4;
        } else if(cellNum > 44 && cellNum < 54){
            rowNum = 5;
        } else if(cellNum > 53 && cellNum < 63){
            rowNum = 6;
        } else if(cellNum > 62 && cellNum < 72){
            rowNum = 7;
        } else if(cellNum > 71 && cellNum < 81){
            rowNum = 8;
        }

        if(cellNum == 0||cellNum == 9||cellNum == 18||cellNum == 27||cellNum == 36||cellNum == 45||cellNum == 54||cellNum == 63||cellNum == 72) {
            colNum = 0;
        } else if(cellNum == 1||cellNum == 10||cellNum == 19||cellNum == 28||cellNum == 37||cellNum == 46||cellNum == 55||cellNum == 64||cellNum == 73){
            colNum = 1;
        } else if(cellNum == 2||cellNum == 11||cellNum == 20||cellNum == 29||cellNum == 38||cellNum == 47||cellNum == 56||cellNum == 65||cellNum == 74){
            colNum = 2;
        } else if(cellNum == 3||cellNum == 12||cellNum == 21||cellNum == 30||cellNum == 39||cellNum == 48||cellNum == 57||cellNum == 66||cellNum == 75){
            colNum = 3;
        } else if(cellNum == 4||cellNum == 13||cellNum == 22||cellNum == 31||cellNum == 40||cellNum == 49||cellNum == 58||cellNum == 67||cellNum == 76){
            colNum = 4;
        } else if(cellNum == 5||cellNum == 14||cellNum == 23||cellNum == 32||cellNum == 41||cellNum == 50||cellNum == 59||cellNum == 68||cellNum == 77){
            colNum = 5;
        } else if(cellNum == 6||cellNum == 15||cellNum == 24||cellNum == 33||cellNum == 42||cellNum == 51||cellNum == 60||cellNum == 69||cellNum == 78){
            colNum = 6;
        } else if(cellNum == 7||cellNum == 16||cellNum == 25||cellNum == 34||cellNum == 43||cellNum == 52||cellNum == 61||cellNum == 70||cellNum == 79){
            colNum = 7;
        } else if(cellNum == 8||cellNum == 17||cellNum == 26||cellNum == 35||cellNum == 44||cellNum == 53||cellNum == 62||cellNum == 71||cellNum == 80){
            colNum = 8
            ;
        }

        console.log(cellNum);
        console.log(rowNum);
        console.log(colNum);
        console.log(userPuzzleArray);

        if(userPuzzleArray[i] != keyArray[i]) {
            document.getElementById('sudoku-table').children[rowNum].children[colNum].removeAttribute('class');
            document.getElementById('sudoku-table').children[rowNum].children[colNum].textContent = keyArray[i];
            document.getElementById('sudoku-table').children[rowNum].children[colNum].classList.add('textToRed');
            incorrectEntries++;
        }
    }

    let incorrectEntriesMessage = document.createElement('div');
    incorrectEntriesMessage.textContent = incorrectEntries;
    document.getElementById('sudoku-table').append(incorrectEntriesMessage);

    if (incorrectEntries === 0) {
        localStorage.setItem('completedPuzzles', completedPuzzles++);
    }

}
