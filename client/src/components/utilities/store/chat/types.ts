// Describing the shape of the chat's slice of state
export interface ChatMessage {
    user: string;
    message: string;
    timestamp: number;
}

// Describing the different ACTION NAMES available
export const SEND_MESSAGE = "SEND_MESSAGE";
export const DELETE_MESSAGE = "DELETE_MESSAGE";

export interface ChatState {
    input: string; // doesn't need to be here
    messages: ChatMessage[];
}

interface SendMessageAction {
    type: typeof SEND_MESSAGE;
    payload: ChatMessage;
}

interface DeleteMessageAction {
    type: typeof DELETE_MESSAGE;
    meta: {
      timestamp: number;
    };
}

export type ChatActionTypes = SendMessageAction | DeleteMessageAction;
