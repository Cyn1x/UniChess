export interface SystemState {
    loggedIn: boolean;
    session: string;
    userName: string;
}

export interface ActivityState {
    isHosting: boolean;
    isJoining: boolean;
    isPlaying: boolean;
}

export const UPDATE_SESSION_STATE = "UPDATE_SESSION_STATE";
export const UPDATE_ACTIVITY_STATE = "UPDATE_ACTIVITY_STATE";

interface UpdateSessionAction {
    type: typeof UPDATE_SESSION_STATE;
    payload: SystemState;
}

interface UpdateActivityAction {
    type: typeof UPDATE_ACTIVITY_STATE;
    payload: ActivityState;
}

export type SystemActionTypes = UpdateSessionAction | UpdateActivityAction;
