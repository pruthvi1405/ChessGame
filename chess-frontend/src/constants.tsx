export enum PieceType{
  PAWN,
  KNIGHT,
  ROOK,
  BISHOP,
  KING,
  QUEEN
}
export enum TeamType{
  OPPONENT,
  OUR
}

export interface Position{
    x:number;
    y:number
}


export interface Piece {
  image: string;
  position:Position
  type:PieceType;
  team:TeamType;
  enPassant?:boolean
}

export function samePosition(p1:Position,p2:Position){
    return p1.x==p2.x && p1.y==p2.y
}

export const COLS = [0, 1, 2, 3, 4, 5, 6, 7];
export const ROWS = [0, 1, 2, 3, 4, 5, 6, 7];

export const initialBoardState:Piece[]=
    [
        { position: { x: 0, y: 7 }, type: PieceType.ROOK, team: TeamType.OPPONENT, image: "images/black-rook.svg" },
        { position: { x: 1, y: 7 }, type: PieceType.KNIGHT, team: TeamType.OPPONENT, image: "images/black-horse.svg" },
        { position: { x: 2, y: 7 }, type: PieceType.BISHOP, team: TeamType.OPPONENT, image: "images/black-cam.svg" },
        { position: { x: 3, y: 7 }, type: PieceType.QUEEN, team: TeamType.OPPONENT, image: "images/black-queen.svg" },
        { position: { x: 4, y: 7 }, type: PieceType.KING, team: TeamType.OPPONENT, image: "images/black-king.svg" },
        { position: { x: 5, y: 7 }, type: PieceType.BISHOP, team: TeamType.OPPONENT, image: "images/black-cam.svg" },
        { position: { x: 6, y: 7 }, type: PieceType.KNIGHT, team: TeamType.OPPONENT, image: "images/black-horse.svg" },
        { position: { x: 7, y: 7 }, type: PieceType.ROOK, team: TeamType.OPPONENT, image: "images/black-rook.svg" },
        
        { position: { x: 0, y: 6 }, type: PieceType.PAWN, team: TeamType.OPPONENT, image: "images/black-pawn.svg" },
        { position: { x: 1, y: 6 }, type: PieceType.PAWN, team: TeamType.OPPONENT, image: "images/black-pawn.svg" },
        { position: { x: 2, y: 6 }, type: PieceType.PAWN, team: TeamType.OPPONENT, image: "images/black-pawn.svg" },
        { position: { x: 3, y: 6 }, type: PieceType.PAWN, team: TeamType.OPPONENT, image: "images/black-pawn.svg" },
        { position: { x: 4, y: 6 }, type: PieceType.PAWN, team: TeamType.OPPONENT, image: "images/black-pawn.svg" },
        { position: { x: 5, y: 6 }, type: PieceType.PAWN, team: TeamType.OPPONENT, image: "images/black-pawn.svg" },
        { position: { x: 6, y: 6 }, type: PieceType.PAWN, team: TeamType.OPPONENT, image: "images/black-pawn.svg" },
        { position: { x: 7, y: 6 }, type: PieceType.PAWN, team: TeamType.OPPONENT, image: "images/black-pawn.svg" },
      
        { position: { x: 0, y: 0 }, type: PieceType.ROOK, team: TeamType.OUR, image: "images/white-rook.svg" },
        { position: { x: 1, y: 0 }, type: PieceType.KNIGHT, team: TeamType.OUR, image: "images/white-horse.svg" },
        { position: { x: 2, y: 0 }, type: PieceType.BISHOP, team: TeamType.OUR, image: "images/white-cam.svg" },
        { position: { x: 3, y: 0 }, type: PieceType.QUEEN, team: TeamType.OUR, image: "images/white-queen.svg" },
        { position: { x: 4, y: 0 }, type: PieceType.KING, team: TeamType.OUR, image: "images/white-king.svg" },
        { position: { x: 5, y: 0 }, type: PieceType.BISHOP, team: TeamType.OUR, image: "images/white-cam.svg" },
        { position: { x: 6, y: 0 }, type: PieceType.KNIGHT, team: TeamType.OUR, image: "images/white-horse.svg" },
        { position: { x: 7, y: 0 }, type: PieceType.ROOK, team: TeamType.OUR, image: "images/white-rook.svg" },
        
        { position: { x: 0, y: 1 }, type: PieceType.PAWN, team: TeamType.OUR, image: "images/white-pawn.svg" },
        { position: { x: 1, y: 1 }, type: PieceType.PAWN, team: TeamType.OUR, image: "images/white-pawn.svg" },
        { position: { x: 2, y: 1 }, type: PieceType.PAWN, team: TeamType.OUR, image: "images/white-pawn.svg" },
        { position: { x: 3, y: 1 }, type: PieceType.PAWN, team: TeamType.OUR, image: "images/white-pawn.svg" },
        { position: { x: 4, y: 1 }, type: PieceType.PAWN, team: TeamType.OUR, image: "images/white-pawn.svg" },
        { position: { x: 5, y: 1 }, type: PieceType.PAWN, team: TeamType.OUR, image: "images/white-pawn.svg" },
        { position: { x: 6, y: 1 }, type: PieceType.PAWN, team: TeamType.OUR, image: "images/white-pawn.svg" },
        { position: { x: 7, y: 1 }, type: PieceType.PAWN, team: TeamType.OUR, image: "images/white-pawn.svg" }
      ]
    
      