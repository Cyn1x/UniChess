import React from 'react';
import { connect } from 'react-redux';
import { Dispatch, Action } from 'redux';
import { AppState } from '../../utilities/store';
import { ActivityState } from '../../utilities/store/system/types';
import { GameState } from '../../utilities/store/game/types';
import { IGameDispatchProps, IGame } from './types';
import { updateActivityState } from '../../utilities/store/system/actions';
import { sendGame } from '../../utilities/store/game/actions';

import { Canvas } from 'unichess-chess-engine';

class Game extends React.Component<IGame> {

    render() {
        return (
            <Canvas
                currentPlayer={this.props.player}
                nextFenString={this.props.game.nextFenString}
                nextPlayerTurn={this.props.game.nextPlayerTurn}
                movePieceFrom={this.props.game.movePieceFrom}
                movePieceTo={this.props.game.movePieceTo}
            />
        );
    }
}

const mapStateToProps = (state: AppState) => ({
    activity: state.activityState,
    game: state.gameState
});

const mapDispatchToProps = (dispatch: Dispatch<Action>): IGameDispatchProps => ({
    updateActivityState: (action: ActivityState) => dispatch(updateActivityState(action)),
    sendGame: (game: GameState) => dispatch(sendGame(game))
});

export default connect(mapStateToProps, mapDispatchToProps)(Game);
