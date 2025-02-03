import { Piece, TeamType } from "../constants";

export const isOccupied=(x:number,y:number,boardState:Piece[])=>{
        const piece=boardState.find(p=> p.position.x==x && p.position.y==y)
        if(piece){
            return true
        }
        else{
            return false;
        }
        
    }

export const isOccupiedByOpponent=(x:number,y:number,boardState:Piece[],team:TeamType)=>{
      const piece=boardState.find(p=> p.position.x==x && p.position.y==y && p.team!=team)
      if(piece){
          return true
      }
      else{
          return false;
      }
      
    }