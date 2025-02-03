import {PieceType,TeamType,Piece,Position} from "../constants";

export default class Refree {
    isOccupied(x:number,y:number,boardState:Piece[]){
        const piece=boardState.find(p=> p.position.x==x && p.position.y==y)
        if(piece){
            return true
        }
        else{
            return false;
        }
        
    }

    isOccupiedByOpponent(x:number,y:number,boardState:Piece[],team:TeamType){
      const piece=boardState.find(p=> p.position.x==x && p.position.y==y && p.team!=team)
      if(piece){
          return true
      }
      else{
          return false;
      }
      
    }

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
      if (this.isOccupied(desiredLocation.x,desiredLocation.y,boardState)) return false;
      
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
            isvalid= this.isPawnMove(previousLocation,desiredLocation,boardState,team)
            break;
          case PieceType.KNIGHT:
            isvalid= this.isKnightMove(previousLocation,desiredLocation,boardState,team)
            break;
          case PieceType.BISHOP:
            isvalid= this.isBishopMove(previousLocation,desiredLocation,boardState,team)
            break;
          case PieceType.ROOK:
            isvalid= this.isRookMove(previousLocation,desiredLocation,boardState,team)
            break;
          case PieceType.QUEEN:
            isvalid= this.isQueenMove(previousLocation,desiredLocation,boardState,team)
            break;
          case PieceType.KING:
              isvalid= this.isKingMove(previousLocation,desiredLocation,boardState,team)
              break;
        }
        return isvalid
    }


  isPawnMove(previousLocation: Position, desiredLocation: Position, boardState:Piece[],team: TeamType): boolean {
    const direction = team === TeamType.OUR ? 1 : -1; // OUR moves up (+1), THEIR moves down (-1)
        const startRow = team === TeamType.OUR ? 1 : 6; // OUR pawns start at row 1, THEIR pawns at row 6
    
        // ✅ Diagonal capture: Can move diagonally if an opponent is there
        if (Math.abs(previousLocation.x - desiredLocation.x) === 1 && desiredLocation.y === previousLocation.y + direction) {
          if (this.isOccupiedByOpponent(desiredLocation.x, desiredLocation.y, boardState,team)) {
              return true;
            
          }
        }
    
        // ✅ Two-step move from starting position (Must be empty & intermediate step must be empty)
        if (previousLocation.y === startRow && previousLocation.x === desiredLocation.x && desiredLocation.y === previousLocation.y + 2 * direction) {
          if (!this.isOccupied(desiredLocation.x, desiredLocation.y, boardState) && !this.isOccupied(desiredLocation.x, previousLocation.y + direction, boardState)) {
            return true;
          }
        }
    
        // ✅ One-step forward move (Must be empty)
        if (previousLocation.x === desiredLocation.x && desiredLocation.y === previousLocation.y + direction) {
          if (!this.isOccupied(desiredLocation.x, desiredLocation.y, boardState)) {
            return true;
          }
        }
        return false;
  }

  isKnightMove(previousLocation: Position, desiredLocation: Position, boardState:Piece[],team: TeamType): boolean {
    const dx = Math.abs(previousLocation.x - desiredLocation.x);
    const dy = Math.abs(previousLocation.y - desiredLocation.y);

    // ✅ Check if move is in "L" shape (2 squares in one direction & 1 in the other)
    if ((dx === 2 && dy === 1) || (dx === 1 && dy === 2)) {
      // ✅ Allow move if the target square is empty or occupied by opponent
      if (!this.isOccupied(desiredLocation.x, desiredLocation.y, boardState) || 
          this.isOccupiedByOpponent(desiredLocation.x, desiredLocation.y, boardState, team)) {
        return true;
      }
    }
        return false;
  }

  isBishopMove(previousLocation: Position, desiredLocation: Position, boardState:Piece[],team: TeamType): boolean {
    const dx = Math.abs(previousLocation.x - desiredLocation.x);
    const dy = Math.abs(previousLocation.y - desiredLocation.y);

    // ✅ Must move diagonally (equal steps in x and y)
    if (dx === dy) {
      const xStep = desiredLocation.x > previousLocation.x ? 1 : -1;
      const yStep = desiredLocation.y > previousLocation.y ? 1 : -1;
      
      let x = previousLocation.x + xStep;
      let y = previousLocation.y + yStep;

      // ✅ Check if path is clear
      while (x !== desiredLocation.x && y !== desiredLocation.y) {
        if (this.isOccupied(x, y, boardState)) {
          return false; // Blocked path
        }
        x += xStep;
        y += yStep;
      }

      // ✅ Allow move if destination is empty or occupied by opponent
      if (!this.isOccupied(desiredLocation.x, desiredLocation.y, boardState) || 
          this.isOccupiedByOpponent(desiredLocation.x, desiredLocation.y, boardState, team)) {
        return true;
      }
    }
        return false;
  }

  isRookMove(previousLocation: Position, desiredLocation: Position, boardState:Piece[],team: TeamType): boolean {
    if(desiredLocation.x===previousLocation.x || desiredLocation.y==previousLocation.y){
      const dx=desiredLocation.x>previousLocation.x?1:desiredLocation.x<previousLocation.x?-1:0
      const dy=desiredLocation.y>previousLocation.y?1:desiredLocation.y<previousLocation.y?-1:0
      let x = previousLocation.x + dx;
      let y = previousLocation.y + dy;
      while(x!=desiredLocation.x || y!=desiredLocation.y){
        if(this.isOccupied(x,y,boardState)){
          return false;
        }
        x+=dx
        y+=dy
      }
      if(!this.isOccupied(desiredLocation.x,desiredLocation.y,boardState) || this.isOccupiedByOpponent(desiredLocation.x,desiredLocation.y,boardState,team)){
        return true;
      }

    }
        return false;
  }


  isQueenMove(previousLocation: Position, desiredLocation: Position, boardState:Piece[],team: TeamType): boolean {
   
    return (
      this.isRookMove(previousLocation, desiredLocation, boardState, team) ||
      this.isBishopMove(previousLocation, desiredLocation, boardState, team)
  );
  }

  isKingMove(previousLocation: Position, desiredLocation: Position, boardState:Piece[],team: TeamType): boolean {
    let dx=Math.abs(desiredLocation.x-previousLocation.x)
    let dy=Math.abs(desiredLocation.y-previousLocation.y)
    if(dx==1 || dy==1){
      if(!this.isOccupied(desiredLocation.x,desiredLocation.y,boardState) || this.isOccupiedByOpponent(desiredLocation.x,desiredLocation.y,boardState,team)){
        return true;
      }
    }
        return false;
  }
    
}
