import React from 'react';
import styled from 'styled-components';

import { Game } from './Game';
import { Board } from './Board';
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
    private canvas = React.createRef<HTMLCanvasElement>();
    private width = (boardSize() ? window.innerWidth: window.innerHeight) / 2.5
    private height = this.width;
    private ratio = this.width / this.height
    
    private game: Game;
    private chessBoard: Board;
    
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
        this.chessBoard = new Board(this.game.getSquaresArray(), this.game.getPiecesArray());
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
        const files = this.chessBoard.getFiles();
        const ranks = this.chessBoard.getRanks();
        let squaresArray = this.game.getSquaresArray()
        for (let i = 0; i < files.length; i++) {
            for (let j = 0; j < ranks.length; j++) {
                squaresArray[i + j * 8] = new Square(files[i] + ranks[j], i * cw, j * cw, cw, ch, '0')
            }
        }
        this.chessBoard.setSquares(squaresArray)
    }

    drawBoard() {
        const ctx = this.state.canvas.current.getContext('2d');
        ctx.fillStyle = '#FFF';
        ctx.fillRect(0, 0, this.state.screen.width, this.state.screen.height);
        let rank = 0;

            for (let i = 0; i < this.game.getSquaresArray().length; i++) {
                const x = this.chessBoard.getSquares()[i].getX();
                const y = this.chessBoard.getSquares()[i].getY();
                const w = this.chessBoard.getSquares()[i].getWidth();
                const h = this.chessBoard.getSquares()[i].getHeight();

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
            this.chessBoard.getSquares()[i].setColour('#f2f2f2');
        } else {
            ctx.strokeStyle = '#f2f2f2';
            ctx.fillStyle = '#1a1a1a';
            this.chessBoard.getSquares()[i].setColour('#1a1a1a');
        }
    }

    drawPieces() {
        const startingFen = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';
        const squaresArray = this.chessBoard.getSquares();
        const piecesArray = this.chessBoard.fenParser(startingFen);
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

    drawImg(img: any, file: number, rank: number) {
        const ctx = this.state.canvas.current.getContext('2d');
        const {cw, ch} = this.getCellDimensions();
        if (!img.complete) {
            console.debug("Image " + img.id + " on rank " + rank + " and file " + file + " has failed to load")
            setTimeout(() => { this.drawImg(img, file, rank) }, 50);
        }
        console.debug("Image " + img.id + " on rank " + rank + " and file " + file + " has loaded successfully")
        ctx.drawImage(img, (cw * rank) + cw * 0.1, (ch * file) + ch * 0.1, cw * 0.8, ch * 0.8)
    }

    handleClick(event: any) {
        const cx = event.offsetX;
        const cy = event.offsetY;
        const squares = this.chessBoard.getSquares();
        const pieces = new Pieces();
        const chessPieces = pieces.getChessPieces();
        const files = this.chessBoard.getFiles();
        const ranks = this.chessBoard.getRanks();

        for (let i = 0; i < squares.length; i++) {
            const sx = squares[i].getX();
            const sy = squares[i].getY();
            const sw = squares[i].getWidth();
            const sh = squares[i].getHeight();

            if (cx >= sx && cx <= sx + sw && cy >= sy && cy <= sy + sh) {
                const pos = squares[i].getPosition();
                const pieceId = squares[i].getPiece();
                const piece = chessPieces.get(pieceId);
                const img = new Image();
                img.src = piece;
                img.id = pieceId;

                if (squares[i].getPiece() !== '0') {
                    if (this.game.getSquareActive() === true) {
                        if (this.chessBoard.getActiveSquare() === pos) {
                            this.selectCell(sx, sy, sw, sh, true);
                            this.drawImg(img, ranks.indexOf(Number(pos[1])), files.indexOf(pos[0]));
                        }
                    } else {
                        this.selectCell(sx, sy, sw, sh, false);
                        this.game.setSquareActive(true);
                        this.chessBoard.setActiveSquare(pos);
                        this.chessBoard.setActiveSquareColour(squares[i].getColour());
                        this.drawImg(img, ranks.indexOf(Number(pos[1])), files.indexOf(pos[0]));
                    }

                }
            }
        }
        // calculations may change depending on how the component is structured in the DOM
        console.debug("event.pageX, event.pageY: ", + event.pageX, + " " + event.pageY)
        console.debug("event.offsetX, event.offsetY: ", + event.offsetX, + " " + event.offsetY)
        console.debug("canvas.offsetLeft, canvas.offsetY: ", + this.state.canvas.current.offsetLeft, + " " + this.state.canvas.current.offsetTop)
    }

    selectCell(sx: number, sy: number, sw: number, sh: number, selfClicked: boolean) {
        const ctx = this.state.canvas.current.getContext('2d');
        if (selfClicked === false) {
            ctx.strokeStyle = '#1a1a1a';
            ctx.fillStyle = '#236AFF';
        } else {
            ctx.strokeStyle = '#1a1a1a';
            ctx.fillStyle = this.chessBoard.getActiveSquareColour();
            this.game.setSquareActive(false);
        }
        
        ctx.strokeRect(sx, sy, sw, sh);
        ctx.fillRect(sx, sy, sw, sh);
    }

    drawPiece() {
        
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
