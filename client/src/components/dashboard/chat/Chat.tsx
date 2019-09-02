import * as React from "react";
import { connect } from "react-redux";
import { AppState } from "../../utilities/store";
import { SystemState } from "../../utilities/store/system/types";
import { updateSession } from "../../utilities/store/system/actions";
import { ChatMessage, ChatState } from './types';
import { ChatContext } from './ChatContext';
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
    static contextType = ChatContext;
    // TODO: Merge Redux store capabilities with newly implemented socket feature. Debugging comments to follow.
    state: ChatState = {
        messages: [
            {
                message: 'Welcome! Type a message and press Send Message to continue the chat.',
                user: 'Bot',
                timestamp: new Date().getTime()
            }
        ],
        input: '', // ChatInterface.tsx passed a similar prop in Render - updateMessage={this.updateMessage}
        // redux
        // message: ""
    }

    // Redux
    // componentDidMount() {
    //     this.props.sendMessage({
    //         user: "Chat Bot",
    //         message: "This is a very basic chat application written in typescript using react and redux. Feel free to explore the source code.",
    //         timestamp: new Date().getTime()
    //     });
    // }

    componentDidMount () {
        // Initiate socket connection - leave as-is
        this.context.init();

        const observable = this.context.onMessage();

        observable.subscribe((m: ChatMessage) => {
            let messages = this.state.messages;

            messages.push(m);
            this.setState({ messages: messages });
        });
    }

    // leave as-is
    componentWillUnmount () {
        this.context.disconnect();
    }

    // Redux
    updateMessage = (event: UpdateMessageParam) => {
        this.setState({ message: event.currentTarget.value });
    };
    
    // Redux - to remove in favour of socket feature
    sendMessage = (message: string) => {
        this.props.sendMessage({
            user: this.props.system.userName,
            message: message,
            timestamp: new Date().getTime()
        });
        this.setState({ message: "" });
    };

    render () {

        // Same as updateMessage={this.updateMessage} in Render
        const updateInput = (e: React.ChangeEvent<HTMLInputElement>): void => {
            this.setState({ input: e.target.value });
        }
    
        const handleMessage = (): void => {
            
            const author: string = 'Ross';

            if (this.state.input !== '') {
                this.context.send({
                    message: this.state.input,
                    author: author
                });
                this.setState({ input: '' });
            }
        };

        let msgIndex = 0;
        return (
            <Styles>
                <ChatHistory messages={this.props.chat.messages} />
                {/* <ChatInterface
                    userName={this.props.system.userName}
                    message={this.state.message}
                    updateMessage={this.updateMessage}
                    sendMessage={this.sendMessage}
                /> */}
            </Styles>
            // <div className="App">

            //     <div className="App-chatbox">
            //         {this.state.messages.map((msg: ChatMessage) => {
            //             msgIndex++;
            //             return (
            //                 <div key={msgIndex}>
            //                     <p>{msg.user}</p>
            //                     <p>
            //                     {msg.message}
            //                     </p>
            //                 </div>
            //             );
            //         })}
            //     </div>
            //     <input
            //         className="App-Textarea"
            //         placeholder="Type your messsage here..."
            //         onChange={updateInput}
            //         value={this.state.input}
            //     />
            //     <p>
            //         <button onClick={() => { handleMessage() }}>
            //             Send Message
            //         </button>
            //     </p>
            // </div>
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
