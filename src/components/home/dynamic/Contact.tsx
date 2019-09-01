import React from 'react';
import styled from 'styled-components';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const Styles = styled.div`
    div {
        background-color: #FFF;
        opacity: 0.9;
    }

    form {
        background-color: #FFF;
        opacity: 0.9;

        padding: 0% 10% 5% 10%;
    }

    h3 {
        background-color: #FFF;
        opacity: 0.9;

        padding: 5% 0% 0% 5%;
    }
`;

export const Contact = () => (
    <Styles>
        <div>
        <h3>Contact</h3>
        <form>
            <Form>
                <Form.Group controlId="formGroupContactName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="name" placeholder="Enter name" />
                </Form.Group>
                <Form.Group controlId="formGroupContactEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" />
                </Form.Group>
                <Form.Group controlId="Form.ControlContactMessage">
                    <Form.Label>Your message</Form.Label>
                    <Form.Control as="textarea" rows="3" />
                </Form.Group>
                <Button variant="primary" onClick={
                    () => {
                        
                     }}>
                    Submit
                </Button>
            </Form>
        </form>
        </div>
    </Styles>
)
