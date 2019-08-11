import React from 'react';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import styled from 'styled-components';

import { HomeNav } from '../home/HomeNav';
// import { HomeFooter } from '../home/HomeFooter';
import { DashRoutesManager } from '../../routes/managers/DashRoutesManager';
import { DashNav } from '../dashboard/DashNav'
import { SideAccordion } from '../dashboard/SideAccordion';
import { Chat } from '../dashboard/Chat';
import { DashFooter } from '../dashboard/DashFooter';

const Styles = styled.div`
    .container-fluid {
        padding-top: 56px;
        padding-bottom: 48px;
    }

    body {
        background-color: #FFF;
        opacity: 0.9;
    }
`;

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
        <Container fluid>
            <Col lg={{ span: 8, offset: 2 }}>
                <HomeNav />
                {props.children}
            </Col>
        </Container>
    )
}

const DashLayoutHelper = (props: ILayout) => {
    return (
        <Styles>
            <Container fluid>
                <Row>
                    <Col xl={2} md={4}>
                        <SideAccordion />
                    </Col>
                    <Col lg={8} md={6}>
                        <DashNav />
                        <DashRoutesManager />
                        <DashFooter />
                    </Col>
                    <Col>
                    </Col>
                </Row>
            </Container>
        </Styles>
    )
}
