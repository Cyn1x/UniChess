export interface SocketState {
    connected: boolean,
    isError: false
}

export const CONNECTION_CHANGED = "CONNECTION_CHANGED";
export const CONNECT_SOCKET = "CONNECT_SOCKET";

interface ConnectionChangedAction {
    type: typeof CONNECTION_CHANGED;
    payload: SocketState;
}

interface ConnectSocketAction {
    type: typeof CONNECT_SOCKET;
}

export type SocketActionTypes = ConnectSocketAction | ConnectionChangedAction;
