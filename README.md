# Sudoku Solver with Backtracking Algorithm

A modern web application that solves Sudoku puzzles using a backtracking algorithm. Built with React, TypeScript, and Tailwind CSS.

## Live Demo Features

- Interactive 9x9 Sudoku grid
- Real-time input validation
- Automatic puzzle solving
- Clean, modern UI with responsive design
- Error handling and validation feedback

## Algorithm Implementation

The solver uses a backtracking algorithm to find solutions for valid Sudoku puzzles. Here's how it works:

### Core Algorithm Steps

1. Find an empty cell in the grid (represented by 0)
2. Attempt to place digits 1-9 in the empty cell
3. Check if the placed digit is valid according to Sudoku rules:
   - No duplicate numbers in the same row
   - No duplicate numbers in the same column
   - No duplicate numbers in the 3x3 sub-grid
4. If the digit is valid:
   - Recursively attempt to fill the rest of the grid
   - If the recursive call succeeds, the puzzle is solved
   - If the recursive call fails, backtrack and try the next digit
5. If no digits work, backtrack to the previous cell

### Pseudocode

```python
function solveSudoku(board):
    if solve(board):
        return board
    else:
        return "No solution exists"

function solve(board):
    for each empty cell (row, col) in board:
        for num in 1 to 9:
            if isValid(board, row, col, num):
                board[row][col] = num
                if solve(board):
                    return true
                board[row][col] = 0  # backtrack
        return false
    return true  # no empty cells left

function isValid(board, row, col, num):
    # Check row
    for x in 0 to 8:
        if board[row][x] == num:
            return false
            
    # Check column
    for x in 0 to 8:
        if board[x][col] == num:
            return false
            
    # Check 3x3 box
    startRow = floor(row/3) * 3
    startCol = floor(col/3) * 3
    for i in 0 to 2:
        for j in 0 to 2:
            if board[startRow + i][startCol + j] == num:
                return false
                
    return true
```

## Complexity Analysis

### Time Complexity

The worst-case time complexity is **O(9^M)** where M is the number of empty cells.

- For each empty cell, we try up to 9 different numbers
- In the worst case (empty board), M = 81
- The algorithm prunes many invalid branches through constraint checking

### Space Complexity

- **O(1)** extra space for the board (modified in-place)
- **O(M)** space for the recursion call stack
  - M is the number of empty cells
  - Maximum depth of recursion is 81 (completely empty board)

### Optimization Notes

While the theoretical worst-case time complexity appears high, the actual performance is much better in practice because:

1. The constraint checking (`isValid` function) eliminates many invalid possibilities early
2. Most real Sudoku puzzles have multiple given numbers, significantly reducing the search space
3. The backtracking approach quickly abandons invalid solution paths

## Technical Implementation

The solver is implemented in TypeScript with these key components:

- `SudokuSolver` class: Core solving algorithm
- React components for UI interaction
- Tailwind CSS for styling
- Error handling and validation
- Real-time user feedback

## Getting Started

1. Clone the repository
2. Install dependencies: `npm install`
3. Start the development server: `npm run dev`
4. Open your browser to the local development URL

## Usage

1. Enter known numbers in the Sudoku grid
2. Leave empty cells (or enter 0) for positions to be solved
3. Click "Solve" to find the solution
4. Use "Reset" to clear the board

## Big O-notation
(Big O-notation) of this Sudoku solver application is O(9^M), where M is the number of empty cells in the puzzle. Here's the detailed breakdown:

Worst Case: O(9^M)

For each empty cell, we try up to 9 different numbers
In a completely empty board (M = 81), this leads to 9^81 possible combinations
However, the actual runtime is much better due to constraint checking
Space Complexity: O(M)

O(1) for the board itself (modified in-place)
O(M) for the recursion call stack
M is the number of empty cells (maximum 81)
Constraint Checking: O(1)

isValid() function runs in constant time
Checking row: O(9)
Checking column: O(9)
Checking 3x3 box: O(9)
These are all constant regardless of input size
The algorithm performs much better in practice than the theoretical worst case because:

The constraint checking (isValid function) eliminates many invalid possibilities early
Most real Sudoku puzzles have multiple given numbers, reducing M significantly
The backtracking approach quickly abandons invalid solution paths
This implementation is efficient for practical use as most Sudoku puzzles have 20-30 given numbers, making M much smaller than the theoretical maximum of 81.
