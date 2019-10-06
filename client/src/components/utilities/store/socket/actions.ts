import { CONNECTION_CHANGED, CONNECT_SOCKET, CREATE_ROOM, JOIN_ROOM, SEND_GAME } from "./types";
import { RoomInfo, GameState } from "../game/types";

// TODO: Implement type definitions
export const connectionChanged = (isConnected: boolean) => {
    return {
        type: CONNECTION_CHANGED,
        connected: isConnected,
        isError: false
    };
};

export const connectSocket = () => {
    return {
        type: CONNECT_SOCKET
    };
};

export const createRoom = (room: RoomInfo) => {
    return {
        type: CREATE_ROOM,
        room
    };
}

export const joinRoom = (room: RoomInfo) => {
    return {
        type: JOIN_ROOM,
        room
    };
}

export const sendGame = (game: GameState) => {
    return {
        type: SEND_GAME,
        game
    }
}
