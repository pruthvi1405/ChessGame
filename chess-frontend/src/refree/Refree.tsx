import {PieceType,TeamType,Piece,Position} from "../constants";
import {isPawnMove,isBishopMove,isKingMove,isKnightMove,isOccupied,isOccupiedByOpponent,isQueenMove,isRookMove} from "./index"

export default class Refree {
    

    isEnpassantMove(
      grabPosition:Position,
      desiredLocation:Position,
      type: PieceType,
      team: TeamType,
      boardState: Piece[]
    ): boolean {
      if (type !== PieceType.PAWN) return false;
    
      const direction = team === TeamType.OUR ? 1 : -1;
      // const specialRow= team === TeamType.OUR ? 3: 4
    
      if (Math.abs(desiredLocation.x - grabPosition?.x) !== 1 || desiredLocation.y - grabPosition?.y !== direction) return false;
    
      // Destination square must be empty.
      if (isOccupied(desiredLocation.x,desiredLocation.y,boardState)) return false;
      
      // if(py!=specialRow) return false;
      // Find an opponent's pawn in the correct en passant capture position.
      const enemyPawn = boardState.find(p => 
        p.position.x === desiredLocation.x &&       // The enemy pawn is in the same column as the destination square
        p.position.y === grabPosition?.y &&     // The enemy pawn is in the same row as the capturing pawn's starting row
        p.enPassant === true && // The enemy pawn must have moved two squares in the last turn
        p.team !== team    // The pawn must belong to the opponent
      );
    
      // Log debugging information
      console.log("Checking En Passant Move:");
      console.log(`Pawn at (${grabPosition?.x}, ${grabPosition?.y}) moving to (${desiredLocation.x}, ${desiredLocation.y})`);
      console.log(`Direction: ${direction}`);
      console.log(`Enemy Pawn at (${desiredLocation.x}, ${grabPosition?.y}) → ${enemyPawn ? "Eligible for Capture" : "Not Found"}`);
      
      if (enemyPawn) {
        console.log(`Captured Pawn Details: ${JSON.stringify(enemyPawn, null, 2)}`);
      }
    
      return !!enemyPawn;
    }
    


    isvalid(
      previousLocation:Position,
      desiredLocation:Position,
      type: PieceType,
      team: TeamType,
      boardState: Piece[]
    ): boolean {
      let isvalid=false
        switch(type){
          case PieceType.PAWN:
            isvalid= isPawnMove(previousLocation,desiredLocation,boardState,team)
            break;
          case PieceType.KNIGHT:
            isvalid= isKnightMove(previousLocation,desiredLocation,boardState,team)
            break;
          case PieceType.BISHOP:
            isvalid= isBishopMove(previousLocation,desiredLocation,boardState,team)
            break;
          case PieceType.ROOK:
            isvalid= isRookMove(previousLocation,desiredLocation,boardState,team)
            break;
          case PieceType.QUEEN:
            isvalid=isQueenMove(previousLocation,desiredLocation,boardState,team)
            break;
          case PieceType.KING:
              isvalid= isKingMove(previousLocation,desiredLocation,boardState,team)
              break;
        }
        return isvalid
    }

}
