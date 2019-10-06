import { ChatMessage, SEND_MESSAGE_RESPONSE, SEND_MESSAGE_REQUEST, MESSAGE_SENT } from "./types";

export const messageReceived = (message: ChatMessage) => {
    return {
        type: SEND_MESSAGE_RESPONSE,
        message
    };
};

export const sendMessage = (message: ChatMessage) => {
    return {
        type: SEND_MESSAGE_REQUEST,
        message
    };
};

export const messageSent = () => {
    return {
        type: MESSAGE_SENT
    };
};
