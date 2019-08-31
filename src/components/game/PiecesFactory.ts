import Pieces from "./Pieces";

import { Pawn } from "./pieces/Pawn";
import { Knight } from "./pieces/Knight";
import { Bishop } from "./pieces/Bishop";
import { Rook } from "./pieces/Rook";
import { Queen } from "./pieces/Queen";
import { King } from "./pieces/King";

export interface IPieces {
    getColour(): string;
    getImage(): string;
    getMoveDirections(): Map<string, number>;
    getPosition(): string;
    getMoveNumber(): number;
    setImage(arg0: string): void;
    setMoveDirections(arg0: Map<string, number>): void;
    setPosition(arg0: string): void;
    incrementMoveNumber(arg0: number): void;

    colour: string;
    image: string;
    position: string;
    moves: number;
    moveDirections: Map<string, number>;
}

export class PiecesFactory extends Pieces { 

    typeOfPiece(piece: string): IPieces {
        switch(piece) {
            case 'P':
                const whitePawn = this.getChessPieceImgs().get(piece)
                if (whitePawn) { return new Pawn(piece, whitePawn) }
                else { throw new Error ('Image not defined'); }
            case 'N':
                const whiteKnight = this.getChessPieceImgs().get(piece)
                if (whiteKnight) { return new Knight(piece, whiteKnight) } 
                else { throw new Error ('Image not defined'); }
            case 'B':
                const whiteBishop = this.getChessPieceImgs().get(piece)
                if (whiteBishop) { return new Bishop(piece, whiteBishop) } 
                else { throw new Error ('Image not defined'); }
            case 'R':
                const whiteRook = this.getChessPieceImgs().get(piece)
                if (whiteRook) { return new Rook(piece, whiteRook) } 
                else { throw new Error ('Image not defined'); }
            case 'Q':
                const whiteQueen = this.getChessPieceImgs().get(piece)
                if (whiteQueen) { return new Queen(piece, whiteQueen) } 
                else { throw new Error ('Image not defined'); }
            case 'K':
                const whiteKing = this.getChessPieceImgs().get(piece)
                if (whiteKing) { return new King(piece, whiteKing) } 
                else { throw new Error ('Image not defined'); }
            case 'p':
                const blackPawn = this.getChessPieceImgs().get(piece)
                if (blackPawn) { return new Pawn(piece, blackPawn) } 
                else { throw new Error ('Image not defined'); }
            case 'n':
                const blackKnight = this.getChessPieceImgs().get(piece)
                if (blackKnight) { return new Knight(piece, blackKnight) } 
                else { throw new Error ('Image not defined'); }
            case 'b':
                const blackBishop = this.getChessPieceImgs().get(piece)
                if (blackBishop) { return new Bishop(piece, blackBishop) } 
                else { throw new Error ('Image not defined'); }
            case 'r':
                const blackRook = this.getChessPieceImgs().get(piece)
                if (blackRook) { return new Rook(piece, blackRook) } 
                else { throw new Error ('Image not defined'); }
            case 'q':
                const blackQueen = this.getChessPieceImgs().get(piece)
                if (blackQueen) { return new Queen(piece, blackQueen) } 
                else { throw new Error ('Image not defined'); }
            case 'k':
                const blackKing = this.getChessPieceImgs().get(piece)
                if (blackKing) { return new King(piece, blackKing) } 
                else { throw new Error ('Image not defined'); }
            default:
                throw new Error('Piece does not exist');
        }
    }
}
