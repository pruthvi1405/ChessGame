import "./ChessBoard.scss";
import Tile from "../Tile/Tile";

function ChessBoard() {
  const cols = [0, 1, 2, 3, 4, 5, 6, 7];
  const rows = [0, 1, 2, 3, 4, 5, 6, 7];
  let squares = [];

  interface Piece {
    image: string;
    x: number;
    y: number;
  }

  const pieces: Piece[] = [];

  for (let i = 0; i < 8; i++) {
    pieces.push({ image: "images/white-pawn.svg", x: i, y: 1 });
    pieces.push({ image: "images/black-pawn.svg", x: i, y: 6 });
  }

  for (let i = 0; i < 2; i++) {
    let type = i === 0 ? "white" : "black";
    let y = i === 0 ? 0 : 7;

    pieces.push({ image: `images/${type}-rook.svg`, x: 0, y });
    pieces.push({ image: `images/${type}-rook.svg`, x: 7, y });

    pieces.push({ image: `images/${type}-horse.svg`, x: 1, y });
    pieces.push({ image: `images/${type}-horse.svg`, x: 6, y });

    pieces.push({ image: `images/${type}-cam.svg`, x: 2, y });
    pieces.push({ image: `images/${type}-cam.svg`, x: 5, y });

    pieces.push({ image: `images/${type}-queen.svg`, x: 3, y });
    pieces.push({ image: `images/${type}-king.svg`, x: 4, y });
  }

  let activePiece:HTMLElement|null=null
  function grabPiece(e: React.MouseEvent<HTMLDivElement>) {
    const element=e.target as HTMLElement;
    if(element.classList.contains("img")){
      const x=e.clientX-50;
      const y=e.clientY-50;
      element.style.position="absolute";
      element.style.left=`${x}px`;
      element.style.top=`${y}px`;

      activePiece=element
      
    }
  }

  const movePiece=(e)=>{
    if(activePiece){
      const x=e.clientX-50;
      const y=e.clientY-50;
      activePiece.style.position="absolute";
      activePiece.style.left=`${x}px`;
      activePiece.style.top=`${y}px`;
    }
    }

  const dropPiece=(e)=>{
    if(activePiece){
      activePiece=null
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
      <div className="board" onMouseMove={(e)=>movePiece(e)} onMouseDown={(e) => grabPiece(e)}  onMouseUp={(e)=>dropPiece(e)}>{squares}</div>
    </div>
  );
}

export default ChessBoard;
