import React from 'react';
import Button from 'react-bootstrap/Button';
import styled from 'styled-components';
import Chat from './Chat';

const Styles = styled.div`
    
`;

const Widget = styled(Button)`
    position: fixed;
    bottom: 48px;
    right: 10px; 
`;

interface IChatWidget {
    show?: boolean;
}

class ChatWidget extends React.Component<IChatWidget> {
    state = {
        show: false,
    }

    toggle = () => {
        this.setState({
            show: !this.state.show
        })
    }
    
    render() {
        return (
            <Styles>
                {this.state.show && <Chat />}
                <Widget onClick={this.toggle}>Chat</Widget>
            </Styles>
        );
    }
}

export default ChatWidget;
