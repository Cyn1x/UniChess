import React from 'react';
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

class Canvas extends React.Component<ICanvas, IState> {
    private canvas = React.createRef<HTMLCanvasElement>();
    private width = 512;
    private height = 512;
    private ratio = window.devicePixelRatio || 1;
    
    constructor(props: ICanvas) {
        super(props);
        this.state = {
            canvas: this.canvas,
            screen: {
                width: this.width,
                height: this.height,
                ratio: this.ratio
            }
        };
        console.log("Constructor")
    }

    componentWillMount() {
        console.log("Component will mount")
    }

    componentDidMount() {
        console.log("Component did mount")
        const ctx = this.state.canvas.current.getContext('2d');
    }

    componentWillReceiveProps(nextProps: any) {
        console.log("Component will receive props", nextProps)
    }

    shouldComponentUpdate(nextProps: any, nextState: any) {
        console.log("Should component update", nextProps, nextState)
        return true;
    }

    componentWillUpdate(nextProps: any, nextState:any) {
        console.log("Component will update", nextProps, nextState)
    }
    
    componentDidUpdate(prevProps: any, prevState: any) {
        console.log("Component will update", prevProps, prevState)
    }

    componentWillUnmount() {
        console.log("Component will unmount")
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
