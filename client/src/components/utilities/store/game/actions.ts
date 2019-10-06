import { SEND_ROOM_RESPONSE, ROOM_RECIEVED, SEND_GAME_RESPONSE, GAME_RECEIVED, RoomInfo, GameState } from "./types";

export const roomReceived = (room: RoomInfo) => {
    return {
        type: SEND_ROOM_RESPONSE,
        room
    };
};

export const roomSent = () => {
    return {
        type: ROOM_RECIEVED
    };
};

export const gameReceived = (game: GameState) => {
    return {
        type: SEND_GAME_RESPONSE,
        game
    };
};

export const gameSent = () => {
    return {
        type: GAME_RECEIVED
    };
};
