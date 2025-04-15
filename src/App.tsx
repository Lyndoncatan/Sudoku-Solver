import React from 'react';
import { SudokuBoard } from './components/SudokuBoard';
import { Brain } from 'lucide-react';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Brain className="h-10 w-10 text-blue-600" />
            <h1 className="text-4xl font-bold text-gray-900">Sudoku Solver</h1>
          </div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Enter your Sudoku puzzle below and let our advanced backtracking algorithm find the solution.
            Leave empty cells blank or use 0 for cells to be solved.
          </p>
        </div>

        <SudokuBoard />

        <footer className="mt-16 text-center text-gray-500 text-sm">
          <p>Built with React and TypeScript • Using Backtracking Algorithm</p>
        </footer>
      </div>
    </div>
  );
}

export default App;