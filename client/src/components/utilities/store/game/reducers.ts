import { GameState, SEND_GAME_RESPONSE } from './types';

const initialGameState: GameState = {
    nextPlayerTurn: "White",
    movePieceFrom: "",
    movePieceTo: ""
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
