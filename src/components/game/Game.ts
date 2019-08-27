import { Square } from "./Square";

const numSquares = 64;
const numRefs = 120;
const numPieces = 64;

export class Game {
    private squaresArray: Array<Square>;
    private referenceArray: Array<number>;
    private piecesArray: Array<number>;

    constructor() {
        this.squaresArray = new Array(numSquares);
        this.referenceArray = new Array(numRefs);
        this.piecesArray = new Array(numPieces);
    }

    resetBoard() {
        this.squaresArray = new Array(numSquares);
        this.referenceArray = new Array(numRefs);
        this.piecesArray = new Array(numPieces); 
    }

    getSquaresArray() { return this.squaresArray; }

    getReferenceArray() { return this.referenceArray; }

    getPiecesArray() { return this.piecesArray; }

}
