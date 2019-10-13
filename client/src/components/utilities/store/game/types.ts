export interface GameState {
    nextFenString: string;
    nextPlayerTurn: string;
    movePieceFrom: string;
    movePieceTo: string;
}

export const UPDATE_GAME_STATE = "UPDATE_GAME_STATE";
export const SEND_GAME_RESPONSE = "SEND_GAME_RESPONSE";
export const GAME_RECEIVED = "GAME_RECEIVED";
export const SEND_GAME_REQUEST = "SEND_GAME_REQUEST";

interface UpdateGameStateAction {
    type: typeof UPDATE_GAME_STATE;
    payload: GameState
}

export type GameActionTypes = UpdateGameStateAction;
