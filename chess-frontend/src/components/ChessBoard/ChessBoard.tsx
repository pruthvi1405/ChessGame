import "./ChessBoard.scss";
import React, { useRef, useState } from "react";
import Tile from "../Tile/Tile";
import Refree from "../../refree/Refree";
import { PieceType, TeamType, Piece, initialBoardState, COLS, ROWS, Position,samePosition} from "../../constants";

function ChessBoard() {
  const chessboardRef = useRef<HTMLDivElement>(null);
  const refree = new Refree();

  const [pieces, setPieces] = useState(initialBoardState);
  const [grabPosition,setGrabPosition]=useState<Position>({x:-1,y:-1});
  const [activePiece, setActivePiece] = useState<HTMLElement | null>(null);

  function grabPiece(e: React.MouseEvent<HTMLDivElement>) {
    const chessboard = chessboardRef.current;
    const element = e.target as HTMLElement;

    if (element.classList.contains("img") && chessboard) {
      setGrabPosition({x:Math.floor((e.clientX - chessboard.offsetLeft) / 100),y:Math.abs(Math.ceil((e.clientY - chessboard.offsetTop - 800) / 100))});

      const x = e.clientX - 50;
      const y = e.clientY - 50;

      element.style.position = "absolute";
      element.style.left = `${x}px`;
      element.style.top = `${y}px`;

      setActivePiece(element);
    }
  }

  const movePiece = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const chessboard = chessboardRef.current;
    if (activePiece && chessboard) {
      const minX = chessboard.offsetLeft - 25;
      const minY = chessboard.offsetTop - 25;
      const maxX = minX + chessboard.clientWidth - 50;
      const maxY = minY + chessboard.clientHeight - 50;

      let x = e.clientX - 50;
      let y = e.clientY - 50;

      x = Math.max(minX, Math.min(x, maxX));
      y = Math.max(minY, Math.min(y, maxY));

      activePiece.style.left = `${x}px`;
      activePiece.style.top = `${y}px`;
    }
  };

  const dropPiece = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const chessboard = chessboardRef.current;
    if (activePiece && chessboard) {
      const targetX = Math.floor((e.clientX - chessboard.offsetLeft) / 100);
      const targetY = Math.abs(Math.ceil((e.clientY - chessboard.offsetTop - 800) / 100));

      const currentPiece = pieces.find(p =>  samePosition(p.position,grabPosition));

      if (currentPiece) {
        const enPassantMove = refree.isEnpassantMove(
          grabPosition,
          {x:targetX,y:targetY},
          currentPiece.type,
          currentPiece.team,
          pieces
        );

        const validMove = refree.isvalid(
          grabPosition,
          {x:targetX,y:targetY},
          currentPiece.type,
          currentPiece.team,
          pieces
        );

        if (enPassantMove) {
          setPieces(
            pieces
              .map(p => {
                if (samePosition(p.position,grabPosition)) {
                  return { ...p, position: { x: targetX, y: targetY }, enPassant: false };
                }
                return p;
              })
              .filter(p => !(samePosition(p.position,{x:targetX,y:grabPosition.y}) && p.team !== currentPiece.team))
          );
        } else if (validMove) {
          setPieces(
            pieces
              .map(p => {
                if (samePosition(p.position,grabPosition)) {
                  const isDoubleStep = p.type === PieceType.PAWN && Math.abs(targetY - grabPosition?.y) === 2;
                  return { ...p, position: { x: targetX, y: targetY }, enPassant: isDoubleStep };
                }
                if (p.type === PieceType.PAWN && p.team === currentPiece.team) {
                  return { ...p, enPassant: false };
                }
                return p;
              })
              .filter(p => !(samePosition(p.position,{x:targetX,y:targetY}) && p.team !== currentPiece.team))
          );
        } else {
          activePiece.style.position = "relative";
          activePiece.style.removeProperty("top");
          activePiece.style.removeProperty("left");
        }
      }
      setActivePiece(null);
    }
  };

  let squares = [];
  for (let y = COLS.length-1; y >= 0; y--) {
    for (let x = 0; x < ROWS.length; x++) {
      const piece=pieces.find(p=>samePosition(p.position,{x,y}))
      let image= piece? piece.image:undefined 
      squares.push(<Tile key={`${x}-${y}`} number={x + y} image={image} />);
    }
  }

  return (
    <div className="p-5 board-div">
      <div
        className="board"
        ref={chessboardRef}
        onMouseMove={movePiece}
        onMouseDown={grabPiece}
        onMouseUp={dropPiece}
      >
        {squares}
      </div>
    </div>
  );
}

export default ChessBoard;
