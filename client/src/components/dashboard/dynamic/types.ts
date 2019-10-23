import { ActivityState } from "../../utilities/store/system/types";
import { GameState } from "../../utilities/store/game/types";

export interface IGameDispatchProps {
    updateActivityState: (room: ActivityState) => void;
    sendGame: (game: GameState) => void;
}

export interface IGame {
    updateActivityState: (room: ActivityState) => void;
    activity: ActivityState;
    game: GameState;
    player: string;
}
