import {
    UPDATE_SESSION_STATE,
    UPDATE_ACTIVITY_STATE,
    SystemState,
    SystemActionTypes,
    ActivityState
} from './types';

const initialSessionState: SystemState = {
    loggedIn: false,
    session: "",
    userName: ""
};

const initialActivityState: ActivityState = {
    isHosting: false,
    isJoining: false,
    isPlaying: false
}

export function systemReducer(
    state = initialSessionState,
    action: SystemActionTypes
): SystemState {
    switch (action.type) {
        case UPDATE_SESSION_STATE: {
            return {
                ...state,
                ...action.payload
            };
        }
        default:
            return state;
    }
}

export function activityReducer(
    state = initialActivityState,
    action: SystemActionTypes
):  ActivityState {
    switch (action.type) {
        case UPDATE_ACTIVITY_STATE: {
            return {
                ...state,
                ...action.payload
            }
        }
        default:
            return state;
    }
}
