
//? creates board based on user selected input of difficulty
function generateBoard() {

}

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





// TEST: CHECKING FUNCTIONALITY OF SIGNED COMMITS 'DELETE LATER'