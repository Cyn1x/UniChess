import { GameState, SEND_GAME_RESPONSE } from './types';

const initialGameState: GameState = {
    nextFenString: "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",
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
