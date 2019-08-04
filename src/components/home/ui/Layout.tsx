import React from 'react';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import styled from 'styled-components';

interface ILayout {
    children: React.ReactNode
}

export const Layout = (props: ILayout) => (
    <Container fluid>
        <Row>
            <Col>&nbsp;</Col>
        </Row>
        <Row>
            <Col md={{ span: 6, offset: 3 }}>{props.children}</Col>
        </Row>
        <Row>
            <Col>&nbsp;</Col>
        </Row>
    </Container>
)
