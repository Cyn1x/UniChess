export interface LobbyState {
    currentGames: number;
    gameRooms: [];
}

export interface GameState {
    nextPlayerTurn: string;
    movePieceFrom: string;
    movePieceTo: string;
}

export interface RoomInfo {
    host: string;
    link: string;
    time: string;
}

export const UPDATE_LOBBY_STATE = "UPDATE_LOBBY_STATE";
export const UPDATE_GAME_STATE = "UPDATE_GAME_STATE";
export const SEND_ROOM_RESPONSE = "SEND_ROOM_RESPONSE";
export const ROOM_RECIEVED = "ROOM_RECIEVED";
export const JOIN_ROOM_RESPONSE = "JOIN_ROOM_RESPONSE";
export const ROOM_JOINED = "ROOM_JOINED";
export const SEND_GAME_RESPONSE = "SEND_GAME_RESPONSE";
export const GAME_RECEIVED = "GAME_RECEIVED";

interface UpdateLobbyStateAction {
    type: typeof UPDATE_LOBBY_STATE;
    payload: LobbyState
}

interface UpdateGameStateAction {
    type: typeof UPDATE_GAME_STATE;
    payload: GameState
}

interface CreateRoomAction {
    type: typeof SEND_ROOM_RESPONSE;
    payload: LobbyState;
}

export type GameActionTypes = UpdateLobbyStateAction | UpdateGameStateAction;
export type LobbyActionTypes = CreateRoomAction;
