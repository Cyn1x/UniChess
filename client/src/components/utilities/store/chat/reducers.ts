import { ChatState, SEND_MESSAGE_RESPONSE, MESSAGE_SENT } from './types';

const initialChatState: ChatState = {
    username: "",
    messages: []
};

export function messageReducer(
    state = initialChatState,
    action: {username?: string, type: string, message: { from: string, content: string}}) {
    switch (action.type) {
        case SEND_MESSAGE_RESPONSE:
            const isMessageTypeSent = (action.message.from === state.username);
            action.message = Object.assign(action.message, {type: isMessageTypeSent ? 'sent'  : 'received'});
            return {
                ...state,
                messages: [...state.messages, action.message]
                // messages: [...state.messages, action.message] as []
            };
            case MESSAGE_SENT:
        default:
            return state;
    }
}
