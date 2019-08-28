import { Board } from "./Board";
import { Square } from "./Square";

const numSquares = 64;
const numRefs = 120;
const numPieces = 64;

export class Game {
    private chessBoard: Board;
    private squaresArray: Array<Square>;
    private referenceArray: Array<number>;
    private piecesArray: Array<number>;
    private isSquareClicked: boolean;

    constructor() {
        this.squaresArray = new Array(numSquares);
        this.referenceArray = new Array(numRefs);
        this.piecesArray = new Array(numPieces);
        this.isSquareClicked = false;
        this.chessBoard = new Board(this.squaresArray, this.piecesArray);
    }

    resetBoard() {
        this.squaresArray = new Array(numSquares);
        this.referenceArray = new Array(numRefs);
        this.piecesArray = new Array(numPieces); 
    }

    fenParser(fen: string) {
        const fenString = fen.split(" ");
        const positions = fenString[0].split("/");
        const pieces = this.chessBoard.getPieces();

        let currentSquare = 0;
        positions.forEach( rank => {
            rank.split("").forEach( char => {
                if (!Number(char)) {
                    pieces[currentSquare] = char;
                    currentSquare++;
                }
                else {
                    currentSquare += Number(char);
                }
            })
        })
        console.log(pieces)

        return pieces
    }

    setSquareActive(active: boolean) { this.isSquareClicked = active; }

    getChessboard() { return this.chessBoard; }

    getSquareActive() { return this.isSquareClicked; }

    getSquaresArray() { return this.squaresArray; }

    getReferenceArray() { return this.referenceArray; }

    getPiecesArray() { return this.piecesArray; }

}
