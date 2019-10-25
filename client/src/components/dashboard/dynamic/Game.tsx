import React from 'react';
import { connect } from 'react-redux';
import { Dispatch, Action } from 'redux';
import { AppState } from '../../utilities/store';
import { ActivityState } from '../../utilities/store/system/types';
import { GameState } from '../../utilities/store/game/types';
import { IGameDispatchProps, IGame } from './types';
import { updateActivityState } from '../../utilities/store/system/actions';
import { sendGame } from '../../utilities/store/game/actions';

import styled from 'styled-components';
import { Canvas } from 'unichess-chess-engine';

const Styles = styled.div`
    canvas {
        display: block;
        border: 1px solid #000;
        margin-left: auto;
        margin-right: auto;
    }
`;

class Game extends React.Component<IGame> {

    updateState = (props: GameState) => {
        this.props.sendGame({
            nextFenString: props.nextFenString,
            nextPlayerTurn: props.nextPlayerTurn,
            movePieceFrom: props.movePieceFrom,
            movePieceTo: props.movePieceTo
        })
    }

    render() {
        return (
            <Styles>
                <Canvas
                    player={this.props.player}
                    game={this.props.game}
                    controller={this.updateState}
                />
            </Styles>
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
