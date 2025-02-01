import "./ChessBoard.scss";
import React, { useRef, useState} from "react";
import Tile from "../Tile/Tile";
import Refree from "../../refree/Refree"

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

function ChessBoard() {

  const chessboardRef = useRef<HTMLDivElement>(null)
  const cols = [0, 1, 2, 3, 4, 5, 6, 7];
  const rows = [0, 1, 2, 3, 4, 5, 6, 7];
  let squares = [];
  const refree=new Refree();

  interface Piece {
    image: string;
    x: number;
    y: number;
    type:PieceType
    team:TeamType
  }

 

  const initialBoardState:Piece[]=[]

  for (let i = 0; i < 8; i++) {
    initialBoardState.push({ image: "images/white-pawn.svg", x: i, y: 1,type: PieceType.PAWN ,team:TeamType.OUR});
    initialBoardState.push({ image: "images/black-pawn.svg", x: i, y: 6,type: PieceType.PAWN ,team:TeamType.OPPONENT });
  }

  for (let i = 0; i < 2; i++) {
    let team= i===0?TeamType.OPPONENT:TeamType.OUR
    let type = team=== TeamType.OUR? "white" : "black";
    let y = team=== TeamType.OUR ? 0 : 7;

    initialBoardState.push({ image: `images/${type}-rook.svg`, x: 0, y,type: PieceType.ROOK ,team});
    initialBoardState.push({ image: `images/${type}-rook.svg`, x: 7, y ,type: PieceType.ROOK ,team});

    initialBoardState.push({ image: `images/${type}-horse.svg`, x: 1, y,type: PieceType.KNIGHT ,team});
    initialBoardState.push({ image: `images/${type}-horse.svg`, x: 6, y ,type: PieceType.KNIGHT,team });

    initialBoardState.push({ image: `images/${type}-cam.svg`, x: 2, y,type: PieceType.BISHOP ,team});
    initialBoardState.push({ image: `images/${type}-cam.svg`, x: 5, y,type: PieceType.BISHOP ,team});

    initialBoardState.push({ image: `images/${type}-queen.svg`, x: 3, y,type: PieceType.QUEEN ,team});
    initialBoardState.push({ image: `images/${type}-king.svg`, x: 4, y,type: PieceType.KING,team });
  }

  const [pieces,setPieces]=useState(initialBoardState)
  const [gridX,setGridX]=useState(0);
  const [gridY,setGridY]=useState(0);
  const [activePiece,setActivePiece]=useState<HTMLElement|null>(null)

  function grabPiece(e: React.MouseEvent<HTMLDivElement>) {
    const chessboard=chessboardRef.current;
    const element=e.target as HTMLElement;
    if(element.classList.contains("img") && chessboard){
      setGridX(Math.floor((e.clientX-chessboard.offsetLeft)/100));
      setGridY(Math.abs(Math.ceil((e.clientY-chessboard.offsetTop-800)/100)));
      const x=e.clientX-50;
      const y=e.clientY-50;
      element.style.position="absolute";
      element.style.left=`${x}px`;
      element.style.top=`${y}px`;

      setActivePiece(element)
      
    }
  }

  const movePiece=(e)=>{
    const chessboard=chessboardRef.current;
    if(activePiece && chessboard){
      const minX=chessboard.offsetLeft-25;
      const minY=chessboard.offsetTop-25;
      const maxX = minX + chessboard.clientWidth -50;
      const maxY = minY + chessboard.clientHeight-50 ;
      let x=e.clientX-50;
      let y=e.clientY-50;
      activePiece.style.position="absolute";
      x = Math.max(minX, Math.min(x, maxX));
      y = Math.max(minY, Math.min(y, maxY));

      activePiece.style.left = `${x}px`;
    activePiece.style.top = `${y}px`;
      
    }
    }

  const dropPiece=(e)=>{
    const chessboard=chessboardRef.current;
    if(activePiece && chessboard){
      let x=Math.floor((e.clientX-chessboard.offsetLeft)/100)
      let y=Math.abs(Math.ceil((e.clientY-chessboard.offsetTop-800)/100))
      
      
      setPieces((value)=>{
        const piece=value.map((p)=>{
          if(p.x===gridX && p.y===gridY){
            const validMove=refree.isvalid(gridX,gridY,x,y,p.type,p.team)
              if(validMove){
                p.x=x,
                p.y=y
              }
              else{
                activePiece.style.position='relative';
                activePiece.style.removeProperty("top");
                activePiece.style.removeProperty("left");

              } 
            

              return { ...p, x:gridX, y:gridY }; 
          }
          return p;
        })
        return pieces;
      });
      setActivePiece(null);
    }
  }

  for (let y = 7; y >= 0; y--) {
    for (let x = 0; x < 8; x++) {
      let image: string | undefined = undefined;
      for (const p of pieces) {
        if (p.x === x && p.y === y) {
          image = p.image;
          break;
        }
      }

      squares.push(
        <Tile key={`${x}-${y}`} number={x + y} image={image} />
      );
    }
  }

  return (
    <div className="p-5 board-div">
      <div className="board" ref={chessboardRef} onMouseMove={(e)=>movePiece(e)} onMouseDown={(e) => grabPiece(e)}  onMouseUp={(e)=>dropPiece(e)}>{squares}</div>
    </div>
  );
}

export default ChessBoard;
