export type Difficulty = "easy" | "medium" | "hard";

export interface SudokuPuzzle {
  board: number[][];
  solution: number[][];
  initialBoard: number[][];
  difficulty: Difficulty;
}

// Pre-generated puzzles for different difficulties
const EASY_PUZZLES = [
  {
    board: [
      [5, 3, 0, 0, 7, 0, 0, 0, 0],
      [6, 0, 0, 1, 9, 5, 0, 0, 0],
      [0, 9, 8, 0, 0, 0, 0, 6, 0],
      [8, 0, 0, 0, 6, 0, 0, 0, 3],
      [4, 0, 0, 8, 0, 3, 0, 0, 1],
      [7, 0, 0, 0, 2, 0, 0, 0, 6],
      [0, 6, 0, 0, 0, 0, 2, 8, 0],
      [0, 0, 0, 4, 1, 9, 0, 0, 5],
      [0, 0, 0, 0, 8, 0, 0, 7, 9]
    ],
    solution: [
      [5, 3, 4, 6, 7, 8, 9, 1, 2],
      [6, 7, 2, 1, 9, 5, 3, 4, 8],
      [1, 9, 8, 3, 4, 2, 5, 6, 7],
      [8, 5, 9, 7, 6, 1, 4, 2, 3],
      [4, 2, 6, 8, 5, 3, 7, 9, 1],
      [7, 1, 3, 9, 2, 4, 8, 5, 6],
      [9, 6, 1, 5, 3, 7, 2, 8, 4],
      [2, 8, 7, 4, 1, 9, 6, 3, 5],
      [3, 4, 5, 2, 8, 6, 1, 7, 9]
    ]
  },
  {
    board: [
      [0, 0, 0, 6, 0, 0, 4, 0, 0],
      [7, 0, 0, 0, 0, 3, 6, 0, 0],
      [0, 0, 0, 0, 9, 1, 0, 8, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 5, 0, 1, 8, 0, 0, 0, 3],
      [0, 0, 0, 3, 0, 6, 0, 4, 5],
      [0, 4, 0, 2, 0, 0, 0, 6, 0],
      [9, 0, 3, 0, 0, 0, 0, 0, 0],
      [0, 2, 0, 0, 0, 0, 1, 0, 0]
    ],
    solution: [
      [2, 1, 8, 6, 5, 7, 4, 3, 9],
      [7, 9, 4, 8, 2, 3, 6, 5, 1],
      [3, 6, 5, 4, 9, 1, 7, 8, 2],
      [1, 3, 6, 7, 4, 2, 8, 9, 5],
      [4, 5, 9, 1, 8, 5, 2, 7, 3],
      [8, 7, 2, 3, 1, 6, 9, 4, 5],
      [5, 4, 1, 2, 3, 8, 3, 6, 7],
      [9, 8, 3, 5, 6, 4, 5, 1, 4],
      [6, 2, 7, 9, 7, 9, 1, 2, 8]
    ]
  }
];

const MEDIUM_PUZZLES = [
  {
    board: [
      [0, 0, 0, 0, 0, 0, 6, 8, 0],
      [0, 0, 0, 0, 0, 3, 0, 0, 0],
      [7, 0, 0, 0, 9, 0, 5, 0, 0],
      [5, 7, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 8, 5, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 4, 2],
      [0, 0, 5, 0, 0, 0, 0, 0, 3],
      [0, 0, 0, 2, 0, 0, 0, 0, 0],
      [0, 3, 4, 0, 0, 0, 0, 0, 0]
    ],
    solution: [
      [1, 4, 3, 5, 2, 7, 6, 8, 9],
      [2, 5, 8, 1, 6, 3, 4, 9, 7],
      [7, 6, 9, 8, 9, 4, 5, 3, 1],
      [5, 7, 1, 3, 4, 2, 9, 6, 8],
      [3, 9, 2, 7, 8, 5, 1, 7, 4],
      [8, 1, 6, 9, 7, 1, 3, 4, 2],
      [6, 2, 5, 4, 1, 8, 7, 1, 3],
      [9, 8, 7, 2, 3, 6, 8, 5, 6],
      [4, 3, 4, 6, 5, 9, 2, 2, 5]
    ]
  }
];

