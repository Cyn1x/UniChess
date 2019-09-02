import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from 'redux-thunk';
import { systemReducer } from "./system/reducers";
import { chatReducer } from "../../dashboard/chat/reducers";

export const rootReducer = combineReducers({
    system: systemReducer,
    chat: chatReducer
})

export type AppState = ReturnType<typeof rootReducer>

export const store = createStore(rootReducer, applyMiddleware(thunk));
