import { Board } from "./Board";
import { Square } from "./Square";
import { Pieces } from "./Pieces";
import { Player } from "./Player";

const numSquares = 64;
const numRefs = 120;
const numPieces = 64;

export class Game {
    private chessBoard: Board;
    private chessPieces: Pieces;
    private squaresArray: Array<Square>;
    private referenceArray: Array<number>;
    private piecesArray: Array<number>;
    private fenString!: string;
    private isSquareClicked: boolean;
    private validMoves!: Array<Square>;
    private player1!: Player;
    private player2!: Player;

    constructor() {
        this.squaresArray = new Array(numSquares);
        this.referenceArray = new Array(numRefs);
        this.piecesArray = new Array(numPieces);
        this.chessBoard = new Board(this.squaresArray, this.piecesArray);
        this.chessPieces = new Pieces();
        this.fenString = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';
        this.isSquareClicked = false;
        this.validMoves = [];
        this.player1 = new Player('White');
        this.player2 = new Player('Black');
    }

    resetBoard() {
        this.squaresArray = new Array(numSquares);
        this.referenceArray = new Array(numRefs);
        this.piecesArray = new Array(numPieces); 
    }

    fenParser(fen: string) {
        const fenString = fen.split(" ");
        const positions = fenString[0].split("/");
        const pieces = this.chessBoard.getPiecesArray();

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
        return pieces
    }

    checkValidMoves(pos: string, piece: string) {
        const files = this.chessBoard.getFiles();
        const moveDirections = this.chessPieces.getPieceMoves().get(piece);

        const file = files.indexOf(pos[0])
        const rank = Number(pos[1])

        let currentMove = 0;
        if (moveDirections) {
            moveDirections.forEach( (step, cardinal) => {
                if (piece === 'n' || piece === 'N') { currentMove = 2; }
                else { currentMove = 1; }

                while (currentMove <= step) {
                    switch(cardinal) {
                        case 'N':
                            if (this.checkBounds(file, rank + currentMove, piece)) { return; }
                            break;
                        case 'S':
                            if (this.checkBounds(file, rank - currentMove, piece)) { return; }
                            break;
                        case 'E':
                            if (this.checkBounds(file + currentMove, rank, piece)) { return; }
                            break;
                        case 'W':
                            if (this.checkBounds(file - currentMove, rank, piece)) { return; }
                            break;
                        case 'NE': 
                            if (this.checkBounds(file + currentMove, rank + currentMove, piece)) { return; }
                            break;
                        case 'SE': 
                            if (this.checkBounds(file + currentMove, rank - currentMove, piece)) { return; }
                            break;
                        case 'NW': 
                            if (this.checkBounds(file - currentMove, rank + currentMove, piece)) { return; }
                            break;
                        case 'SW':
                            if (this.checkBounds(file - currentMove, rank - currentMove, piece)) { return; }
                            break;
                    }
                    currentMove++;
                }
            })
        }
    }

    checkBounds(file: number, rank: number, piece: string) {
        const squaresArray = this.chessBoard.getSquaresArray();
        const files = this.chessBoard.getFiles();

        for (let i = 0; i < squaresArray.length; i++) {
            if (squaresArray[i].getPosition() === (files[file] + rank)) {
                if (squaresArray[i].getPiece() === '0') {
                    console.debug(files[file] + rank + " " + squaresArray[i].getPiece() + " is empty ")
                    this.validMoves.push(squaresArray[i])
                    return false
                } else {
                    if (piece === 'p' || piece === 'P') { return true }

                    console.debug('piece exists at ' + files[file] + rank)
                    this.validMoves.push(squaresArray[i])
                    return true
                }
            }
        }
    }

    checkRequestedMove(squares: Square) {
        for (let i = 0; i < this.validMoves.length; i++) {
            console.log("valid: ", this.validMoves[i].getPosition() + ", clicked: " + squares.getPosition())
            if (this.validMoves[i].getPosition() === squares.getPosition()) {
                return true;
            }
        }
        return false;
     }

    setSquareActive(active: boolean) { this.isSquareClicked = active; }

    setFenString(fen: string) { this.fenString = fen; }

    setValidMoves(valid: Array<Square>) { this.validMoves = valid; }

    getChessboard() { return this.chessBoard; }

    getSquareActive() { return this.isSquareClicked; }

    getSquaresArray() { return this.squaresArray; }

    getReferenceArray() { return this.referenceArray; }

    getPiecesArray() { return this.piecesArray; }

    getFenString() { return this.fenString; }

    getValidMoves() { return this.validMoves; }

}
