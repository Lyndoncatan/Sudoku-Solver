export class SudokuSolver {
  private board: number[][];

  constructor(initialBoard: number[][]) {
    // Create a deep copy of the initial board
    this.board = initialBoard.map(row => [...row]);
  }

  solve(): number[][] | null {
    if (this.solveHelper()) {
      return this.board;
    }
    return null;
  }

  private solveHelper(): boolean {
    const emptyCell = this.findEmptyCell();
    if (!emptyCell) return true;

    const [row, col] = emptyCell;

    for (let num = 1; num <= 9; num++) {
      if (this.isValid(row, col, num)) {
        this.board[row][col] = num;

        if (this.solveHelper()) {
          return true;
        }

        this.board[row][col] = 0;
      }
    }

    return false;
  }

  private findEmptyCell(): [number, number] | null {
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        if (this.board[row][col] === 0) {
          return [row, col];
        }
      }
    }
    return null;
  }

  isValid(row: number, col: number, num: number): boolean {
    // Check row
    for (let x = 0; x < 9; x++) {
      if (x !== col && this.board[row][x] === num) return false;
    }

    // Check column
    for (let x = 0; x < 9; x++) {
      if (x !== row && this.board[x][col] === num) return false;
    }

    // Check 3x3 box
    const startRow = Math.floor(row / 3) * 3;
    const startCol = Math.floor(col / 3) * 3;

    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        const currentRow = i + startRow;
        const currentCol = j + startCol;
        if (currentRow !== row || currentCol !== col) {
          if (this.board[currentRow][currentCol] === num) return false;
        }
      }
    }

    return true;
  }
}