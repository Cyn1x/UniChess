

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

export const bP = blackPawn;
export const bN = blackKnight;
export const bB = blackBishop;
export const bR = blackRook;
export const bQ = blackQueen;
export const bK = blackKing;

export const wP = whitePawn;
export const wN = whiteKnight;
export const wB = whiteBishop;
export const wR = whiteRook;
export const wQ = whiteQueen;
export const wK = whiteKing;

export class Pieces {
    private piecesMap: Map<string, any>;

    constructor() {
        this.piecesMap = new Map();
        this.setChessPieces();
    }

    setChessPieces() {
        this.piecesMap.set('p', bP);
        this.piecesMap.set('n', bN);
        this.piecesMap.set('b', bB);
        this.piecesMap.set('r', bR);
        this.piecesMap.set('q', bQ);
        this.piecesMap.set('k', bK);
        this.piecesMap.set('P', wP);
        this.piecesMap.set('N', wN);
        this.piecesMap.set('B', wB);
        this.piecesMap.set('R', wR);
        this.piecesMap.set('Q', wQ);
        this.piecesMap.set('K', wK);
    }

    getChessPieces() { return this.piecesMap; }
}

export default Pieces;
