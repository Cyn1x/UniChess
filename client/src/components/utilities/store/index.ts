import { createStore, combineReducers, applyMiddleware } from "redux";
import { SocketMiddleware } from "./middleware/socket-middleware";
import { systemReducer } from "./system/reducers";
import { socketReducer } from "./socket/reducers"
import { messageReducer } from "./chat/reducers";

export const rootReducer = combineReducers({
    systemState: systemReducer,
    socketState: socketReducer,
    messageState: messageReducer
})

export type AppState = ReturnType<typeof rootReducer>

export const store = createStore(rootReducer, applyMiddleware(SocketMiddleware));
