import React, { useState } from 'react';
import { SudokuSolver } from '../lib/sudokuSolver';
import { RefreshCw, Play, Trash2 } from 'lucide-react';

const initialBoard = Array(9).fill(null).map(() => Array(9).fill(0));

export function SudokuBoard() {
  const [board, setBoard] = useState<number[][]>(JSON.parse(JSON.stringify(initialBoard)));
  const [solving, setSolving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCellChange = (row: number, col: number, value: string) => {
    const num = value === '' ? 0 : parseInt(value);
    if ((num >= 0 && num <= 9) || value === '') {
      const newBoard = board.map(r => [...r]);
      newBoard[row][col] = num;
      setBoard(newBoard);
      setError(null);
    }
  };

  const validateBoard = (board: number[][]): boolean => {
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        const currentValue = board[row][col];
        if (currentValue !== 0) {
          // Temporarily set the current value to 0 to check if it's valid in its position
          board[row][col] = 0;
          const solver = new SudokuSolver(board);
          if (!solver.isValid(row, col, currentValue)) {
            board[row][col] = currentValue; // Restore the value
            return false;
          }
          board[row][col] = currentValue; // Restore the value
        }
      }
    }
    return true;
  };

  const solveSudoku = () => {
    setSolving(true);
    setError(null);

    try {
      // First validate the initial board
      if (!validateBoard(board)) {
        setError("Invalid initial board configuration!");
        setSolving(false);
        return;
      }

      // Create a deep copy of the board for solving
      const boardCopy = board.map(row => [...row]);
      const solver = new SudokuSolver(boardCopy);
      const solution = solver.solve();

      if (solution) {
        setBoard(solution);
      } else {
        setError("No solution exists for this puzzle!");
      }
    } catch (err) {
      setError("An error occurred while solving the puzzle.");
      console.error(err);
    } finally {
      setSolving(false);
    }
  };

  const resetBoard = () => {
    setBoard(JSON.parse(JSON.stringify(initialBoard)));
    setError(null);
  };

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="grid grid-cols-9 gap-[1px] bg-gray-300 p-[1px] rounded-lg shadow-lg">
        {board.map((row, rowIndex) => (
          row.map((cell, colIndex) => (
            <input
              key={`${rowIndex}-${colIndex}`}
              type="number"
              min="1"
              max="9"
              value={cell === 0 ? '' : cell}
              onChange={(e) => handleCellChange(rowIndex, colIndex, e.target.value)}
              className={`
                w-12 h-12 text-center text-lg font-semibold
                ${(colIndex + 1) % 3 === 0 && colIndex !== 8 ? 'border-r-2 border-gray-400' : ''}
                ${(rowIndex + 1) % 3 === 0 && rowIndex !== 8 ? 'border-b-2 border-gray-400' : ''}
                focus:outline-none focus:bg-blue-50
                ${cell === 0 ? 'bg-white' : 'bg-gray-50'}
              `}
            />
          ))
        ))}
      </div>

      {error && (
        <div className="text-red-500 font-medium">{error}</div>
      )}

      <div className="flex gap-4">
        <button
          onClick={solveSudoku}
          disabled={solving}
          className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
        >
          {solving ? <RefreshCw className="animate-spin h-5 w-5" /> : <Play className="h-5 w-5" />}
          {solving ? 'Solving...' : 'Solve'}
        </button>

        <button
          onClick={resetBoard}
          className="flex items-center gap-2 px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
        >
          <Trash2 className="h-5 w-5" />
          Reset
        </button>
      </div>
    </div>
  );
}