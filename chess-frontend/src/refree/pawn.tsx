import { Piece, Position, TeamType } from "../constants";
import {isOccupied,isOccupiedByOpponent } from "./general";


export const isPawnMove=(previousLocation: Position, desiredLocation: Position, boardState:Piece[],team: TeamType): boolean=> {
    const direction = team === TeamType.OUR ? 1 : -1; // OUR moves up (+1), THEIR moves down (-1)
        const startRow = team === TeamType.OUR ? 1 : 6; // OUR pawns start at row 1, THEIR pawns at row 6
    
        // ✅ Diagonal capture: Can move diagonally if an opponent is there
        if (Math.abs(previousLocation.x - desiredLocation.x) === 1 && desiredLocation.y === previousLocation.y + direction) {
          if (isOccupiedByOpponent(desiredLocation.x, desiredLocation.y, boardState,team)) {
              return true;
            
          }
        }
    
        // ✅ Two-step move from starting position (Must be empty & intermediate step must be empty)
        if (previousLocation.y === startRow && previousLocation.x === desiredLocation.x && desiredLocation.y === previousLocation.y + 2 * direction) {
          if (!isOccupied(desiredLocation.x, desiredLocation.y, boardState) && !isOccupied(desiredLocation.x, previousLocation.y + direction, boardState)) {
            return true;
          }
        }
    
        // ✅ One-step forward move (Must be empty)
        if (previousLocation.x === desiredLocation.x && desiredLocation.y === previousLocation.y + direction) {
          if (!isOccupied(desiredLocation.x, desiredLocation.y, boardState)) {
            return true;
          }
        }
        return false;
  }