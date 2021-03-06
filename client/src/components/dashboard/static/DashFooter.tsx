import React from 'react';

import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavItem from 'react-bootstrap/NavItem';
import styled from 'styled-components';

const Styles = styled.div`
    .navbar {
        background-color: rgb(192,192,192);
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.5);
    }
`;

const DashFooter = () => (
    <Styles>
        <Navbar fixed="bottom">
            <Navbar.Toggle aria-controls="basic-navbar-bar" />
            <Navbar.Collapse id ="basic-navbar-nav">
                <Nav className="ml-auto">
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    </Styles>
);

export default DashFooter;
