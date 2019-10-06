import { SEND_GAME_REQUEST, SEND_GAME_RESPONSE, GAME_RECEIVED, GameState } from "./types";

export const sendGame = (game: GameState) => {
    return {
        type: SEND_GAME_REQUEST,
        game
    }
}

export const gameSent = () => {
    return {
        type: GAME_RECEIVED
    };
};

export const gameReceived = (game: GameState) => {
    return {
        type: SEND_GAME_RESPONSE,
        game
    };
};
