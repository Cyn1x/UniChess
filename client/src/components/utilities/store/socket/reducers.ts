import { CONNECTION_CHANGED } from './types';

const initialSocketState = {
    connected: false,
    port: '8080'
};

export function socketReducer(
    state = initialSocketState,
    action: { type: string, port: string, connected: boolean }) {
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
