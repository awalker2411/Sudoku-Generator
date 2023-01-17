// Start of Code
const saveUserNameBtnEl = document.getElementById("saveUsername");
const userNameInputEl = document.getElementById("username-input");
const initialUserStatsEl = document.getElementById("initialShownStats");
const existingUserStatsEl = document.getElementById("existingShownStats");
const startGameBtnEl = document.getElementById("start-game")






let globalCount = localStorage.getItem('attempt') || 0
function saveUserStats(event) {
    event.preventDefault();
    var currentUser = userNameInputEl.value;
    console.log(currentUser);
    localStorage.setItem("username", currentUser);
    renderStats();
}
function init() {
    const username= localStorage.getItem('username')
    if (username){
        renderStats()
    }
}

init()

function renderStats() {
    existingUserStatsEl.innerHTML =''
    initialUserStatsEl.classList.add("hide");
    
    var savedUsername = (window.localStorage.getItem('username'));
    var savedUsernameEl = document.createElement('h2');
    savedUsernameEl.textContent = savedUsername;
    existingUserStatsEl.append(savedUsernameEl);
    
    var userAttempts = document.createElement('h2');
    var savedAttempts = window.localStorage.getItem('count');
    userAttempts.textContent = "Number of Sudoku Puzzle Attempts: " + globalCount;
    existingUserStatsEl.append(userAttempts);

    var userCompletes = document.createElement('h2');
    userCompletes.textContent = "Number of Sudoku Puzzles Solved: ";
    existingUserStatsEl.append(userCompletes);

}


saveUserNameBtnEl.addEventListener("click", saveUserStats);



// Hiding the Difficulties function //
const startGameBtnContainerEl = document.getElementById('startGameBtnContainer')
const difficultyContainerEl = document.getElementById('difficultyContainer')

function hideIntro() {
    difficultyContainerEl.classList.add("hide");
    globalCount++;
    localStorage.setItem('attempt', globalCount)
    renderStats()
   
}

startGameBtnEl.addEventListener("click", hideIntro);



///////////////////////////////////////////

const randomQuoteContainerEl = document.getElementById('randomQuoteContainer');

function generateQuote() {
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '291653fe8cmshe4fa9213e9ba623p1f95d5jsna7ca871cf95e',
            'X-RapidAPI-Host': 'famous-quotes4.p.rapidapi.com'
        }
    };
    fetch('https://famous-quotes4.p.rapidapi.com/random?category=all&count=2', options)
	    .then(response => response.json())
	    .then(response => createQuote(response))
	    .catch(err => console.error(err));
    function createQuote(response) {
        let quoteAuthor = response[0].author;
        let quoteText = response[0].text;
        console.log(quoteAuthor);
        console.log(quoteText);

        let generatedQuoteEl = document.createElement('p');
        let generatedAuthorEl = document.createElement('h2');

        generatedQuoteEl.textContent = quoteText;
        generatedAuthorEl.textContent = quoteAuthor;


        randomQuoteContainerEl.append(generatedQuoteEl);
        randomQuoteContainerEl.append(generatedAuthorEl);
        



    }
};

generateQuote();