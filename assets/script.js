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
}
//? creates board based on user selected input of difficulty
function generateBoard9() {
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
        .then(response => console.log(response))
        .catch(err => console.error(err));

    //? increases the tracker for number of games played by the user
    function gameCount() {

    }


    //? when the start game button is pressed it should, generate a new board, and increase number of games played by one
    function startGame() {
        generateBoard();
        gameCount();
        console.log("Game started!");
    }


    const startGameButton = document.getElementById("start-game");
    startGameButton.addEventListener("click", startGame);// Main JS script
