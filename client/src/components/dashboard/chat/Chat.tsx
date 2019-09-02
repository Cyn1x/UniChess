import * as React from "react";
import { connect } from "react-redux";
import { AppState } from "../../utilities/store";
import { SystemState } from "../../utilities/store/system/types";
import { updateSession } from "../../utilities/store/system/actions";
import { ChatState } from "./types";
import { sendMessage } from "./actions";

import ChatHistory from "./ChatHistory";
import ChatInterface from "./ChatInterface";
import styled from "styled-components";

const Styles = styled.section`
    width: 25%;
    position: fixed;
    bottom: 96px;
    right: 10px; 
`;

interface IChat {
    sendMessage: typeof sendMessage;
    chat: ChatState;
    system: SystemState;
}

export type UpdateMessageParam = React.SyntheticEvent<{ value: string }>;

class Chat extends React.Component<IChat> {
    state = {
        message: ""
    };
    
    componentDidMount() {
        this.props.sendMessage({
            user: "Chat Bot",
            message: "This is a very basic chat application written in typescript using react and redux. Feel free to explore the source code.",
            timestamp: new Date().getTime()
        });
    }
    
    updateMessage = (event: UpdateMessageParam) => {
        this.setState({ message: event.currentTarget.value });
    };
    
    sendMessage = (message: string) => {
        this.props.sendMessage({
            user: this.props.system.userName,
            message: message,
            timestamp: new Date().getTime()
        });
        this.setState({ message: "" });
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
    system: state.system,
    chat: state.chat
});

export default connect(
    mapStateToProps,
    { sendMessage, updateSession }
)(Chat);
