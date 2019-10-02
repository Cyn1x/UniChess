import * as React from "react";
import { ChatMessage } from "../../utilities/store/chat/types";

import styled from "styled-components";

const MessageHistory = styled.div`
    height: 50vh;
    background-color: #FFF;
    overflow-y: auto;
`;

const UserMessage = styled.div`

`;
  
interface IChatAreaProps {
    messages: ChatMessage[];
}

const ChatHistory: React.SFC<IChatAreaProps> = ({ messages }) => {
    return (
        <MessageHistory>
            {messages.map(message => (
                <div className="message-item" key={message.time}>
                    <p>{message.from}</p>
                    <UserMessage>
                        <p>{message.content}</p>
                    </UserMessage>
                </div>
            ))}
        </MessageHistory>
    );
};

export default ChatHistory;
