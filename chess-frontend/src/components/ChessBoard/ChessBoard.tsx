import "./ChessBoard.scss";
import React, { useRef, useState, useEffect } from "react";
import Tile from "../Tile/Tile";
import Refree from "../../refree/Refree";
import {
  PieceType,
  TeamType,
  Piece,
  initialBoardState,
  COLS,
  ROWS,
  Position,
  samePosition,
} from "../../constants";

function ChessBoard() {
  const chessboardRef = useRef<HTMLDivElement>(null);
  const refree = new Refree();

  const [pieces, setPieces] = useState<Piece[]>(initialBoardState);
  const [grabPosition, setGrabPosition] = useState<Position>({ x: -1, y: -1 });
  const [activePiece, setActivePiece] = useState<HTMLElement | null>(null);
  const [isPromotionModalVisible, setIsPromotionModalVisible] = useState(false);
  const [promotionPiece, setPromotionPiece] = useState<Piece | null>(null);
  const [promotionPosition, setPromotionPosition] = useState<Position | null>(null);
  const [promotionTeam, setPromotionTeam] = useState<TeamType | null>(null);
  const [prevPosition,setPrevPosition]=useState<Position|null>(null);

  function getPieceImage(type: PieceType, team: TeamType): string {
    const teamPrefix = team === TeamType.OUR ? "white" : "black";
    switch (type) {
      case PieceType.PAWN: return `/images/${teamPrefix}-pawn.svg`;
      case PieceType.ROOK: return `/images/${teamPrefix}-rook.svg`;
      case PieceType.KNIGHT: return `/images/${teamPrefix}-horse.svg`;
      case PieceType.BISHOP: return `/images/${teamPrefix}-cam.svg`;
      case PieceType.QUEEN: return `/images/${teamPrefix}-queen.svg`;
      case PieceType.KING: return `/images/${teamPrefix}-king.svg`;
      default: return "";
    }
  }
  function grabPiece(e: React.MouseEvent<HTMLDivElement>) {
    const chessboard = chessboardRef.current;
    const element = e.target as HTMLElement;
  
    if (element.classList.contains("img") && chessboard) {
      // Original calculations
      let rawX = Math.floor((e.clientX - chessboard.offsetLeft) / 100);
      let rawY = Math.abs(
        Math.ceil((e.clientY - chessboard.offsetTop - 800) / 100)
      );
  
      // **Clamp** values to [0..7] so it never goes off-board.
      const x = Math.max(0, Math.min(7, rawX));
      const y = Math.max(0, Math.min(7, rawY));
  
      setGrabPosition({ x, y });
  
      // Move the piece visually in the DOM
      const offsetX = e.clientX - 50;
      const offsetY = e.clientY - 50;
      element.style.position = "absolute";
      element.style.left = `${offsetX}px`;
      element.style.top = `${offsetY}px`;
  
      setActivePiece(element);
    }
  }
  

  function movePiece(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
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
  }

  function dropPiece(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    const chessboard = chessboardRef.current;
    if (!activePiece || !chessboard) return;

    // Fixed targetY calculation
    const rawX = Math.floor((e.clientX - chessboard.offsetLeft) / 100);
    const rawY = 7 - Math.floor((e.clientY - chessboard.offsetTop) / 100);
      const targetX = Math.max(0, Math.min(7, rawX));
      const targetY = Math.max(0, Math.min(7, rawY));

    const currentPiece = pieces.find((p) => samePosition(p.position, grabPosition));
    if (!currentPiece) {
      resetPiecePosition(activePiece);
      setActivePiece(null);
      return;
    }

    const enPassantMove = refree.isEnpassantMove(
      grabPosition,
      { x: targetX, y: targetY },
      currentPiece.type,
      currentPiece.team,
      pieces
    );

    const validMove = refree.isvalid(
      grabPosition,
      { x: targetX, y: targetY },
      currentPiece.type,
      currentPiece.team,
      pieces
    );

    if (enPassantMove) {
      setPieces((prev) => {
        const newBoard = prev.map((p) => {
          if (samePosition(p.position, grabPosition)) {
            return { ...p, position: { x: targetX, y: targetY }, enPassant: false };
          }
          return p;
        });
        return newBoard.filter(
          (p) => !(samePosition(p.position, { x: targetX, y: grabPosition.y }) && p.team !== currentPiece.team)
        );
      });
      setActivePiece(null);
      return;
    }

    if (validMove) {
      const isPromotion =
        currentPiece.type === PieceType.PAWN &&
        ((currentPiece.team === TeamType.OUR && targetY === 7) ||
         (currentPiece.team === TeamType.OPPONENT && targetY === 0)); 

      if (isPromotion) {
        setPrevPosition(grabPosition)
        setPromotionPosition({ x: targetX, y: targetY });
        setPromotionPiece(currentPiece);
        setPromotionTeam(currentPiece.team);
        setIsPromotionModalVisible(true);
        setActivePiece(null);
        return;

      } else {
        setPieces((prev) => {
          return prev
            .map((p) => {
              if (samePosition(p.position, grabPosition)) {
                const isDoubleStep = p.type === PieceType.PAWN && Math.abs(targetY - grabPosition.y) === 2;
                return { ...p, position: { x: targetX, y: targetY }, enPassant: isDoubleStep };
              }
              if (p.type === PieceType.PAWN && p.team === currentPiece.team && p.enPassant) {
                return { ...p, enPassant: false };
              }
              return p;
            })
            .filter((p) => !(samePosition(p.position, { x: targetX, y: targetY }) && p.team !== currentPiece.team));
        });
      }
    } else {
      resetPiecePosition(activePiece);
    }

    setActivePiece(null);
  }

  function resetPiecePosition(pieceElement: HTMLElement) {
    pieceElement.style.position = "relative";
    pieceElement.style.removeProperty("top");
    pieceElement.style.removeProperty("left");
  }

  function promotePawn(type: PieceType): void {
    if (!promotionPiece || !promotionPosition || !prevPosition) return;

    setPieces((prev) => {
      return prev
        .map((p) => {
          if (p.type === PieceType.PAWN && p.team === promotionPiece.team && samePosition(p.position,prevPosition)) {
            return { ...p, type,position:promotionPosition };
          }
          return p;
        })
        .filter((p) => !(samePosition(p.position,promotionPosition) && p.team !== promotionPiece.team));
    });

    setIsPromotionModalVisible(false);
    setPromotionPiece(null);
    setPrevPosition(null)
    setPromotionPosition(null);
    setPromotionTeam(null);
}



 

  // Render logic remains the same
  const squares = [];
  for (let y = COLS.length - 1; y >= 0; y--) {
    for (let x = 0; x < ROWS.length; x++) {
      const piece = pieces.find((p) => samePosition(p.position, { x, y }));
      const image = piece ? getPieceImage(piece.type, piece.team) : undefined;
      squares.push(<Tile key={`${x}-${y}`} number={x + y} image={image} />);
    }
  }

  return (
    <div className="board-div">
      {isPromotionModalVisible && (
        <div className="pawn-promotion-modal">
          {promotionTeam === TeamType.OUR && (
            <>
              <img onClick={() => promotePawn(PieceType.QUEEN)} src="/images/white-queen.svg" alt="white queen" />
              <img onClick={() => promotePawn(PieceType.ROOK)} src="/images/white-rook.svg" alt="white rook" />
              <img onClick={() => promotePawn(PieceType.BISHOP)} src="/images/white-cam.svg" alt="white bishop" />
              <img onClick={() => promotePawn(PieceType.KNIGHT)} src="/images/white-horse.svg" alt="white knight" />
            </>
          )}
          {promotionTeam === TeamType.OPPONENT && (
            <>
              <img onClick={() => promotePawn(PieceType.QUEEN)} src="/images/black-queen.svg" alt="black queen" />
              <img onClick={() => promotePawn(PieceType.ROOK)} src="/images/black-rook.svg" alt="black rook" />
              <img onClick={() => promotePawn(PieceType.BISHOP)} src="/images/black-cam.svg" alt="black bishop" />
              <img onClick={() => promotePawn(PieceType.KNIGHT)} src="/images/black-horse.svg" alt="black knight" />
            </>
          )}
        </div>

      )}

      <div
        className="board"
        ref={chessboardRef}
        onMouseDown={grabPiece}
        onMouseMove={movePiece}
        onMouseUp={dropPiece}
      >
        {squares}
      </div>
    </div>
  );
}

export default ChessBoard;