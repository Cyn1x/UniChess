import React, { EventHandler } from 'react';
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
        this.state.canvas.current.addEventListener("click", (event: any) => { this.handleClick(event) }, false);
    }

    componentWillReceiveProps(nextProps: any) {  }

    shouldComponentUpdate(nextProps: any, nextState: any) { return true; }

    componentWillUpdate(nextProps: any, nextState:any) {  }
    
    componentDidUpdate(prevProps: any, prevState: any) {  }

    componentWillUnmount() { 
        window.removeEventListener('resize', this.resizeCallback, false);
        this.state.canvas.current.removeEventListener("click", (event: any) => { this.handleClick(event) }, false);
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
    }

    init() {
        const {cw, ch} = this.getCellDimensions()
        const files = this.chessBoard.getFiles();
        let squaresArray = this.game.getSquaresArray()
        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {
                squaresArray[i + j * 8] = new Square(files[i] + (j + 1), cw, ch)
            }
        }
        this.chessBoard.setSquares(squaresArray)
        console.debug(this.game.getSquaresArray);
    }

    drawBoard() {
        const ctx = this.state.canvas.current.getContext('2d');
        ctx.fillStyle = '#FFF';
        ctx.fillRect(0, 0, this.state.screen.width, this.state.screen.height);
        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {
                const x = i * this.chessBoard.getSquares()[j].getWidth();
                const y = j * this.chessBoard.getSquares()[j].getWidth();
                const w = this.chessBoard.getSquares()[j].getWidth();
                const h = this.chessBoard.getSquares()[j].getHeight();

                this.setSequareColours(i, j, ctx)
                ctx.strokeRect(x, y, w, h)
                ctx.fillRect(x, y, w, h)
            }
        }
        this.drawPieces(ctx);
    }

    setSequareColours(i: number, j: number, ctx: any) {
        if ((i + j + 1) % 2 != 0) {
            ctx.strokeStyle = '#1a1a1a';
            ctx.fillStyle = '#f2f2f2';
        } else {
            ctx.strokeStyle = '#f2f2f2';
            ctx.fillStyle = '#1a1a1a';
        }
    }

    drawPieces(ctx: any) {
        const startingFen = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';
        const piecesArray = this.chessBoard.fenParser(startingFen);
        const {cw, ch} = this.getCellDimensions();
        const pieces = new Pieces();
        let rank = 0;
        let file = 0;

        for (let i = 0; i < piecesArray.length; i++) {
            if (i % 8 === 0 && i !== 0) {
                rank++;
                file = 0;
            }
            if (i % 8 !== 0 && i !== 0) {
                file++;
            }
            if (pieces.getChessPieces().has(piecesArray[i])) {
                let img = new Image();
                img.src = pieces.getChessPieces().get(piecesArray[i]);
                img.id = piecesArray[i];
                drawImg(ctx, img, rank, file)
            }

        }

        function drawImg(ctx: any, img: any, file: number, rank: number) {
            if (!img.complete) {
                console.debug("Image " + img.id + " on rank " + rank + " and file " + file + " has failed to load")
                setTimeout(function(){
                    drawImg(ctx, img, file, rank)
                }, 50)
                return;
            }
            console.debug("Image " + img.id + " on rank " + rank + " and file " + file + " has loaded successfully")
            ctx.drawImage(img, (cw * rank) + cw * 0.1, (ch * file) + ch * 0.1, cw * 0.8, ch * 0.8)
        }
    }

    handleClick(event: any) {
        const cx = event.offsetX;
        const cy = event.offsetY;
        // calculations may change depending on how the component is structured in the DOM
        console.debug("event.pageX, event.pageY: ", + event.pageX, + " " + event.pageY)
        console.debug("event.offsetX, event.offsetY: ", + event.offsetX, + " " + event.offsetY)
        console.debug("canvas.offsetLeft, canvas.offsetY: ", + this.state.canvas.current.offsetLeft, + " " + this.state.canvas.current.offsetTop)
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
