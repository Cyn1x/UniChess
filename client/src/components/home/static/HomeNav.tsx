import React from 'react';
import { LinkContainer } from 'react-router-bootstrap'

import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Logo from '../../../assets/img/logo.png';
import styled from 'styled-components';

const Styles = styled.div`
    .navbar {
        background-color: rgb(192,192,192);
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.5);
    }

    .btn-primary {
        background-color: transparent;
        border-color: transparent;
        color: #222;
    }
`;

const HomeNav = () => (
    <Styles>
        <Navbar expand="sm">
            <LinkContainer to="/">
                <Navbar.Brand>
                    <img
                        src={Logo}
                        width={128}
                        className="d-inline-block align-top"
                        alt="Unichess logo"
                    />
                </Navbar.Brand>
            </LinkContainer>
            <Navbar.Toggle aria-controls="responsive-navbar-bar" />
            <Navbar.Collapse id ="basic-navbar-nav">
                    <Nav className="ml-auto">
                        <Nav.Item>
                            <LinkContainer to="/about">
                                <Button>About</Button>
                            </LinkContainer>
                        </Nav.Item>
                        <Nav.Item>
                            <LinkContainer to="/contact">
                                <Button>Contact</Button>
                            </LinkContainer>
                        </Nav.Item>
                        <Nav.Item>
                            <LinkContainer to="/login">
                                <Button>Login</Button>
                            </LinkContainer>
                        </Nav.Item>
                        <Nav.Item>
                            <LinkContainer to="/signup">
                                <Button>Signup</Button>
                            </LinkContainer>
                        </Nav.Item>
                    </Nav>
            </Navbar.Collapse>
        </Navbar>
    </Styles>
);

export default HomeNav;
