import { log } from "console";
import {PieceType,TeamType,Piece} from "../components/ChessBoard/ChessBoard";

export default class Refree {
    isOccupied(x:number,y:number,boardState:Piece[]){
        const piece=boardState.find(p=> p.x==x && p.y==y)
        if(piece){
            return true
        }
        else{
            return false;
        }
        
    }

    isOccupiedByOpponent(x:number,y:number,boardState:Piece[],team:TeamType){
      const piece=boardState.find(p=> p.x==x && p.y==y && p.team!=team)
      if(piece){
          return true
      }
      else{
          return false;
      }
      
    }

    isEnpassantMove(
      px: number,
      py: number,
      x: number,
      y: number,
      type: PieceType,
      team: TeamType,
      boardState: Piece[]
    ): boolean {
      if (type !== PieceType.PAWN) return false;
    
      const direction = team === TeamType.OUR ? 1 : -1;
      const specialRow= team === TeamType.OUR ? 3: 4
    
      if (Math.abs(x - px) !== 1 || y - py !== direction) return false;
    
      // Destination square must be empty.
      if (this.isOccupied(x,y,boardState)) return false;
      
      if(py!=specialRow) return false;
      // Find an opponent's pawn in the correct en passant capture position.
      const enemyPawn = boardState.find(p => 
        p.x === x &&       // The enemy pawn is in the same column as the destination square
        p.y === py &&     // The enemy pawn is in the same row as the capturing pawn's starting row
        // p.enPassant === true && // The enemy pawn must have moved two squares in the last turn
        p.team !== team    // The pawn must belong to the opponent
      );
    
      // Log debugging information
      console.log("Checking En Passant Move:");
      console.log(`Pawn at (${px}, ${py}) moving to (${x}, ${y})`);
      console.log(`Direction: ${direction}`);
      console.log(`Enemy Pawn at (${x}, ${py}) → ${enemyPawn ? "Eligible for Capture" : "Not Found"}`);
      
      if (enemyPawn) {
        console.log(`Captured Pawn Details: ${JSON.stringify(enemyPawn, null, 2)}`);
      }
    
      return !!enemyPawn;
    }
    


    isvalid(
      px: number,
      py: number,
      x: number,
      y: number,
      type: PieceType,
      team: TeamType,
      boardState: Piece[]
    ): boolean {
      if (type === PieceType.PAWN) {
        const direction = team === TeamType.OUR ? 1 : -1; // OUR moves up (+1), THEIR moves down (-1)
        const startRow = team === TeamType.OUR ? 1 : 6; // OUR pawns start at row 1, THEIR pawns at row 6
    
        // ✅ Diagonal capture: Can move diagonally if an opponent is there
        if (Math.abs(px - x) === 1 && y === py + direction) {
          if (this.isOccupiedByOpponent(x, y, boardState,team)) {
              return true;
            
          }
        }
    
        // ✅ Two-step move from starting position (Must be empty & intermediate step must be empty)
        if (py === startRow && px === x && y === py + 2 * direction) {
          if (!this.isOccupied(x, y, boardState) && !this.isOccupied(x, py + direction, boardState)) {
            return true;
          }
        }
    
        // ✅ One-step forward move (Must be empty)
        if (px === x && y === py + direction) {
          if (!this.isOccupied(x, y, boardState)) {
            return true;
          }
        }
      }
    
      return false;
    }
    
}
