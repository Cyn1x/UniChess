export interface ChatMessage {
    from: string,
    content: string,
    time: string
}

export interface ChatState {
    username: string,
    messages: []
}

export const SEND_MESSAGE_RESPONSE = 'SEND_MESSAGE_RESPONSE';
export const MESSAGE_SENT = 'MESSAGE_SENT';
export const SEND_MESSAGE_REQUEST = 'SEND_MESSAGE_REQUEST';

interface MessageReceivedAction {
    type: typeof SEND_MESSAGE_RESPONSE;
    payload: ChatMessage;
}

interface MessageSentAction {
    type: typeof MESSAGE_SENT;
}

interface MessageSendAction { 
    type: typeof SEND_MESSAGE_REQUEST;
}

export type ChatActionTypes = MessageReceivedAction | MessageSentAction | MessageSendAction;
