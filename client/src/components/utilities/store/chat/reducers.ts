import { 
    ChatState,
    SEND_MESSAGE,
    DELETE_MESSAGE,
    ChatActionTypes 
} from "./types";

const initialState: ChatState = {
    input: "",
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
                input: state.input
            };
        case DELETE_MESSAGE:
            return {
                messages: state.messages.filter(
                    message => message.timestamp !== action.meta.timestamp
                ),
                input: state.input
            };
    default:
        return state;
    }
}
