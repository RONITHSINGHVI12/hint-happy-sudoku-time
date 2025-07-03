import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { SudokuPuzzle } from "@/lib/sudoku";
import { cn } from "@/lib/utils";

interface SudokuBoardProps {
  puzzle: SudokuPuzzle;
  onHint: () => void;
  onGameComplete: () => void;
}

type CellError = {
  row: number;
  col: number;
};

const SudokuBoard = ({ puzzle, onHint, onGameComplete }: SudokuBoardProps) => {
  const [currentBoard, setCurrentBoard] = useState<number[][]>(() => 
    puzzle.board.map(row => [...row])
  );
  const [selectedCell, setSelectedCell] = useState<{ row: number; col: number } | null>(null);
  const [errors, setErrors] = useState<CellError[]>([]);

  useEffect(() => {
    setCurrentBoard(puzzle.board.map(row => [...row]));
    setSelectedCell(null);
    setErrors([]);
  }, [puzzle]);

  const isValidMove = (board: number[][], row: number, col: number, num: number): boolean => {
    // Check row
    for (let j = 0; j < 9; j++) {
      if (j !== col && board[row][j] === num) return false;
    }

    // Check column
    for (let i = 0; i < 9; i++) {
      if (i !== row && board[i][col] === num) return false;
    }

    // Check 3x3 box
    const boxRow = Math.floor(row / 3) * 3;
    const boxCol = Math.floor(col / 3) * 3;
    for (let i = boxRow; i < boxRow + 3; i++) {
      for (let j = boxCol; j < boxCol + 3; j++) {
        if ((i !== row || j !== col) && board[i][j] === num) return false;
      }
    }

    return true;
  };

  const findErrors = (board: number[][]): CellError[] => {
    const errorCells: CellError[] = [];
    
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        if (board[row][col] !== 0) {
          if (!isValidMove(board, row, col, board[row][col])) {
            errorCells.push({ row, col });
          }
        }
      }
    }
    
    return errorCells;
  };

  const handleCellClick = (row: number, col: number) => {
    if (puzzle.initialBoard[row][col] !== 0) return; // Can't modify initial clues
    setSelectedCell({ row, col });
  };

  const handleNumberInput = (num: number) => {
    if (!selectedCell) return;
    
    const newBoard = currentBoard.map(row => [...row]);
    newBoard[selectedCell.row][selectedCell.col] = num;
    
    setCurrentBoard(newBoard);
    
    // Check for errors
    const newErrors = findErrors(newBoard);
    setErrors(newErrors);
    
    // Check if game is complete
    const isComplete = newBoard.every(row => 
      row.every(cell => cell !== 0)
    ) && newErrors.length === 0;
    
    if (isComplete) {
      onGameComplete();
    }
  };

  const handleHint = () => {
    if (!selectedCell) return;
    
    const { row, col } = selectedCell;
    if (puzzle.initialBoard[row][col] !== 0) return; // Can't hint on initial clues
    
    // Find the correct number for this cell
    const correctNumber = puzzle.solution[row][col];
    handleNumberInput(correctNumber);
    onHint();
  };

  const clearCell = () => {
    if (!selectedCell) return;
    handleNumberInput(0);
  };

  const getCellClassName = (row: number, col: number) => {
    const isInitial = puzzle.initialBoard[row][col] !== 0;
    const isSelected = selectedCell?.row === row && selectedCell?.col === col;
    const hasError = errors.some(error => error.row === row && error.col === col);
    const isInSameRow = selectedCell?.row === row;
    const isInSameCol = selectedCell?.col === col;
    const isInSameBox = selectedCell && 
      Math.floor(selectedCell.row / 3) === Math.floor(row / 3) && 
      Math.floor(selectedCell.col / 3) === Math.floor(col / 3);

    return cn(
      "w-12 h-12 border border-border flex items-center justify-center text-lg font-semibold cursor-pointer transition-colors",
      "hover:bg-accent",
      {
        "bg-primary text-primary-foreground": isSelected,
        "bg-muted": isInitial,
        "bg-destructive/20 text-destructive": hasError,
        "bg-accent/50": !isSelected && (isInSameRow || isInSameCol || isInSameBox),
        "border-r-2 border-r-primary": col === 2 || col === 5,
        "border-b-2 border-b-primary": row === 2 || row === 5,
        "font-bold": isInitial,
      }
    );
  };

  return (
    <div className="flex flex-col items-center space-y-6">
      {/* Sudoku Grid */}
      <div className="grid grid-cols-9 gap-0 border-2 border-primary rounded-lg overflow-hidden">
        {currentBoard.map((row, rowIndex) =>
          row.map((cell, colIndex) => (
            <div
              key={`${rowIndex}-${colIndex}`}
              className={getCellClassName(rowIndex, colIndex)}
              onClick={() => handleCellClick(rowIndex, colIndex)}
            >
              {cell !== 0 ? cell : ""}
            </div>
          ))
        )}
      </div>

      {/* Number Input Buttons */}
      <div className="grid grid-cols-5 gap-2 w-full max-w-md">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => (
          <Button
            key={num}
            variant="outline"
            size="lg"
            onClick={() => handleNumberInput(num)}
            disabled={!selectedCell || puzzle.initialBoard[selectedCell.row][selectedCell.col] !== 0}
            className="h-12"
          >
            {num}
          </Button>
        ))}
        <Button
          variant="secondary"
          size="lg"
          onClick={clearCell}
          disabled={!selectedCell || puzzle.initialBoard[selectedCell.row][selectedCell.col] !== 0}
          className="h-12"
        >
          Clear
        </Button>
        <Button
          variant="default"
          size="lg"
          onClick={handleHint}
          disabled={!selectedCell || puzzle.initialBoard[selectedCell.row][selectedCell.col] !== 0}
          className="h-12 col-span-5"
        >
          💡 Get Hint (Free)
        </Button>
      </div>

      {errors.length > 0 && (
        <div className="text-destructive text-sm text-center">
          ⚠️ There are conflicts in your solution. Check highlighted cells.
        </div>
      )}

      {selectedCell && (
        <div className="text-sm text-muted-foreground text-center">
          Selected: Row {selectedCell.row + 1}, Column {selectedCell.col + 1}
        </div>
      )}
    </div>
  );
};

export default SudokuBoard;