import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import styled from 'styled-components';

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

export const Login = (props: any) => (
    <Styles>
        <div>
        <h3>Login</h3>
        <form>
            <Form>
                <Form.Group controlId="formGroupLoginEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" />
                </Form.Group>
                <Form.Group controlId="formGroupLoginPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" />
                </Form.Group>
                <Form.Group controlId="formGroupLoginChecbox">
                    <Form.Check type="checkbox" label="Remember me" />
                </Form.Group>
                <Button variant="primary" onClick={() => {
                        props.clicked(props)
                     }}>Submit
                </Button>
            </Form>
        </form>
        </div>
    </Styles>
)
