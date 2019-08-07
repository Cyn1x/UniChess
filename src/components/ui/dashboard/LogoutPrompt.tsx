import React, { useState } from 'react';
import { withRouter} from 'react-router-dom'
import Auth, { isAuthenticated } from '../../utilities/auth/Auth'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import styled from 'styled-components';

const Styles = styled.div`

`;

export function LogoutPrompt() {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <React.Fragment>
            <Button variant="primary" onClick={handleShow}>
                Logout
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>Logout</Modal.Title>
            </Modal.Header>
            <Modal.Body>Are you sure you want to log out?</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    No, keep me logged in
                </Button>
                <Button variant="primary" onClick={handleClose}>
                    Yes, log me out
                </Button>
            </Modal.Footer>
            </Modal>
        </React.Fragment>
    );
}
