import React from 'react';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import styled from 'styled-components';

import { HomeNav } from '../../home/static/HomeNav';
// import { HomeFooter } from '../home/HomeFooter';
import { DashNav } from '../../dashboard/static/DashNav'
import { DashFooter } from '../../dashboard/static/DashFooter';

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
    auth: boolean
    playing?: boolean
}

export const Layout = (props: ILayout) => {
    return (
        <React.Fragment>
                {(props.auth) ? DashLayoutHelper(props) : HomeLayoutHelper(props)}
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
                <DashNav />
                {props.children}
                <DashFooter />
        </Styles>
    )
}
