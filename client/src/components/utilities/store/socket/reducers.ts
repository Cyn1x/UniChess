import { CONNECTION_CHANGED } from './actions';

// TODO: Implement type definitions
const initialState = {
    connected: false,
    port: '8080'
};

// TODO: Implement type definitions
export function socketReducer(state = initialState, action: { type: string, port: string, connected: boolean }) {
    let reduced;
    switch (action.type) {
        case CONNECTION_CHANGED:
            reduced = Object.assign({}, state, {
                connected: action.connected,
                isError: false
            });
            break;
        default:
            reduced = state;
    }
    return reduced;
}
