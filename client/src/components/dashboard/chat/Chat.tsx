import * as React from "react";
import { connect } from "react-redux";
import { Dispatch, Action } from 'redux';
import { AppState } from "../../utilities/store";
import { SystemState } from "../../utilities/store/system/types";
import { ChatMessage, ChatState } from "../../utilities/store/chat/types";
import { sendMessage } from '../../utilities/store/chat/actions';

import ChatHistory from "./ChatHistory";
import ChatInterface from "./ChatInterface";
import styled from "styled-components";

const Styles = styled.section`
    width: 25%;
    position: fixed;
    bottom: 96px;
    right: 10px; 
`;

export type UpdateMessageParam = React.SyntheticEvent<{ value: string }>;

interface IChatDispatchProps {
    sendMessage: (message: ChatMessage) => void;
}

interface IChat {
    chat: ChatState;
    system: SystemState;
    sendMessage: any; // TODO: type
}

class Chat extends React.Component<IChat> {
    state = {
        message: ""
    };

    componentDidMount() {}

    updateMessage = (event: UpdateMessageParam) => {
        this.setState({ message: event.currentTarget.value });
    };

    sendMessage = (message: string) => {
        const currentTime = new Date();
        this.props.sendMessage({ from: this.props.system.userName, content: message, time: currentTime });
        this.setState({
            message: ""
        })
    };

    render() {
        return (
            <Styles>
                <ChatHistory messages={this.props.chat.messages} />
                <ChatInterface
                    userName={this.props.system.userName}
                    message={this.state.message}
                    updateMessage={this.updateMessage}
                    sendMessage={this.sendMessage}
                />
            </Styles>
        );
    }
}

const mapStateToProps = (state: AppState) => ({
    system: state.systemState,
    chat: state.messageState
});

const mapDispatchToProps = (dispatch: Dispatch<Action>): IChatDispatchProps => ({
    sendMessage: (message: ChatMessage) => dispatch(sendMessage(message)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
