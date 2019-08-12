import React from 'react';
import { Square } from './Square';
import styled from 'styled-components';

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
    private ratio = window.devicePixelRatio || 1;
    
    private squaresArray: Array<Square>;
    
    constructor(props: ICanvas) {
        super(props);
        this.update = this.update.bind(this)
        this.state = {
            canvas: this.canvas,
            screen: {
                width: this.height * (this.width / this.height),
                height: this.height,
                ratio: this.ratio
            }
        };
        this.squaresArray = new Array(64);
    }

    componentWillMount() {  }

    componentDidMount() { 
        window.addEventListener('resize', this.resizeCallback);
        this.update();
        this.state.canvas.current.addEventListener("click", (event: Event) => {  });
    }

    componentWillReceiveProps(nextProps: any) {  }

    shouldComponentUpdate(nextProps: any, nextState: any) { return true; }

    componentWillUpdate(nextProps: any, nextState:any) {  }
    
    componentDidUpdate(prevProps: any, prevState: any) {  }

    componentWillUnmount() { window.removeEventListener('resize', this.resizeCallback); }

    resizeCallback = () => setTimeout(this.update, 500)

    update() {
        this.width = (boardSize() ? window.innerWidth: window.innerHeight) / 2.5
        this.height = this.width;
        this.setState({
            screen: {
                width: this.height * (this.width / this.height),
                height: this.height,
                ratio: this.ratio
            }
        })
        this.init();
        this.draw();
    }

    init() {
        const cellWidth = this.state.screen.width / 8;
        const cellHeight = this.state.screen.width / 8;
        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {
                this.squaresArray[i + j * 8] = new Square(cellWidth, cellHeight)
            }
        }
    }

    draw() {
        const ctx = this.state.canvas.current.getContext('2d');
        let x, y, w, h: number;
        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {
                x = i * this.squaresArray[i].width;
                y = j * this.squaresArray[i].width;
                w = this.squaresArray[j].width;
                h = this.squaresArray[j].height;

                let evenCol = (i % 2 === 0 ? true : false)
                this.setSequareColours(evenCol, i, j, ctx)

                ctx.strokeRect(x, y, w, h)
                ctx.fillRect(x, y, w, h)
            }
        }
    }

    setSequareColours(evenCol: boolean, i: number, j: number, ctx: any) {
        if (evenCol === true) {
            if (j % 2 === 0 && i % 2 === 0) {
                ctx.strokeStyle = '#1a1a1a';
                ctx.fillStyle = '#f2f2f2';
            }
            else {
                ctx.strokeStyle = '#f2f2f2';
                ctx.fillStyle = '#1a1a1a';
            }
        }
        else {
            if (j % 2 === 0 && i % 2 !== 0) {
                ctx.strokeStyle = '#f2f2f2';
                ctx.fillStyle = '#1a1a1a';
            }
            else {
                ctx.strokeStyle = '#1a1a1a';
                ctx.fillStyle = '#f2f2f2';
            }
        }
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
