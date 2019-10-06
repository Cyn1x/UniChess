import { createStore, combineReducers, applyMiddleware } from "redux";
import { SocketMiddleware } from "./middleware/socket-middleware";
import { systemReducer } from "./system/reducers";
import { socketReducer } from "./socket/reducers";
import { lobbyStateReducer, gameStateReducer } from "./game/reducers";
import { messageReducer } from "./chat/reducers";

export const rootReducer = combineReducers({
    systemState: systemReducer,
    socketState: socketReducer,
    lobbyState: lobbyStateReducer,
    gameState: gameStateReducer,
    messageState: messageReducer
})

export type AppState = ReturnType<typeof rootReducer>

export const store = createStore(rootReducer, applyMiddleware(SocketMiddleware));
