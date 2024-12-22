function isValid(grid, row, col, num) {
    for (let x = 0; x < grid.length; x++) {
        if (grid[row][x] === num || grid[x][col] === num) {
            return false;
        }
    }
    let sqrt = Math.sqrt(grid.length);
    let startRow = row - (row % sqrt);
    let startCol = col - (col % sqrt);
    for (let r = startRow; r < startRow + sqrt; r++) {
        for (let c = startCol; c < startCol + sqrt; c++) {
            if (grid[r][c] === num) {
                return false;
            }
        }
    }
    return true;
}

// Function to check if a number is valid in the Sudoku grid
function isValid(grid, row, col, num) {
    for (let x = 0; x < grid.length; x++) {
        if (grid[row][x] === num || grid[x][col] === num) {
            return false;
        }
    }
    let sqrt = Math.sqrt(grid.length);
    let startRow = row - (row % sqrt);
    let startCol = col - (col % sqrt);
    for (let r = startRow; r < startRow + sqrt; r++) {
        for (let c = startCol; c < startCol + sqrt; c++) {
            if (grid[r][c] === num) {
                return false;
            }
        }
    }
    return true;
}

// Function to solve Sudoku
async function solveSudoku(grid) {
    for (let row = 0; row < grid.length; row++) {
        for (let col = 0; col < grid.length; col++) {
            if (grid[row][col] === 0) {
                for (let num = 1; num <= grid.length; num++) {
                    if (isValid(grid, row, col, num)) {
                        grid[row][col] = num;
                        updateGridUI(grid, row, col, num);
                        await new Promise((resolve) => setTimeout(resolve, 30));
                        if (await solveSudoku(grid)) {
                            return true;
                        }
                        grid[row][col] = 0;
                        updateGridUI(grid, row, col, 0);
                        await new Promise((resolve) => setTimeout(resolve, 30));
                    }
                }
                return false;
            }
        }
    }
    return true;
}

// Function to get the grid from the UI
function getGridFromUI() {
    let inputs = document.querySelectorAll("#sudoku-container input");
    let grid = [];
    for (let i = 0; i < 9; i++) {
        let row = [];
        for (let j = 0; j < 9; j++) {
            let value = inputs[i * 9 + j].value;
            row.push(value === "" ? 0 : parseInt(value, 10));
        }
        grid.push(row);
    }
    return grid;
}

// Function to update the grid in the UI
function updateGridUI(grid, row, col, value) {
    let inputs = document.querySelectorAll("#sudoku-container input");
    let index = row * 9 + col;
    inputs[index].value = value === 0 ? "" : value;
    if (value !== 0) {
        inputs[index].classList.add("filled");
    } else {
        inputs[index].classList.remove("filled");
    }
}

// Function to create the Sudoku grid in the UI
function createGridUI() {
    let container = document.getElementById("sudoku-container");
    for (let i = 0; i < 81; i++) {
        let input = document.createElement("input");
        input.setAttribute("type", "text");
        input.setAttribute("maxlength", "1");
        container.appendChild(input);
    }
}

// Add event listener to the Solve button
document.getElementById("solve-button").addEventListener("click", async () => {
    let grid = getGridFromUI();
    let solved = await solveSudoku(grid);
    if (solved) {
        alert("Sudoku solved!");
    } else {
        alert("No solution exists!");
    }
});

// Initialize the UI grid
createGridUI();
