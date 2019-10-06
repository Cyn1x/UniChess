import { UPDATE_SESSION_STATE, UPDATE_ACTIVITY_STATE, SystemState, ActivityState } from "./types";

export function updateSessionState(newSession: SystemState) {
    return {
        type: UPDATE_SESSION_STATE,
        payload: newSession
    };
}

export function updateActivityState(newActivity: ActivityState) {
    return {
        type: UPDATE_ACTIVITY_STATE,
        payload: newActivity
    };
}