const HARD_PUZZLES = [
  {
    board: [
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 3, 0, 8, 5],
      [0, 0, 1, 0, 2, 0, 0, 0, 0],
      [0, 0, 0, 5, 0, 7, 0, 0, 0],
      [0, 0, 4, 0, 0, 0, 1, 0, 0],
      [0, 9, 0, 0, 0, 0, 0, 0, 0],
      [5, 0, 0, 0, 0, 0, 0, 7, 3],
      [0, 0, 2, 0, 1, 0, 0, 0, 0],
      [0, 0, 0, 0, 4, 0, 0, 0, 9]
    ],
    solution: [
      [9, 8, 7, 6, 5, 4, 3, 2, 1],
      [2, 4, 6, 1, 7, 3, 9, 8, 5],
      [3, 5, 1, 9, 2, 8, 7, 4, 6],
      [1, 2, 8, 5, 3, 7, 6, 9, 4],
      [6, 3, 4, 8, 9, 2, 1, 5, 7],
      [7, 9, 5, 4, 6, 1, 8, 3, 2],
      [5, 1, 9, 2, 8, 6, 4, 7, 3],
      [4, 7, 2, 3, 1, 9, 5, 6, 8],
      [8, 6, 3, 7, 4, 5, 2, 1, 9]
    ]
  }
];

// Generate a valid solution for a Sudoku puzzle
const generateValidSolution = (): number[][] => {
  const board = Array(9).fill(null).map(() => Array(9).fill(0));
  
  const isValid = (board: number[][], row: number, col: number, num: number): boolean => {
    // Check row
    for (let j = 0; j < 9; j++) {
      if (board[row][j] === num) return false;
    }
    
    // Check column
    for (let i = 0; i < 9; i++) {
      if (board[i][col] === num) return false;
    }
    
    // Check 3x3 box
    const boxRow = Math.floor(row / 3) * 3;
    const boxCol = Math.floor(col / 3) * 3;
    for (let i = boxRow; i < boxRow + 3; i++) {
      for (let j = boxCol; j < boxCol + 3; j++) {
        if (board[i][j] === num) return false;
      }
    }
    
    return true;
  };
  
  const solve = (board: number[][]): boolean => {
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        if (board[row][col] === 0) {
          const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
          // Shuffle numbers for randomness
          for (let i = numbers.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [numbers[i], numbers[j]] = [numbers[j], numbers[i]];
          }
          
          for (const num of numbers) {
            if (isValid(board, row, col, num)) {
              board[row][col] = num;
              if (solve(board)) return true;
              board[row][col] = 0;
            }
          }
          return false;
        }
      }
    }
    return true;
  };
  
  solve(board);
  return board;
};

const createPuzzleFromSolution = (solution: number[][], difficulty: Difficulty): number[][] => {
  const puzzle = solution.map(row => [...row]);
  
  // Determine how many cells to remove based on difficulty
  let cellsToRemove: number;
  switch (difficulty) {
    case "easy":
      cellsToRemove = 35; // Remove 35 cells, leaving ~46 clues
      break;
    case "medium":
      cellsToRemove = 45; // Remove 45 cells, leaving ~36 clues
      break;
    case "hard":
      cellsToRemove = 55; // Remove 55 cells, leaving ~26 clues
      break;
  }
  
  // Randomly remove cells
  const positions = [];
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      positions.push({ row, col });
    }
  }
  
  // Shuffle positions
  for (let i = positions.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [positions[i], positions[j]] = [positions[j], positions[i]];
  }
  
  // Remove cells
  for (let i = 0; i < cellsToRemove && i < positions.length; i++) {
    const { row, col } = positions[i];
    puzzle[row][col] = 0;
  }
  
  return puzzle;
};

export const generateSudoku = (difficulty: Difficulty): SudokuPuzzle => {
  // For now, use pre-made puzzles for consistency
  let puzzleSet;
  switch (difficulty) {
    case "easy":
      puzzleSet = EASY_PUZZLES;
      break;
    case "medium":
      puzzleSet = MEDIUM_PUZZLES;
      break;
    case "hard":
      puzzleSet = HARD_PUZZLES;
      break;
  }
  
  // If no pre-made puzzles available, generate one
  if (puzzleSet.length === 0) {
    const solution = generateValidSolution();
    const board = createPuzzleFromSolution(solution, difficulty);
    return {
      board: board.map(row => [...row]),
      solution,
      initialBoard: board.map(row => [...row]),
      difficulty
    };
  }
  
  // Select a random puzzle from the set
  const selectedPuzzle = puzzleSet[Math.floor(Math.random() * puzzleSet.length)];
  
  return {
    board: selectedPuzzle.board.map(row => [...row]),
    solution: selectedPuzzle.solution,
    initialBoard: selectedPuzzle.board.map(row => [...row]),
    difficulty
  };
};