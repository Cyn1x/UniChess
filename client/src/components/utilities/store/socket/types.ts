export interface SocketState {
    connected: boolean,
    isError: false
}

export const CHANGE_CONNECTION = "CHANGE_CONNECTION";
export const CONNECT = "CONNECT";

interface ChangeConnectionAction {
    type: typeof CHANGE_CONNECTION;
    payload: SocketState;
}

interface ConnectionAction {
    type: typeof CONNECT;
}

export type ConnectionActionTypes = ChangeConnectionAction | ConnectionAction;
