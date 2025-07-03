import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-6">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold">Sudoku Game</CardTitle>
          <p className="text-muted-foreground">Challenge your mind with classic Sudoku puzzles</p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-center space-y-2">
            <p className="text-sm">Features:</p>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Multiple difficulty levels</li>
              <li>• Unlimited free hints</li>
              <li>• Error detection</li>
              <li>• Clean, intuitive interface</li>
            </ul>
          </div>
          <Button 
            onClick={() => navigate("/sudoku")} 
            className="w-full"
            size="lg"
          >
            Play Sudoku
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default Index;
