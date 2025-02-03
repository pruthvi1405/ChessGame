import { Piece, Position, TeamType } from "../constants";
import { isOccupied,isOccupiedByOpponent } from "./general";

export const isKnightMove=(previousLocation: Position, desiredLocation: Position, boardState:Piece[],team: TeamType): boolean =>{
    const dx = Math.abs(previousLocation.x - desiredLocation.x);
    const dy = Math.abs(previousLocation.y - desiredLocation.y);

    // ✅ Check if move is in "L" shape (2 squares in one direction & 1 in the other)
    if ((dx === 2 && dy === 1) || (dx === 1 && dy === 2)) {
      // ✅ Allow move if the target square is empty or occupied by opponent
      if (!isOccupied(desiredLocation.x, desiredLocation.y, boardState) || 
          isOccupiedByOpponent(desiredLocation.x, desiredLocation.y, boardState, team)) {
        return true;
      }
    }
        return false;
  }