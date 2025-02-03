import { Position, Piece, TeamType } from "../constants";
import { isBishopMove } from "./bishop";
import { isRookMove } from "./rook";

 export const isQueenMove=(previousLocation: Position, desiredLocation: Position, boardState:Piece[],team: TeamType): boolean=> {
   
    return (
      isRookMove(previousLocation, desiredLocation, boardState, team) ||
      isBishopMove(previousLocation, desiredLocation, boardState, team)
  );
  }