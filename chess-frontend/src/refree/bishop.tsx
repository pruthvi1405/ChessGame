import { Position, Piece, TeamType } from "../constants";
import { isOccupied,isOccupiedByOpponent } from "./general";


export const isBishopMove=(previousLocation: Position, desiredLocation: Position, boardState:Piece[],team: TeamType): boolean=> {
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
        if (isOccupied(x, y, boardState)) {
          return false; // Blocked path
        }
        x += xStep;
        y += yStep;
      }

      // ✅ Allow move if destination is empty or occupied by opponent
      if (!isOccupied(desiredLocation.x, desiredLocation.y, boardState) || 
          isOccupiedByOpponent(desiredLocation.x, desiredLocation.y, boardState, team)) {
        return true;
      }
    }
        return false;
  }