import { Square } from "./Square";

const files = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
const ranks = [8, 7, 6, 5, 4, 3, 2, 1]

export class Board {
    private squares: Array<Square>
    private pieces: Array<any>
    private activeSquare!: Square;
    private activeSquareIndex!: number;
    private activePiece!: HTMLImageElement;

    constructor(squares: Array<Square>, pieces: Array<number>) {
        this.squares = squares
        this.pieces = pieces
    }

    getFiles() { return files; }

    getRanks() { return ranks; }

    getSquaresArray() { return this.squares; }

    getPiecesArray() { return this.pieces; }

    getActiveSquare() { return this.activeSquare; }

    getActiveSquareIndex() { return this.activeSquareIndex; }

    getActivePiece() { return this.activePiece; }

    setSquaresArray(squares: Array<Square>) { this.squares = squares }

    setPiecesArray(pieces: Array<number>) { this.pieces = pieces; }

    setActiveSquare(squarePos: Square) { this.activeSquare = squarePos; }

    setActiveSquareIndex(index: number) { this.activeSquareIndex = this.activeSquareIndex = index; }

    setActivePiece(piece: HTMLImageElement) { this.activePiece = piece; }

}
