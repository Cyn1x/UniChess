import React from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import { NavigationBar } from '../home/HomeNav';
import { DashNav } from '../dashboard/DashNav'
import { Footer } from '../home/HomeFooter';

interface ILayout {
    children: React.ReactNode
    authenticated: boolean
}

export const Layout = (props: ILayout) => {
    return (
        <React.Fragment>
            {(props.authenticated) ? DashLayoutHelper(props) : HomeLayoutHelper(props)}
        </React.Fragment>
    )
}

const HomeLayoutHelper = (props: ILayout) => {
    return (        
        <Row>
            <Col md={{ span: 8, offset: 2 }}>
                <NavigationBar />
                {props.children}
            </Col>
        </Row>
    )
}

const DashLayoutHelper = (props: ILayout) => {
    return (
        <Row>
            <Col>
                <DashNav />
            
                <Footer />
            </Col>
        </Row>
    )
}
