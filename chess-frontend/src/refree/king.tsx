import { Position, Piece, TeamType } from "../constants";
import { isOccupied,isOccupiedByOpponent } from "./general";


export const isKingMove=(previousLocation: Position, desiredLocation: Position, boardState:Piece[],team: TeamType): boolean =>{
    let dx=Math.abs(desiredLocation.x-previousLocation.x)
    let dy=Math.abs(desiredLocation.y-previousLocation.y)
    if(dx==1 || dy==1){
      if(!isOccupied(desiredLocation.x,desiredLocation.y,boardState) || isOccupiedByOpponent(desiredLocation.x,desiredLocation.y,boardState,team)){
        return true;
      }
    }
        return false;
  }
    