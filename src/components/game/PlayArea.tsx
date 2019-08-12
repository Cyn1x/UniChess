import React from 'react';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import { Renderer } from '../game/Renderer';

interface IPlayArea {
    isPlaying: boolean
}

interface IState {
    isPlaying: boolean;
}

export class PlayArea extends React.Component<IPlayArea, IState> {
    private isPlaying = false;

    constructor(props: IPlayArea) {
        super(props);
        this.state = {
            isPlaying: this.isPlaying
        }
    }

    componentWillMount() {  }

    componentDidMount() {  }

    componentWillReceiveProps(nextProps: any) {  }

    shouldComponentUpdate(nextProps: any, nextState: any) { return true; }

    componentWillUpdate(nextProps: any, nextState:any) {  }
    
    componentDidUpdate(prevProps: any, prevState: any) {  }

    componentWillUnmount() {  }

    render() {
        return (
            <Container fluid>
                <Row>
                    <Col>
                    &nbsp;
                    </Col>
                </Row>
                <Row>
                    <Col>
                        
                    </Col>
                    <Col>
                        <Renderer />
                    </Col>
                    <Col>
                        
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default PlayArea;
