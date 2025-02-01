import {PieceType,TeamType} from "../components/ChessBoard/ChessBoard";

export default class Refree {
    isvalid(px:number,py:number,x:number,y:number,type:PieceType,team:TeamType){
        if(type===PieceType.PAWN){
            if(team==TeamType.OUR){
                if(py===1){
                    if(px==x && y<=py+2 && y>py){
                        
                        return true;
                    }
                }
                else{
                    if(px==x && y<py+2){
                        return true;
                    }
                }
            }
            else{
                if(py===6){
                    if(px==x && y>=py-2 && y<py){
                        
                        return true;
                    }
                }
                else{
                    if(px==x && y>py+2){
                        return true;
                    }
                }

            }
            
        }
        return false;
    }
}
