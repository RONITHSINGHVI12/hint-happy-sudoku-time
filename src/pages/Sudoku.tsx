import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ModeToggle } from "@/components/mode-toggle";
import SudokuBoard from "@/components/sudoku/SudokuBoard";
import { generateSudoku, SudokuPuzzle, Difficulty } from "@/lib/sudoku";

const Sudoku = () => {
  const [currentPuzzle, setCurrentPuzzle] = useState<SudokuPuzzle | null>(null);
  const [difficulty, setDifficulty] = useState<Difficulty>("medium");
  const [hints, setHints] = useState(0);
  const [isGameComplete, setIsGameComplete] = useState(false);

  const startNewGame = (selectedDifficulty: Difficulty) => {
    const puzzle = generateSudoku(selectedDifficulty);
    setCurrentPuzzle(puzzle);
    setDifficulty(selectedDifficulty);
    setHints(0);
    setIsGameComplete(false);
  };

  const handleHint = () => {
    setHints(prev => prev + 1);
  };

  const handleGameComplete = () => {
    setIsGameComplete(true);
  };

  if (!currentPuzzle) {
    return (
      <div className="min-h-screen bg-background p-6">
        <div className="max-w-4xl mx-auto">
          <Card className="mb-6 shadow-elegant animate-float">
            <CardHeader className="bg-gradient-primary text-white rounded-t-lg relative">
              <CardTitle className="text-3xl text-center animate-glow">Sudoku Dashboard</CardTitle>
              <div className="absolute top-4 right-4">
                <ModeToggle />
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center">
                <h3 className="text-xl mb-4">Choose Difficulty Level</h3>
                <div className="flex flex-wrap justify-center gap-4">
                  <Button 
                    size="lg" 
                    variant="outline"
                    onClick={() => startNewGame("easy")}
                    className="w-32 transition-spring hover:shadow-soft"
                  >
                    Easy
                  </Button>
                  <Button 
                    size="lg" 
                    variant="default"
                    onClick={() => startNewGame("medium")}
                    className="w-32 bg-gradient-primary transition-spring hover:shadow-glow"
                  >
                    Medium
                  </Button>
                  <Button 
                    size="lg" 
                    variant="destructive"
                    onClick={() => startNewGame("hard")}
                    className="w-32 transition-spring hover:shadow-soft"
                  >
                    Hard
                  </Button>
                </div>
              </div>
              
              <div className="grid md:grid-cols-3 gap-4 mt-8">
                <Card className="shadow-soft hover:shadow-elegant transition-spring">
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-primary">Easy</div>
                    <div className="text-sm text-muted-foreground">45+ clues</div>
                    <div className="text-sm">Perfect for beginners</div>
                  </CardContent>
                </Card>
                <Card className="shadow-soft hover:shadow-elegant transition-spring">
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-primary">Medium</div>
                    <div className="text-sm text-muted-foreground">35-44 clues</div>
                    <div className="text-sm">Good challenge</div>
                  </CardContent>
                </Card>
                <Card className="shadow-soft hover:shadow-elegant transition-spring">
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-primary">Hard</div>
                    <div className="text-sm text-muted-foreground">25-34 clues</div>
                    <div className="text-sm">For experts</div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Game Board */}
          <div className="flex-1">
            <Card className="shadow-elegant">
              <CardHeader className="bg-gradient-secondary rounded-t-lg">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-white">Sudoku</CardTitle>
                  <Badge variant="outline" className="capitalize bg-white/10 border-white/20 text-white">
                    {difficulty}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <SudokuBoard 
                  puzzle={currentPuzzle}
                  onHint={handleHint}
                  onGameComplete={handleGameComplete}
                />
                {isGameComplete && (
                  <div className="text-center mt-4 p-4 bg-gradient-accent rounded-lg animate-glow">
                    <h3 className="text-xl font-bold text-white">🎉 Congratulations!</h3>
                    <p className="text-white">You completed the puzzle!</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Side Panel */}
          <div className="w-full lg:w-80 space-y-4">
            <Card className="shadow-soft hover:shadow-elegant transition-spring">
              <CardHeader>
                <CardTitle>Game Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span>Difficulty:</span>
                  <Badge variant="outline" className="capitalize">{difficulty}</Badge>
                </div>
                <div className="flex justify-between">
                  <span>Hints Used:</span>
                  <span className="font-mono text-primary">{hints}</span>
                </div>
                <div className="flex justify-between">
                  <span>Hints Available:</span>
                  <Badge variant="secondary">Unlimited</Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-soft hover:shadow-elegant transition-spring">
              <CardHeader>
                <CardTitle>Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button 
                  onClick={() => startNewGame(difficulty)} 
                  className="w-full transition-spring hover:shadow-soft"
                  variant="outline"
                >
                  🎲 Different Game (Same Level)
                </Button>
                <Button 
                  onClick={() => setCurrentPuzzle(null)} 
                  className="w-full transition-spring hover:shadow-soft"
                  variant="secondary"
                >
                  🏠 Back to Dashboard
                </Button>
              </CardContent>
            </Card>

            <Card className="shadow-soft hover:shadow-elegant transition-spring">
              <CardHeader>
                <CardTitle>How to Play</CardTitle>
              </CardHeader>
              <CardContent className="text-sm space-y-2">
                <p>• Fill each row, column, and 3×3 box with digits 1-9</p>
                <p>• Each digit must appear exactly once in each row, column, and box</p>
                <p>• Click a cell and enter a number</p>
                <p>• Use the Hint button for free help anytime</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sudoku;