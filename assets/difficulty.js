function sudoku_generator() {
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
        .then(response => makeBoard(response))
        .catch(err => console.error(err));

    // Code for generating sudoku array
    return sudoku_array
    function makeBoard(response) {
        let puzzleArray = (response.puzzle);
        let solutionArray = Array.from(response.solution);
        console.log()
        localStorage.setItem('puzzleArray', puzzleArray);
        localStorage.setItem('solution', solutionArray);

        //!this should split the string into a 9x9 array to be read by the board
        var mainArray = [];

        for (var i = 0; i < puzzleArray.length; i += 9) {
            var subString = puzzleArray.slice(i, i + 9);
            var subArray = subString.split("").map(Number);
            mainArray.push(subArray);
        }

        var empty_cells = 0;
        for (var i = 0; i < puzzleArray.length; i++) {
            if (puzzleArray[i] === ".") {
                empty_cells++;
            }
        }
        if (empty_cells <= 30) {
            difficulty = "easy"
            console.log(difficulty)
        } else if (empty_cells <= 50) {
            difficulty = "medium"
            console.log(difficulty)
        } else {
            difficulty = "hard"
            console.log(difficulty)
        }
    }

}

function get_sudoku(difficulty) {
    while (true) {
        var sudoku_array = sudoku_generator();
        if (difficulty_selector(sudoku_array) === difficulty) {
            return sudoku_array;
        }
    }
}
