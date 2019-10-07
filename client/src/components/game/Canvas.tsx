import React from 'react';
import { connect } from "react-redux";
import { Dispatch, Action } from 'redux';
import { AppState } from '../utilities/store';
import { ActivityState } from '../utilities/store/system/types';
import { GameState } from '../utilities/store/game/types';
import { updateActivityState } from '../utilities/store/system/actions';
import { sendGame } from '../utilities/store/game/actions';

import {
    ICanvasDispatchProps,
    ICanvas, IState,
    ClickedSquare
} from './types';

import { IPiece } from './pieces/types';
import Game from './Game';
import Square from './Square';
import styled from 'styled-components';

const Styles = styled.div`
    canvas {
        display: block;
        border: 1px solid #000;
        margin-left: auto;
        margin-right: auto;
    }
`;

const boardSize = () => { return ( (window.innerWidth > window.innerHeight) ); }

class Canvas extends React.Component<ICanvas, IState> {
    private game: Game;
    private canvas = React.createRef<HTMLCanvasElement>();
    private width = (boardSize() ? window.innerWidth: window.innerHeight) / 2.5;
    private height = this.width;
    private ratio = this.width / this.height
    
    constructor(props: ICanvas) {
        super(props);
        this.update = this.update.bind(this)
        this.state = {
            canvas: this.canvas,
            screen: {
                width: this.height * (this.width / this.height),
                height: this.width,
                ratio: this.ratio
            }
        };
        this.game = new Game(this.props.player);
        this.initialise();
    }

