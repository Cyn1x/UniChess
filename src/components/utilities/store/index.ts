import { createStore, combineReducers } from "redux";
import { systemReducer } from "./system/reducers";
import { chatReducer } from "../../dashboard/chat/reducers";

export const rootReducer = combineReducers({
    system: systemReducer,
    chat: chatReducer
})

export type AppState = ReturnType<typeof rootReducer>

export const store = createStore(rootReducer);
