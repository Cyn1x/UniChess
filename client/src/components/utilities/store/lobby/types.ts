export interface LobbyState {
    currentGames: number;
    gameRooms: [];
}

export interface RoomInfo {
    host: string;
    link: string;
    time: string;
}

export const UPDATE_LOBBY_STATE = "UPDATE_LOBBY_STATE";
export const SEND_ROOM_REQUEST = "SEND_ROOM_REQUEST"
export const SEND_ROOM_RESPONSE = "SEND_ROOM_RESPONSE";
export const ROOM_RECIEVED = "ROOM_RECIEVED";

interface UpdateLobbyStateAction {
    type: typeof UPDATE_LOBBY_STATE;
    payload: LobbyState
}

interface CreateRoomAction {
    type: typeof SEND_ROOM_RESPONSE;
    payload: LobbyState;
}

export type LobbyActionTypes = CreateRoomAction;
