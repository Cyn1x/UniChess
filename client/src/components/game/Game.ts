import { IPiece } from './pieces/types';
import PiecesFactory from './PiecesFactory';
import Board from './Board';
import Square from './Square';
import Player from './Player';

class Game {
    private chessBoard: Board;
    private fenString!: string;
    private isSquareClicked: boolean;
    private validMoves!: Array<Square>;
    private currentPlayer!: Player;
    private currentTurn: string;
    private previousActivePiecePos!: string;
    private nextActivePiecePos!: string;

    constructor(player: string, fen: string, turn: string) {
        this.chessBoard = new Board();
        this.fenString = fen;
        this.isSquareClicked = false;
        this.validMoves = [];
        
        if (player === "Player 1") {
            this.currentPlayer = new Player('White');
        } else {
            this.currentPlayer = new Player('Black');
        }

        this.currentTurn = turn;
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
        this.chessBoard.setSquaresArray(squaresArray);
        this.setPiecePositions();
    }

    updateSquareSizeProps(cw: number, ch: number) {
        const files = this.chessBoard.getFiles();
        const ranks = this.chessBoard.getRanks();
        let squaresArray = this.chessBoard.getSquaresArray();
        for (let i = 0; i < files.length; i++) {
            for (let j = 0; j < ranks.length; j++) {
                squaresArray[i + j * 8].setX(i * cw);
                squaresArray[i + j * 8].setY(j * cw);
                squaresArray[i + j * 8].setWidth(cw);
                squaresArray[i + j * 8].setHeight(ch);
            }
        }
        this.chessBoard.setSquaresArray(squaresArray);
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
                currentRank = currentRank + 1;
                currentFile = 0;
            }
            if (index % 8 !== 0) {
                currentFile = currentFile + 1;
            }
            startingFen.split("").forEach( (pieceToPlace: string) => {
                if (pieceRequired === pieceToPlace) {
                    const newPiece = (piecesFactory.typeOfPiece(pieceToPlace));
                    squaresArray[index].setPiece(newPiece);
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

    fenCreator() {
        const board = this.getChessboard().getSquaresArray();
        let newFenString = "";
        let emptySquares = 0;
        for (let i = 0; i < board.length; i++) {
            
            if (i % 8 === 0 && i !== 0) {
                newFenString += "/"
                emptySquares = 0;
            }
            
            if (board[i].squareContainsPiece()) {
                newFenString += board[i].getPiece().getType();
                emptySquares = 0;
            } else {
                emptySquares++;
                if ((i + 1) < 63) {
                    if ((i + 1) % 8 === 0) {
                        newFenString += emptySquares;
                    }
                    else if (board[i + 1].squareContainsPiece()) {
                        newFenString += emptySquares;
                    }
                }
            }
        }
        return newFenString;
    }

    checkValidMoves(pos: string, piece: IPiece) {
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

    knightSpecialCases(pos: string, piece: IPiece) {
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

    checkBounds(file: number, rank: number, piece: IPiece) {
        const squaresArray = this.chessBoard.getSquaresArray();
        const files = this.chessBoard.getFiles();
        
        for (let i = 0; i < squaresArray.length; i++) {
            if (squaresArray[i].getPosition() === (files[file] + rank)) {
                if (!squaresArray[i].squareContainsPiece()) {
                    // console.debug(files[file] + rank + " " + squaresArray[i].getPiece() + " is empty ")
                    if (piece.getType() === 'P' || piece.getType() === 'p') {
                        if (squaresArray[i].getPosition()[0] === piece.getPosition()[0]) {
                            this.validMoves.push(squaresArray[i]);
                        }
                        return;
                    }
                    this.validMoves.push(squaresArray[i])
                    return false
                } else {
                    // console.debug('piece exists at ' + files[file] + rank)
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
            // console.debug("valid: ", this.validMoves[i].getPosition() + ", clicked: " + squares.getPosition())
            if (this.validMoves[i].getPosition() === squares.getPosition()) {
                return true;
            }
        }
        return false;
    }

    getMoveState() {
        const prevMove = this.previousActivePiecePos;
        const nextMove = this.nextActivePiecePos;

        return {prevMove, nextMove};
    }

    setMoveState(prev: string, next: string) {
        this.previousActivePiecePos = prev;
        this.nextActivePiecePos = next;
    }

    incrementMoveCount(piece: IPiece) { piece.incrementMoveNumber(1); }

    getNextMove() { return (this.getCurrentTurn() === "White" ? ("Black") : ("White")); }

    getChessboard() { return this.chessBoard; }

    getSquareActive() { return this.isSquareClicked; }
 
    getFenString() { return this.fenString; }
 
    getValidMoves() { return this.validMoves; }

    getCurrentPlayer() { return this.currentPlayer; }

    getCurrentTurn() { return this.currentTurn; }

    setChessboard(board: Board) { this.chessBoard = board; }

    setSquareActive(active: boolean) { this.isSquareClicked = active; }

    setFenString(fen: string) { this.fenString = fen; }

    setValidMoves(valid: Array<Square>) { this.validMoves = valid; }

    setCurrentTurn(player: string) { this.currentTurn = player; }

}

export default Game;
