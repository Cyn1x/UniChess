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

interface ChatHistoryProps {
    messages: ChatMessage[];
}

const ChatHistory: React.SFC<ChatHistoryProps> = ({ messages }) => {
    return (
        <MessageHistory>
            {messages.map(message => (
                <div className="message-item" key={message.timestamp}>
                    <p>{message.user}</p>
                    <UserMessage>
                        <p>{message.message}</p>
                    </UserMessage>
                </div>
            ))}
        </MessageHistory>
    );
};

export default ChatHistory;
