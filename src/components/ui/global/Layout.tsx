import React from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import { NavigationBar } from '../home/HomeNav';
import { DashNav } from '../dashboard/DashNav'
import { Footer } from '../home/HomeFooter';

import Container from 'react-bootstrap/Container';
import { Dashboard } from '../../routes/dashboard/Dashboard';

interface ILayout {
    children: React.ReactNode
    authenticated: boolean
}

export const Layout = (props: ILayout) => {
    return (
        <React.Fragment>
            <Container fluid>
                {(props.authenticated) ? DashLayoutHelper(props) : HomeLayoutHelper(props)}
            </Container>
        </React.Fragment>
    )
}

const HomeLayoutHelper = (props: ILayout) => {
    return (
        <Row>
            <Col lg={{ span: 8, offset: 2 }}>
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
                <Dashboard />
                <Footer />
            </Col>
        </Row>
    )
}
