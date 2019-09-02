import React from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import GitHubLogo from "../../../assets/img/site/GitHubLogo.png"
import styled from 'styled-components';
import NavItem from 'react-bootstrap/NavItem';

const Styles = styled.div`
    .navbar {
        background-color: rgb(192,192,192);
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.5);
    }
`;

export const DashFooter = () => (
    <Styles>
        <Navbar fixed="bottom">
            <Navbar.Toggle aria-controls="basic-navbar-bar" />
            <Navbar.Collapse id ="basic-navbar-nav">
                <Nav className="ml-auto">
                    <NavItem>
                        <a href=
                        "https://github.com/Cyn1x/unichess" 
                        target="_blank" 
                        rel="noreferrer noopener"
                        >
                            <img
                                src={GitHubLogo}
                                className="d-inline-block align-top"
                                alt="GitHub logo"
                            />
                        </a>
                    </NavItem>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    </Styles>
);
