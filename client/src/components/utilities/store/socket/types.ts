export interface SocketState {
    connected: boolean,
    isError: false
}

export const CONNECTION_CHANGED = "CONNECTION_CHANGED";
export const CONNECT_SOCKET = "CONNECT_SOCKET";
export const CREATE_ROOM = "CREATE_ROOM";
export const JOIN_ROOM = "JOIN_ROOM";
export const SEND_GAME = "SEND_GAME";

interface ConnectionChangedAction {
    type: typeof CONNECTION_CHANGED;
    payload: SocketState;
}

interface ConnectSocketAction {
    type: typeof CONNECT_SOCKET;
}

interface CreateRoomAction {
    type: typeof CREATE_ROOM;
}

interface JoinRoomAction {
    type: typeof JOIN_ROOM;
}

interface SendGameAction {
    type: typeof SEND_GAME;
}

export type ConnectionActionTypes = ConnectionChangedAction | ConnectSocketAction;
export type SocketActionTypes = CreateRoomAction | JoinRoomAction;
export type GameStateActionTypes = SendGameAction;
