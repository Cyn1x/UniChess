import { UPDATE_LOBBY_STATE, UPDATE_GAME_STATE, SEND_ROOM_RESPONSE, GameActionTypes, LobbyState, GameState, SEND_GAME_RESPONSE } from "./types";
import Board from "../../../game/Board";

const initialLobbyState: LobbyState = {
    currentGames: 0,
    gameRooms: []
}

const initialGameState: GameState = {
    nextPlayerTurn: "White",
    movePieceFrom: "",
    movePieceTo: ""
}

// TODO: Implement type definitions
export function lobbyStateReducer(
    state = initialLobbyState,
    action: {type: string, room: string}) {
    switch (action.type) {
        case SEND_ROOM_RESPONSE:
            return {
                ...state,
                gameRooms: [...state.gameRooms, action.room] as []
            };
        default:
            return state;
    }
}

export function gameStateReducer(
    state = initialGameState,
    action: {type: string, game: []}
): GameState {
    switch (action.type) {
        case SEND_GAME_RESPONSE: {
            return {
                ...state,
                ...action.game
            };
        }
        default:
            return state;
    }
}
