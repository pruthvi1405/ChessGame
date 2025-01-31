import "./ChessBoard.scss";
import Tile from "../Tile/Tile";

function ChessBoard() {
  // Properly define column (X) and row (Y) indexing
  const cols = [0, 1, 2, 3, 4, 5, 6, 7]; // X-coordinates
  const rows = [0, 1, 2, 3, 4, 5, 6, 7]; // Y-coordinates (bottom to top)
  let squares = [];

  interface Piece {
    image: string;
    x: number; // Column index (0-7)
    y: number; // Row index (0-7)
  }

  // Store pieces in an array
  const pieces: Piece[] = [];

  // Black Pawns at row 1 (y=1)
  for (let i = 0; i < 8; i++) {
    pieces.push({ image: "images/black-pawn.svg", x: i, y: 1 });
  }

  // White Pawns at row 6 (y=6)
  for (let i = 0; i < 8; i++) {
    pieces.push({ image: "images/white-pawn.svg", x: i, y: 6 });
  }

  // White Rooks at (0,7) and (7,7)
  pieces.push({ image: "images/white-rook.svg", x: 0, y: 7 });
  pieces.push({ image: "images/white-rook.svg", x: 7, y: 7 });

  pieces.push({ image: "images/black-rook.svg", x: 0, y: 0 });
  pieces.push({ image: "images/black-rook.svg", x: 7, y: 0 });

  pieces.push({image:"images/white-king.svg",x:3,y:7})
  pieces.push({image:"images/black-king.svg",x:4,y:0})

  pieces.push({image:"images/white-queen.svg",x:4,y:7})
  pieces.push({image:"images/black-queen.svg",x:3,y:0})

  pieces.push({image:"images/black-cam.svg",x:5,y:0})
  pieces.push({image:"images/black-cam.svg",x:2,y:0})

  pieces.push({image:"images/white-cam.svg",x:5,y:7})
  pieces.push({image:"images/white-cam.svg",x:2,y:7})

  pieces.push({image:"images/black-horse.svg",x:6,y:0})
  pieces.push({image:"images/black-horse.svg",x:1,y:0})

  pieces.push({image:"images/white-horse.svg",x:6,y:7})
  pieces.push({image:"images/white-horse.svg",x:1,y:7})

  // Loop through board positions
  for (let y = 7; y >= 0; y--) { // Iterate from row 7 (top) to row 0 (bottom)
    for (let x = 0; x < 8; x++) { // Iterate from column 0 to column 7

      // Find the piece at this (x,y) coordinate
      let image: string | undefined = undefined;
      for (const p of pieces) { 
        if (p.x === x && p.y === y) {  
          image = p.image;
          break; // Stop searching once we find the piece
        }
      }

      squares.push(
        <Tile key={`${x}-${y}`} number={x + y} image={image} />
      );
    }
  }

  return (
    <div className="p-5 board-div">
      <div className="board">
        {squares}
      </div>
    </div>
  );
}

export default ChessBoard;
