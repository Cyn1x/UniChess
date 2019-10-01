import { SEND_MESSAGE_RESPONSE, MESSAGE_SENT, USER_CHANGED } from './actions';

const initialState = {
    username: ('username') || 'guest0001',
    messages: []
  };

export function messageReducer(state = initialState, action: {username?: string, type: string, message: { from: string, content: string}}) {
    switch (action.type) {
        case USER_CHANGED:
            return Object.assign({},
                state, {username: action.username}
            );
        case SEND_MESSAGE_RESPONSE:
            const isMessageTypeSent = (action.message.from === state.username);
            action.message = Object.assign(action.message, {type: isMessageTypeSent ? 'sent'  : 'received'});
            return {
                ...state,
                messages: [...state.messages, action.message] as []
            };
            case MESSAGE_SENT:
        default:
            return state;
    }
}
