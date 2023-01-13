//? difficulty

def difficulty_selector(sudoku_array):
    empty_cells = sudoku_array.count(".")
    if empty_cells <= 30:
        return "easy"
    elif empty_cells <= 50:
        return "medium"
    else:
        return "hard"