    componentDidMount() {
        window.addEventListener('resize', this.resizeCallback, false);
        this.update();
        this.state.canvas.current.addEventListener("click", (event: EventTarget) => { this.interceptClick(event) }, false);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.resizeCallback, false);
        this.state.canvas.current.removeEventListener("click", (event: EventTarget) => { this.interceptClick(event) }, false);
    }

    componentDidUpdate() {
        const squaresArray = this.game.getChessboard().getSquaresArray();

        if (this.props.game.nextPlayerTurn !== this.game.getCurrentTurn()) {
            for (let i = 0; i < squaresArray.length; i++) {
                if (squaresArray[i].getPosition() === this.props.game.movePieceFrom) {
                    this.game.getChessboard().setActiveSquare(squaresArray[i]);
                    for (let j = 0; j < squaresArray.length; j++) {
                        if (squaresArray[j].getPosition() === this.props.game.movePieceTo) {
                            this.game.setCurrentTurn(this.props.game.nextPlayerTurn);
                            this.overwriteSquare(squaresArray[j]);
                            const newFenSequence = this.game.fenCreator();
                            this.game.setFenString(newFenSequence);
                            
                        }
                    }
                }
            }
        }
    }

    resizeCallback = () => setTimeout(this.update, 500);

    update() {
        this.width = (boardSize() ? window.innerWidth: window.innerHeight) / 2.5
        this.height = this.width
        this.setState({
            canvas: this.canvas,
            screen: {
                width: this.height * (this.width / this.height),
                height: this.height,
                ratio: this.ratio
            }
        })
        const {cw, ch} = this.getCellDimensions();
        this.game.updateSquareSizeProps(cw, ch);
        this.drawBoard();
        this.drawPieces();
    }

    initialise() {
        const {cw, ch} = this.getCellDimensions();
        this.game.initialise(cw, ch);
    }

    drawBoard() {
        const ctx = this.state.canvas.current.getContext('2d');
        ctx.fillStyle = '#FFF';
        ctx.fillRect(0, 0, this.state.screen.width, this.state.screen.height);
        let rank = 0;

        for (let i = 0; i < this.game.getChessboard().getSquaresArray().length; i++) {

            const x = this.game.getChessboard().getSquaresArray()[i].getX();
            const y = this.game.getChessboard().getSquaresArray()[i].getY();
            const w = this.game.getChessboard().getSquaresArray()[i].getWidth();
            const h = this.game.getChessboard().getSquaresArray()[i].getHeight();

            if (i % 8 === 0) { rank++; }

            this.setSequareColours(i, rank, ctx)
            ctx.strokeRect(x, y, w, h)
            ctx.fillRect(x, y, w, h)
        }
    }

    setSequareColours(i: number, rank: number, ctx: any) {
        if ((i + rank) % 2 === 0) {
            ctx.strokeStyle = '#1a1a1a';
            ctx.fillStyle = '#f2f2f2';
            this.game.getChessboard().getSquaresArray()[i].setColour('#f2f2f2');
        } else {
            ctx.strokeStyle = '#f2f2f2';
            ctx.fillStyle = '#1a1a1a';
            this.game.getChessboard().getSquaresArray()[i].setColour('#1a1a1a');
        }
    }

    drawPieces() {
        const squaresArray = this.game.getChessboard().getSquaresArray();
        const files = this.game.getChessboard().getFiles();
        const ranks = this.game.getChessboard().getRanks();

        squaresArray.forEach( (square: Square, index: number) => {
            if (square.getPiece()) {
                const piece = square.getPiece()
                const position = piece.getPosition().split("")
                const img = new Image();
                img.src = piece.getImage();
                img.id = piece.getType();

                this.drawImg(img, ranks.indexOf(Number(position[1])), files.indexOf(position[0]))
            }
        })
    }

    drawImg(img: HTMLImageElement, file: number, rank: number) {
        const ctx = this.state.canvas.current.getContext('2d');
        const {cw, ch} = this.getCellDimensions();
        if (!img.complete) {
            // console.debug("Image " + img.id + " on rank " + rank + " and file " + file + " has failed to load")
            setTimeout(() => { this.drawImg(img, file, rank) }, 50);
        }
        // console.debug("Image " + img.id + " on rank " + rank + " and file " + file + " has loaded successfully")
        if (img.id === 'P' || img.id === 'p') {
            ctx.drawImage(img, (cw * rank) + cw * 0.2, (ch * file) + ch * 0.1, cw * 0.6, ch * 0.8)
        } else {
            ctx.drawImage(img, (cw * rank) + cw * 0.1, (ch * file) + ch * 0.1, cw * 0.8, ch * 0.8)
        }
    }

    interceptClick(event: any) {
        if (this.game.getCurrentTurn() === this.game.getCurrentPlayer().getColour()) {
            this.handleClick(event);
        }
    }

    handleClick(event: MouseEvent) {
        const cx = event.offsetX;
        const cy = event.offsetY;
        const squaresArray = this.game.getChessboard().getSquaresArray();

        for (let i = 0; i < squaresArray.length; i++) {
            const sx = squaresArray[i].getX();
            const sy = squaresArray[i].getY();
            const sw = squaresArray[i].getWidth();
            const sh = squaresArray[i].getHeight();
            const clickedSquare: ClickedSquare = {sx, sy, sw, sh};

            if (cx >= sx && cx <= sx + sw && cy >= sy && cy <= sy + sh) {
                if (this.game.getSquareActive()) {
                    if (this.game.getChessboard().getActiveSquare() === squaresArray[i]) {
                        this.deactivateSquare(clickedSquare, squaresArray[i]);
                    }
                    else if (this.game.getChessboard().getActiveSquare() !== squaresArray[i]) {
                        if (!this.game.checkRequestedMove(squaresArray[i])) {
                            return;
                        }
                        this.game.setSquareActive(false);
                        this.processValidMove(squaresArray[i]);
                    }
                }

                else {
                    if (squaresArray[i].squareContainsPiece()) {
                        if (squaresArray[i].getPiece().getColour() === this.game.getCurrentPlayer().getColour()) {
                            this.activateSquare(clickedSquare, squaresArray[i])
                        }
                    }
                }
            }
        }
        // calculations may change depending on how the component is structured in the DOM
        // console.debug("event.pageX, event.pageY: ", + event.pageX, + " " + event.pageY);
        // console.debug("event.offsetX, event.offsetY: ", + event.offsetX, + " " + event.offsetY);
        // console.debug("canvas.offsetLeft, canvas.offsetY: ", + this.state.canvas.current.offsetLeft, + " " + this.state.canvas.current.offsetTop);
    }

    activateSquare(clickedSquare: ClickedSquare, activeSquare: Square) {
        const files = this.game.getChessboard().getFiles();
        const ranks = this.game.getChessboard().getRanks();
        const activePiece = activeSquare.getPiece();
        const img = this.constructImage(activePiece);
        
        this.game.setSquareActive(true);
        this.game.getChessboard().setActiveSquare(activeSquare);

        this.manageValidSquares();
        this.selectCell(
            clickedSquare.sx,
            clickedSquare.sy,
            clickedSquare.sw,
            clickedSquare.sh,
            activeSquare
            );

        this.drawImg(img, ranks.indexOf(Number(activeSquare.getPosition()[1])), files.indexOf(activeSquare.getPosition()[0]));
    }

    deactivateSquare(clickedSquare: ClickedSquare, activeSquare: Square) {
        const files = this.game.getChessboard().getFiles();
        const ranks = this.game.getChessboard().getRanks();
        const emptySquare = new Square('0', 0, 0, 0, 0);
        const activePiece = activeSquare.getPiece();
        const img = this.constructImage(activePiece);
        
        this.game.getChessboard().setActiveSquare(emptySquare);
        this.game.setSquareActive(false);

        this.manageValidSquares();
        this.selectCell(
            clickedSquare.sx,
            clickedSquare.sy,
            clickedSquare.sw,
            clickedSquare.sh,
            activeSquare
            );
        this.drawImg(img, ranks.indexOf(Number(activeSquare.getPosition()[1])), files.indexOf(activeSquare.getPosition()[0]));
    }

    overwriteSquare(activeSquare: Square) {
        const files = this.game.getChessboard().getFiles();
        const ranks = this.game.getChessboard().getRanks();

        const prevActiveSquare = this.game.getChessboard().getActiveSquare();
        const activePiece = prevActiveSquare.getPiece();
        const img = this.constructImage(activePiece);

        this.selectCell(
            prevActiveSquare.getX(),
            prevActiveSquare.getY(),
            prevActiveSquare.getWidth(),
            prevActiveSquare.getHeight(), 
            prevActiveSquare
            );
        this.manageValidSquares();
        this.selectCell(
            activeSquare.getX(),
            activeSquare.getY(),
            activeSquare.getWidth(),
            activeSquare.getHeight(),
            activeSquare
            );
        
        this.drawImg(img, ranks.indexOf(Number(activeSquare.getPosition()[1])), files.indexOf(activeSquare.getPosition()[0]));

        this.game.getChessboard().getActiveSquare().removePiece();
        this.game.getChessboard().setActiveSquare(activeSquare);
        this.game.incrementMoveCount(activePiece);

        activeSquare.setPiece(activePiece);
    }

    constructImage(activeSquare: IPiece) {
        const img = new Image();
        img.src = activeSquare.getImage();
        img.id = activeSquare.getType();

        return img;
    }

    manageValidSquares() {
        const files = this.game.getChessboard().getFiles();
        const ranks = this.game.getChessboard().getRanks();

        if (this.game.getSquareActive()) {
            const activeSquare = this.game.getChessboard().getActiveSquare().getPosition();
            const activePiece = this.game.getChessboard().getActiveSquare().getPiece();

            this.game.checkValidMoves(activeSquare, activePiece)

            if (this.game.getValidMoves().length > 0) {
                const validMoves = this.game.getValidMoves()
                for (let i = 0; i < validMoves.length; i++) {
                    const sx = validMoves[i].getX();
                    const sy = validMoves[i].getY();
                    const sw = validMoves[i].getWidth();
                    const sh = validMoves[i].getHeight();

                    this.selectCell(sx, sy, sw, sh, validMoves[i]);
                    if (validMoves[i].squareContainsPiece()) {
                        const img = this.drawPiece(validMoves[i].getPiece())
                        this.drawImg(img, ranks.indexOf(Number(validMoves[i].getPosition()[1])), files.indexOf(validMoves[i].getPosition()[0]));
                    }
                }
            }
        }
        else {
            if (this.game.getValidMoves().length > 0) {
                const validMoves = this.game.getValidMoves()
                for (let i = 0; i < validMoves.length; i++) {
                    const sx = validMoves[i].getX();
                    const sy = validMoves[i].getY();
                    const sw = validMoves[i].getWidth();
                    const sh = validMoves[i].getHeight();

                    this.selectCell(sx, sy, sw, sh, validMoves[i]);

                    if (validMoves[i].squareContainsPiece()) {
                        const img = this.drawPiece(validMoves[i].getPiece())
                        this.drawImg(img, ranks.indexOf(Number(validMoves[i].getPosition()[1])), files.indexOf(validMoves[i].getPosition()[0]));
                    }
                }
            }
            this.game.setValidMoves([]);
        }
    }

    drawPiece(validMoves: IPiece) {
        const img = new Image();
        img.id = validMoves.getType();
        img.src = validMoves.getImage();

        return img;
    }

    selectCell(sx: number, sy: number, sw: number, sh: number, sq: Square) {
        const ctx = this.state.canvas.current.getContext('2d');
        if (this.game.getSquareActive()) {
            ctx.fillStyle = '#6F9EFF';
        } else {
            ctx.fillStyle = sq.getColour();
        }

        ctx.strokeRect(sx, sy, sw, sh);
        ctx.fillRect(sx, sy, sw, sh);
    }

    getCellDimensions() {
        const cw = (this.state.screen.width * this.state.screen.ratio) / 8;
        const ch = (this.state.screen.height * this.state.screen.ratio) / 8;
        return {cw, ch}
    }

    processValidMove(activeSquare: Square) {
        const prevActiveSquarePos = this.game.getChessboard().getActiveSquare().getPosition();
        const nextActiveSquarePos = activeSquare.getPosition();
        const nextPlayerMove = this.game.getNextMove();

        this.props.sendGame({
            nextPlayerTurn: nextPlayerMove,
            movePieceFrom: prevActiveSquarePos,
            movePieceTo: nextActiveSquarePos
        })
    }
    
    render() {
        return (
            <Styles>
                <canvas ref={ this.state.canvas }
                    width={ this.state.screen.width * this.state.screen.ratio }
                    height={ this.state.screen.height * this.state.screen.ratio }
                />
            </Styles>
        );
    }
}

const mapStateToProps = (state: AppState) => ({
    system: state.systemState,
    activity: state.activityState,
    lobby: state.lobbyState,
    game: state.gameState
});

const mapDispatchToProps = (dispatch: Dispatch<Action>): ICanvasDispatchProps => ({
    updateActivityState: (action: ActivityState) => dispatch(updateActivityState(action)),
    sendGame: (game: GameState) => dispatch(sendGame(game))
});

export default connect(mapStateToProps, mapDispatchToProps)(Canvas);
