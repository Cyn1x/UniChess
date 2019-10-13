import { SEND_ROOM_RESPONSE, LobbyState, RoomInfo } from "./types";

const initialLobbyState: LobbyState = {
    currentGames: 0,
    gameRooms: []
}

export function lobbyStateReducer(
    state = initialLobbyState,
    action: {type: string, room: RoomInfo}) {
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
