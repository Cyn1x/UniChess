import React from 'react';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import { Renderer } from './Renderer';
import { ChatWidget } from '../chat/ChatWidget';
import { GameInfo } from '../../game/GameInfo';

interface IPlayArea {
    
}

export class PlayArea extends React.Component<IPlayArea> {
    
    constructor(props: IPlayArea) {
        super(props);
    }

    componentDidMount() {  }

    componentWillUnmount() {  }

    render() {
        return (
            <Container fluid>
                <Row>
                    <Col>

                    </Col>
                </Row>
                <Row>
                    <Col>
                        <GameInfo />
                    </Col>
                    <Col>
                        <Renderer />
                    </Col>
                    <Col>
                        <ChatWidget />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default PlayArea;
