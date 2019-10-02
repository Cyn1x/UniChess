import React from 'react';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import { SideAccordion } from './SideAccordion';

interface IDashSplash {
    match: any
}

export class DashSplash extends React.Component<IDashSplash> {

    componentDidMount() {  }

    componentWillUnmount() {  }

    render() {
        return (
            <Container fluid>
                <Row>
                    <Col>
                        <SideAccordion />
                    </Col>
                    <Col>

                    </Col>
                    <Col>
                        
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default DashSplash;
