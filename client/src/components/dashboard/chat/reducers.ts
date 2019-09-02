import { 
    ChatState,
    SEND_MESSAGE,
    DELETE_MESSAGE,
    ChatActionTypes 
} from "./types";

const initialState: ChatState = {
    input: "", // doesn't need to be here, see Chat.tsx
    messages: []
};
  
export function chatReducer(
    state = initialState,
    action: ChatActionTypes
): ChatState {
    switch (action.type) {
        case SEND_MESSAGE:
            return {
                messages: [...state.messages, action.payload],
                input: state.input // doesn't need to be here, see Chat.tsx
            };
        case DELETE_MESSAGE:
            return {
                messages: state.messages.filter(
                    message => message.timestamp !== action.meta.timestamp
                ),
                input: state.input // doesn't need to be here, see Chat.tsx
            };
    default:
        return state;
    }
}
