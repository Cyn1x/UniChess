import React from 'react';
import { UpdateMessageParam } from './Chat';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import styled from 'styled-components';

const MessageForm = styled(Form)`
    background-color: #FFF;
    border-top: 2px solid black;
`;

const SendButton  = styled(Button)`
    width: 100%;
`;

interface ChatInterfaceProps {
    message: string;
    userName: string;
    sendMessage: (message: string) => void;
    updateMessage: (event: UpdateMessageParam) => void;
}

const ChatInterface: React.SFC<ChatInterfaceProps> = ({
    userName,
    message,
    updateMessage,
    sendMessage
}) => {
    function keyPress(e: React.KeyboardEvent<any>) {
        if (e.key === "Enter") {
            e.preventDefault();
            send();
        }
    }
    
    function send() {
        sendMessage(message);
    }
    
    return (
            <MessageForm>
                <Form.Group controlId="Form.ControlContactMessage">
                    <Form.Label>{userName}</Form.Label>
                    <Form.Control as="input" rows="0" 
                        value={message}
                        onChange={updateMessage}
                        onKeyPress={keyPress}
                        placeholder="Message"
                    />
                </Form.Group>
                <SendButton variant="primary" onClick={send}>
                    Submit
                </SendButton>
            </MessageForm>
    );
};

export default ChatInterface;
