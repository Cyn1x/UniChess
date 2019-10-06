import { SEND_ROOM_RESPONSE, LobbyState } from "./types";

const initialLobbyState: LobbyState = {
    currentGames: 0,
    gameRooms: []
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
