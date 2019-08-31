

import whitePawn from '../../assets/img/game/pieces/w_pawn_png_128px.png';
import whiteKnight from '../../assets/img/game/pieces/w_knight_png_128px.png';
import whiteBishop from '../../assets/img/game/pieces/w_bishop_png_128px.png';
import whiteRook from '../../assets/img/game/pieces/w_rook_png_128px.png';
import whiteQueen from '../../assets/img/game/pieces/w_queen_png_128px.png';
import whiteKing from '../../assets/img/game/pieces/w_king_png_128px.png';

import blackPawn from '../../assets/img/game/pieces/b_pawn_png_128px.png'
import blackKnight from '../../assets/img/game/pieces/b_knight_png_128px.png'
import blackBishop from '../../assets/img/game/pieces/b_bishop_png_128px.png'
import blackRook from '../../assets/img/game/pieces/b_rook_png_128px.png'
import blackQueen from '../../assets/img/game/pieces/b_queen_png_128px.png'
import blackKing from '../../assets/img/game/pieces/b_king_png_128px.png'

export const wP = whitePawn;
export const wN = whiteKnight;
export const wB = whiteBishop;
export const wR = whiteRook;
export const wQ = whiteQueen;
export const wK = whiteKing;

export const bP = blackPawn;
export const bN = blackKnight;
export const bB = blackBishop;
export const bR = blackRook;
export const bQ = blackQueen;
export const bK = blackKing;

export class Pieces {
    private pieceImages: Map<string, string>;

    constructor() {
        this.pieceImages = new Map();

        this.initialise();
    }

    initialise() {
        this.setChessPieceImgs();
    }

    setChessPieceImgs() {
        this.pieceImages
        .set('p', bP).set('n', bN).set('b', bB).set('r', bR).set('q', bQ).set('k', bK)
        .set('P', wP).set('N', wN).set('B', wB).set('R', wR).set('Q', wQ).set('K', wK);
    }

    pawnMoves() {
        const validDirections = new Map();
        validDirections.set('N', 2).set('NE', 1).set('NW', 1);
        
        return validDirections;
    }

    knightMoves() {
        const validDirections = new Map();
        validDirections.set('N', 2).set('NE', 1).set('E', 2).set('SE', 1).set('S', 2).set('SW', 1).set('W', 2).set('NW', 1);

        return validDirections;
    }

    bishopMoves() {
        const validDirections = new Map();
        validDirections.set('NE', 8).set('SE', 8).set('SW', 8).set('NW', 8);

        return validDirections;
    }

    rookMoves() {
        const validDirections = new Map();
        validDirections.set('N', 8).set('E', 8).set('S', 8).set('W', 8);

        return validDirections;
    }

    queenMoves() {
        const validDirections = new Map();
        validDirections.set('N', 8).set('NE', 8).set('E', 8).set('SE', 8).set('S', 8).set('SW', 8).set('W', 8).set('NW', 8);

        return validDirections;
    }

    kingMoves() {
        const validDirections = new Map();
        validDirections.set('N', 1).set('NE', 1).set('E', 1).set('SE', 1).set('S', 1).set('SW', 1).set('W', 1).set('NW', 1);

        return validDirections;
    }

    getChessPieceImgs() { return this.pieceImages; }

}

export default Pieces;
