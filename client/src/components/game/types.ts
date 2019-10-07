import { RefObject } from 'react';

import { ActivityState } from '../utilities/store/system/types';
import { GameState } from '../utilities/store/game/types';

export interface ICanvasDispatchProps {
    updateActivityState: (room: ActivityState) => void;
    sendGame: (game: GameState) => void;
}

export interface IState {
    canvas: any;
    screen: {
        width: number;
        height: number;
        ratio: number;
    },
}

export interface ICanvas {
    updateActivityState: (room: ActivityState) => void;
    sendGame: (game: GameState) => void;
    activity: ActivityState;
    game: GameState;
    canvas?: RefObject<HTMLCanvasElement>,
    screen?: {
        width: number;
        height: number;
        ratio: number;
    },
    player: string;
}

export interface ClickedSquare {
    sx: number,
    sy: number,
    sw: number,
    sh: number
}
