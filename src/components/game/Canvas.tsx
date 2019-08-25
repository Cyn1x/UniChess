import React, { EventHandler } from 'react';
import styled from 'styled-components';

import { 
    wPawn, wKnight, wBishop, wRook, wQueen, wKing, 
    bPawn, bKnight, bBishop, bRook, bQueen, bKing
} from './Pieces';
import { Square } from './Square';

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
    // private ratio = window.devicePixelRatio || 1;
    private ratio = this.width / this.height
    
    private squaresArray: Array<Square>;
    private referenceArray: Array<number>;
    
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
        this.squaresArray = new Array(64);
        this.referenceArray = new Array(120);
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
        console.debug("state.screen.width: ", this.state.screen.width)
        console.debug("state.screen.height: ", this.state.screen.height)
        console.debug("state.canvas: ", this.state.canvas)
        this.init();
        this.drawBoard();
    }

    init() {
        const {cw, ch} = this.getCellDimensions()
        console.debug("cellWidth: ", cw)
        console.debug("cellHeight: ", ch)
        const files = "ABCDEFGH";
        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {
                this.squaresArray[i + j * 8] = new Square(files[i] + (j + 1), cw, ch)
            }
        }
        console.debug(this.squaresArray);
    }

    drawBoard() {
        const ctx = this.state.canvas.current.getContext('2d');
        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {
                const x = i * this.squaresArray[j].getWidth();
                const y = j * this.squaresArray[j].getWidth();
                const w = this.squaresArray[j].getWidth();
                const h = this.squaresArray[j].getHeight();

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
        const img = new Image();
        img.src = wPawn;
        img.id = 'wPawn';
        function drawImg(ctx: any, img: any) {
            if (!img.complete) {
                console.debug("Image " + img.id + " has failed to load")
                setTimeout(function(){
                    drawImg(ctx, img)
                }, 50)
                return;
            } else {
                console.debug("Image " + img.id + " has loaded successfully")
                ctx.drawImage(img, 0, 0)
            }
        }
        drawImg(ctx, img)
    }

    handleClick(event: any) {
        const cx = event.offsetX;
        const cy = event.offsetY;
        // calculations may change depending on how the component is structured in the DOM
        console.debug("event.pageX, event.pageY: ", + event.pageX, + " " + event.pageY)
        console.debug("event.offsetX, event.offsetY: ", + event.offsetX, + " " + event.offsetY)
        console.debug("canvas.offsetLeft, canvas.offsetY: ", + this.state.canvas.current.offsetLeft, + " " + this.state.canvas.current.offsetTop)

        for (let i = 0; i < this.squaresArray.length; i++) {
            
        }
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
