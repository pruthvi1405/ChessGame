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
