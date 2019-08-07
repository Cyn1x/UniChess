import React from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import { LinkContainer } from 'react-router-bootstrap'
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

export const DashNav = () => (
    <Styles>
        <Navbar expand="sm">
            <Navbar.Brand>
                <img
                    src={Logo}
                    width={128}
                    className="d-inline-block align-top"
                    alt="Unichess logo"
                />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-bar" />
            <Navbar.Collapse id ="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Item>
                            <LinkContainer to="/dashboard">
                                <Button>Dashboard</Button>
                            </LinkContainer>
                        </Nav.Item>
                    </Nav>
                    <Nav className="ml-auto">
                        <Nav.Item>
                            <LinkContainer to="/account">
                                <Button>Account</Button>
                            </LinkContainer>
                        </Nav.Item>
                        <Nav.Item>
                            <LinkContainer to="/logout">
                                <Button>Logout</Button>
                            </LinkContainer>
                        </Nav.Item>
                    </Nav>
            </Navbar.Collapse>
        </Navbar>
    </Styles>
);
