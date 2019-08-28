import React from 'react';
import styled from 'styled-components';

import { Game } from './Game';
import { Square } from './Square';
import { Pieces } from './Pieces';

const Styles = styled.div`
    canvas {
        display: block;
        border: 1px solid #000;
        margin-left: auto;
        margin-right: auto;
    }
`;

interface ICanvas {
    canvas: HTMLCanvasElement,
    screen: {
        width: number,
        height: number,
        ratio: number
    },
}

interface IState {
    canvas: any,
    screen: any
}

const boardSize = () => { return ( (window.innerWidth > window.innerHeight) ); }

class Canvas extends React.Component<ICanvas, IState> {
    private game: Game;
    private canvas = React.createRef<HTMLCanvasElement>();
    private width = (boardSize() ? window.innerWidth: window.innerHeight) / 2.5
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
        this.game = new Game()
    }

    componentWillMount() {  }

    componentDidMount() { 
        window.addEventListener('resize', this.resizeCallback, false);
        this.update();
        this.state.canvas.current.addEventListener("click", (event: EventTarget) => { this.handleClick(event) }, false);
    }

    componentWillReceiveProps(nextProps: any) {  }

    shouldComponentUpdate(nextProps: any, nextState: any) { return true; }

    componentWillUpdate(nextProps: any, nextState:any) {  }
    
    componentDidUpdate(prevProps: any, prevState: any) {  }

    componentWillUnmount() { 
        window.removeEventListener('resize', this.resizeCallback, false);
        this.state.canvas.current.removeEventListener("click", (event: EventTarget) => { this.handleClick(event) }, false);
    }

    resizeCallback = () => setTimeout(this.update, 500)

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
        this.init();
        this.drawBoard();
        this.drawPieces();
    }

    init() {
        const {cw, ch} = this.getCellDimensions()
        const files = this.game.getChessboard().getFiles();
        const ranks = this.game.getChessboard().getRanks();
        let squaresArray = this.game.getSquaresArray()
        for (let i = 0; i < files.length; i++) {
            for (let j = 0; j < ranks.length; j++) {
                squaresArray[i + j * 8] = new Square(files[i] + ranks[j], i * cw, j * cw, cw, ch, '0')
            }
        }
        this.game.getChessboard().setSquaresArray(squaresArray)
    }

    drawBoard() {
        const ctx = this.state.canvas.current.getContext('2d');
        ctx.fillStyle = '#FFF';
        ctx.fillRect(0, 0, this.state.screen.width, this.state.screen.height);
        let rank = 0;

            for (let i = 0; i < this.game.getSquaresArray().length; i++) {
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
        const startingFen = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';
        const squaresArray = this.game.getChessboard().getSquaresArray();
        const piecesArray = this.game.fenParser(startingFen);
        const pieces = new Pieces();
        const chessPieces = pieces.getChessPieces()
        let rank = 0;
        let file = 0;

        for (let i = 0; i < piecesArray.length; i++) {
            if (i % 8 === 0 && i !== 0) {
                rank++;
                file = 0;
            }
            if (i % 8 !== 0) {
                file++;
            }
            if (chessPieces.has(piecesArray[i])) {
                squaresArray[i].setPiece(piecesArray[i]);

                const img = new Image();
                img.src = chessPieces.get(piecesArray[i]);
                img.id = piecesArray[i];

                this.drawImg(img, rank, file)
            }
        }
    }

    drawImg(img: HTMLImageElement, file: number, rank: number) {
        const ctx = this.state.canvas.current.getContext('2d');
        const {cw, ch} = this.getCellDimensions();
        if (!img.complete) {
            console.debug("Image " + img.id + " on rank " + rank + " and file " + file + " has failed to load")
            setTimeout(() => { this.drawImg(img, file, rank) }, 50);
        }
        console.debug("Image " + img.id + " on rank " + rank + " and file " + file + " has loaded successfully")
        if (img.id === 'P' || img.id == 'p') {
            ctx.drawImage(img, (cw * rank) + cw * 0.2, (ch * file) + ch * 0.1, cw * 0.6, ch * 0.8)
        } else {
            ctx.drawImage(img, (cw * rank) + cw * 0.1, (ch * file) + ch * 0.1, cw * 0.8, ch * 0.8)
        }
    }

    handleClick(event: any) {
        const cx = event.offsetX;
        const cy = event.offsetY;
        const squares = this.game.getChessboard().getSquaresArray();
        const emptySquare = new Square('0', 0, 0, 0, 0);
        const pieces = new Pieces();
        const chessPieces = pieces.getChessPieces();
        const files = this.game.getChessboard().getFiles();
        const ranks = this.game.getChessboard().getRanks();

        for (let i = 0; i < squares.length; i++) {
            const sx = squares[i].getX();
            const sy = squares[i].getY();
            const sw = squares[i].getWidth();
            const sh = squares[i].getHeight();

            if (cx >= sx && cx <= sx + sw && cy >= sy && cy <= sy + sh) {
                const pieceId = squares[i].getPiece();
                const piece = chessPieces.get(pieceId);
                const img = new Image();
                img.src = piece;
                img.id = pieceId;

                if (this.game.getSquareActive()) {
                    if (this.game.getChessboard().getActiveSquare() === squares[i]) {
                        const activeImgPos = squares[i].getPosition();
                        const activeImg = this.game.getChessboard().getActivePiece();
                        
                        this.game.getChessboard().setActiveSquare(emptySquare);
                        this.game.setSquareActive(false);

                        this.selectCell(sx, sy, sw, sh, squares[i]);
                        this.drawImg(activeImg, ranks.indexOf(Number(activeImgPos[1])), files.indexOf(activeImgPos[0]));
                    }
                    
                    else if (this.game.getChessboard().getActiveSquare() !== squares[i]) {
                        const activeImgPos = squares[i].getPosition();
                        const activeImg = this.game.getChessboard().getActivePiece();
                        const activeSquare = this.game.getChessboard().getActiveSquare();
                        const activeSquareIndex = this.game.getChessboard().getActiveSquareIndex();

                        this.game.setSquareActive(false);
                        this.selectCell(activeSquare.getX(), activeSquare.getY(), activeSquare.getWidth(), activeSquare.getHeight(), activeSquare);
                        this.selectCell(sx, sy, sw, sh, squares[i]);
                        this.drawImg(activeImg, ranks.indexOf(Number(activeImgPos[1])), files.indexOf(activeImgPos[0]));

                        squares[activeSquareIndex].setPiece('0');
                        squares[i].setPiece(activeImg.id);
                    }
                }

                else {
                    if (squares[i].getPiece() !== '0') {
                        const activeImagePos = squares[i].getPosition();

                        this.game.setSquareActive(true);
                        this.game.getChessboard().setActiveSquare(squares[i]);
                        this.game.getChessboard().setActiveSquareIndex(i);
                        this.game.getChessboard().setActivePiece(img);
    
                        this.selectCell(sx, sy, sw, sh, squares[i]);
                        this.drawImg(img, ranks.indexOf(Number(activeImagePos[1])), files.indexOf(activeImagePos[0]));
                    }
                }
            }
        }
        // calculations may change depending on how the component is structured in the DOM
        console.debug("event.pageX, event.pageY: ", + event.pageX, + " " + event.pageY);
        console.debug("event.offsetX, event.offsetY: ", + event.offsetX, + " " + event.offsetY);
        console.debug("canvas.offsetLeft, canvas.offsetY: ", + this.state.canvas.current.offsetLeft, + " " + this.state.canvas.current.offsetTop);
    }

    selectCell(sx: number, sy: number, sw: number, sh: number, sq: Square) {
        const ctx = this.state.canvas.current.getContext('2d');
        if (this.game.getSquareActive()) {
            ctx.strokeStyle = '#1a1a1a';
            ctx.fillStyle = '#6F9EFF';
        } else {
            ctx.strokeStyle = '#1a1a1a';
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

    render() {
        return (
            <Styles>
                <canvas ref={this.state.canvas}
                    width={ this.state.screen.width * this.state.screen.ratio }
                    height={ this.state.screen.height * this.state.screen.ratio }
                />
            </Styles>
        );
    }
}

export default Canvas;
