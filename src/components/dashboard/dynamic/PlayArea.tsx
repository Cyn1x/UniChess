import React from 'react';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import { Renderer } from './Renderer';

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
                <Row>
                    <Col>
                    
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default PlayArea;
