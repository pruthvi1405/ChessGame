import { Position, Piece, TeamType } from "../constants";
import { isOccupied,isOccupiedByOpponent } from "./general";


 export const isRookMove=(previousLocation: Position, desiredLocation: Position, boardState:Piece[],team: TeamType): boolean =>{
    if(desiredLocation.x===previousLocation.x || desiredLocation.y==previousLocation.y){
      const dx=desiredLocation.x>previousLocation.x?1:desiredLocation.x<previousLocation.x?-1:0
      const dy=desiredLocation.y>previousLocation.y?1:desiredLocation.y<previousLocation.y?-1:0
      let x = previousLocation.x + dx;
      let y = previousLocation.y + dy;
      while(x!=desiredLocation.x || y!=desiredLocation.y){
        if(isOccupied(x,y,boardState)){
          return false;
        }
        x+=dx
        y+=dy
      }
      if(!isOccupied(desiredLocation.x,desiredLocation.y,boardState) || isOccupiedByOpponent(desiredLocation.x,desiredLocation.y,boardState,team)){
        return true;
      }

    }
        return false;
  }
