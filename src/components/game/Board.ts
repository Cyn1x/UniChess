import { Square } from "./Square";

const files = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
const ranks = [8, 7, 6, 5, 4, 3, 2, 1]

export class Board {
    private squares: Array<Square>
    private pieces: Array<any>
    private activeSquare: any;
    private activeSquareColour: any;

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

    getActiveSquareColour() { return this.activeSquareColour; }

    setSquares(squares: Array<Square>) { this.squares = squares }

    setActiveSquare(squarePos: string) { this.activeSquare = squarePos; }

    setActiveSquareColour(colour: string) { this.activeSquareColour = colour; }
}
