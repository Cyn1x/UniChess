import React from 'react';
import styled from 'styled-components';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

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

export const Signup = () => (
    <Styles>
        <div>
        <h3>Signup</h3>
        <form>
            <Form>
                <Form.Group controlId="formGroupSignupUsername">
                        <Form.Label>Username</Form.Label>
                        <Form.Control placeholder="Your desired username" />
                </Form.Group>
                <Form.Group controlId="formGroupSignupUniversity">
                        <Form.Label>University</Form.Label>
                        <Form.Control placeholder="Your university" />
                </Form.Group>
                <Form.Group controlId="formGroupSignupEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Your email address" />
                </Form.Group>
                <Form.Group controlId="formGroupSignupConfirmEmail">
                        <Form.Label>Confirm email address</Form.Label>
                        <Form.Control type="email" placeholder="Confirm your email address" />
                </Form.Group>
                <Form.Group controlId="formGroupSignupPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Enter a password" />
                </Form.Group>
                <Form.Group controlId="formGroupSignupConfirmEmail">
                        <Form.Label>Confirm password</Form.Label>
                        <Form.Control type="password" placeholder="Confirm your password" />
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
