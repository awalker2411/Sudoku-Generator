// Start of Code
const saveUserNameBtnEl = document.getElementById("saveUsername");
const userNameInputEl = document.getElementById("username-input");
const initialUserStatsEl = document.getElementById("initialShownStats");
const existingUserStatsEl = document.getElementById("existingShownStats");

function saveUserStats() {
    var currentUser = userNameInputEl.value;
    console.log(currentUser);
    window.localStorage.setItem("username", currentUser);
    renderStats();
}

function renderStats() {
    initialUserStatsEl.classList.add("hide");

    var savedUsername = (window.localStorage.getItem('username'));
    var savedUsernameEl = document.createElement('h2');
    savedUsernameEl.textContent = savedUsername;
    existingUserStatsEl.append(savedUsernameEl);

    var userAttempts = document.createElement('h2');
    userAttempts.textContent = "Number of Sudoku Puzzle Attempts: ";
    existingUserStatsEl.append(userAttempts);

    var userCompletes = document.createElement('h2');
    userCompletes.textContent = "Number of Sudoku Puzzles Solved: ";
    existingUserStatsEl.append(userCompletes);

}

saveUserNameBtnEl.addEventListener("click", saveUserStats);