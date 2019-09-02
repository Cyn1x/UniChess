import { PiecesFactory, IPieces } from "./PiecesFactory";
import { Board } from "./Board";
import { Square } from "./Square";
import { Player } from "./Player";
import { GameState } from "./GameState";

export class Game {
    private gameState: GameState;
    private chessBoard: Board;
    private fenString!: string;
    private isSquareClicked: boolean;
    private validMoves!: Array<Square>;
    private player1!: Player;
    private player2!: Player;

    constructor() {
        this.gameState = new GameState();
        this.chessBoard = new Board();
        this.fenString = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';
        this.isSquareClicked = false;
        this.validMoves = [];
        this.player1 = new Player('White');
        this.player2 = new Player('Black');
    }

    initialise(cw: number, ch: number) {
        const files = this.chessBoard.getFiles();
        const ranks = this.chessBoard.getRanks();
        let squaresArray = this.chessBoard.getSquaresArray();
        for (let i = 0; i < files.length; i++) {
            for (let j = 0; j < ranks.length; j++) {
                squaresArray[i + j * 8] = new Square(files[i] + ranks[j], i * cw, j * cw, cw, ch);
            }
        }
        this.chessBoard.setSquaresArray(squaresArray)
    }

    setPiecePositions() {
        const piecesFactory = new PiecesFactory();
        const startingFen = this.getFenString();
        const squaresArray = this.chessBoard.getSquaresArray();
        const piecesArray = this.fenParser(startingFen);
        let currentRank = 0;
        let currentFile = 0;

        piecesArray.forEach( (pieceRequired: string, index: number) => {
            if (index % 8 === 0 && index !== 0) {
                currentRank++;
                currentFile = 0;
            }
            if (index % 8 !== 0) {
                currentFile++;
            }
            startingFen.split("").forEach( (pieceToPlace: string) => {
                if (pieceRequired === pieceToPlace) {
                    const newPiece = (piecesFactory.typeOfPiece(pieceToPlace))
                    squaresArray[index].setPiece(newPiece)
                }
            })
        })
    }

    fenParser(fen: string) {
        const fenString = fen.split(" ");
        const positions = fenString[0].split("/");
        const pieces = this.chessBoard.getPiecePositionsArray();

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

    checkValidMoves(pos: string, piece: IPieces) {
        const files = this.chessBoard.getFiles();
        const pieceMoves = piece.getMoveDirections();

        const file = files.indexOf(pos[0])
        const rank = Number(pos[1])

        let currentMove = 0;
        if (pieceMoves) {
            pieceMoves.forEach( (step: number, cardinal: string) => {
                const isKnight = (piece.getType() === 'n' || piece.getType() === 'N')
                currentMove = 1;

                if (isKnight) { 
                    this.knightSpecialCases(pos, piece);
                    return;
                }

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

    knightSpecialCases(pos: string, piece: IPieces) {
        const files = this.chessBoard.getFiles();
        const pieceMoves = piece.getMoveDirections();

        const file = files.indexOf(pos[0])
        const rank = Number(pos[1])

        if (pieceMoves) {
            pieceMoves.forEach( (step: number, cardinal: string) => {

            switch(cardinal) {
                case 'NNE':
                    if (this.checkBounds(file + 1, rank + 2, piece)) { return; }
                    break;
                case 'ENE':
                    if (this.checkBounds(file + 2, rank + 1, piece)) { return; }
                    break;
                case 'ESE':
                    if (this.checkBounds(file + 2, rank - 1, piece)) { return; }
                    break;
                case 'SSE':
                    if (this.checkBounds(file + 1, rank - 2, piece)) { return; }
                    break;
                case 'SSW':
                    if (this.checkBounds(file - 1, rank - 2, piece)) { return; }
                    break;
                case 'WSW':
                    if (this.checkBounds(file - 2, rank - 1, piece)) { return; }
                    break;
                case 'WNW':
                    if (this.checkBounds(file - 2, rank + 1, piece)) { return; }
                    break;
                case 'NWN':
                    if (this.checkBounds(file - 1, rank + 2, piece)) { return; }
                    break;
                }
            }
        )}
    }

    checkBounds(file: number, rank: number, piece: IPieces) {
        const squaresArray = this.chessBoard.getSquaresArray();
        const files = this.chessBoard.getFiles();
        
        for (let i = 0; i < squaresArray.length; i++) {
            if (squaresArray[i].getPosition() === (files[file] + rank)) {
                if (!squaresArray[i].squareContainsPiece()) {
                    console.debug(files[file] + rank + " " + squaresArray[i].getPiece() + " is empty ")
                    if (piece.getType() === 'P' || piece.getType() === 'p') {
                        if (squaresArray[i].getPosition()[0] === piece.getPosition()[0]) {
                            this.validMoves.push(squaresArray[i]);
                        }
                        return;
                    }
                    this.validMoves.push(squaresArray[i])
                    return false
                } else {
                    console.debug('piece exists at ' + files[file] + rank)
                    if (piece.getColour() === squaresArray[i].getPiece().colour) {
                        return true;
                    }
                    if (piece.getType() === 'P' || piece.getType() === 'p') {
                        if (piece.colour === squaresArray[i].getPiece().colour) {
                            return true;
                        }
                        if (piece.getPosition()[0] === squaresArray[i].getPosition()[0]) {
                            return true;
                        }
                    }
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

    incrementMoveCount(piece: IPieces) {
        const move = 1;
        piece.incrementMoveNumber(move);
    }

    getChessboard() { return this.chessBoard; }

    getSquareActive() { return this.isSquareClicked; }
 
    getFenString() { return this.fenString; }
 
    getValidMoves() { return this.validMoves; }

    setSquareActive(active: boolean) { this.isSquareClicked = active; }

    setFenString(fen: string) { this.fenString = fen; }

    setValidMoves(valid: Array<Square>) { this.validMoves = valid; }

}
