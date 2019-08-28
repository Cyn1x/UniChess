import { Square } from "./Square";

const files = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
const ranks = [8, 7, 6, 5, 4, 3, 2, 1]

export class Board {
    private squares: Array<Square>
    private pieces: Array<any>
    private activeSquare: any;
    private activeSquareIndex: any;
    private activePiece: any;

    constructor(squares: Array<Square>, pieces: Array<any>) {
        this.squares = squares
        this.pieces = pieces
    }

    fenParser(fen: string) {
        const fenString = fen.split(" ");
        const positions = fenString[0].split("/");

        let currentSquare = 0;
        positions.forEach( rank => {
            rank.split("").forEach( char => {
                if (!Number(char)) {
                    this.pieces[currentSquare] = char;
                    currentSquare++;
                }
                else {
                    currentSquare += Number(char);
                }
            })
        })
        console.log(this.pieces)

        return this.pieces
    }

    getFiles() { return files; }

    getRanks() { return ranks; }

    getSquares() { return this.squares }

    getActiveSquare() { return this.activeSquare; }

    getActiveSquareIndex() { return this.activeSquareIndex; }

    getActivePiece() { return this.activePiece; }

    setSquares(squares: Array<Square>) { this.squares = squares }

    setActiveSquare(squarePos: Square) { this.activeSquare = squarePos; }

    setActiveSquareIndex(index: number) { this.activeSquareIndex = this.activeSquareIndex = index; }

    setActivePiece(piece: any) { this.activePiece = piece; }
}
