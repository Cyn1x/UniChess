import React from 'react';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import { SideAccordion } from '../../ui/dashboard/SideAccordion';

interface IDashSplash {
    match: any
}

interface IState {
    match: any
}

export class DashSplash extends React.Component<IDashSplash, IState> {

    constructor(props: IDashSplash) {
        super(props);
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
