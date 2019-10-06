import { RefObject } from 'react';
import { GameState } from '../utilities/store/game/types';

export interface ICanvasDispatchProps {
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
    sendGame: (game: GameState) => void;
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
