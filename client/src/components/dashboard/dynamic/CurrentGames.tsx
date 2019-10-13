import React from 'react';
import { connect } from 'react-redux';
import { Dispatch, Action } from 'redux';
import { AppState } from '../../utilities/store';
import { LinkContainer } from 'react-router-bootstrap';

import { ActivityState } from '../../utilities/store/system/types';
import { RoomInfo } from '../../utilities/store/lobby/types';
import { updateActivityState } from '../../utilities/store/system/actions';

import Button from 'react-bootstrap/Button';
import styled from 'styled-components';

const Styles = styled.div`
    div {
        background-color: #FFF;
        opacity: 0.9;

        padding: 5%;
    }
`;

interface ICurrentGamesDispatchProps {
    updateActivityState: (room: ActivityState) => void;
}

interface ICurrentGames {
    updateActivityState: (room: ActivityState) => void;
    activity: ActivityState;
    gameRooms: RoomInfo[];
}

function CurrentGames(props: ICurrentGames) {
    return (
        <Styles>
            <div>
                <h5>Game Rooms</h5>
                {props.gameRooms.map(room => (
                    <LinkContainer to={`/dashboard/play?gameId=${room.gameId}`} key={room.timeCreated} >
                        <Button variant="primary" onClick={() => {
                            if (!props.activity.isHosting) {
                                props.updateActivityState({
                                    isHosting: false,
                                    isJoining: true,
                                    isPlaying: true
                                });
                            }
                        }}>{room.gameId}</Button>
                    </LinkContainer>
                ))}
            </div>
        </Styles>
    );
};

const mapStateToProps = (state: AppState) => ({
    activity: state.activityState,
    lobby: state.lobbyState
});

const mapDispatchToProps = (dispatch: Dispatch<Action>): ICurrentGamesDispatchProps => ({
    updateActivityState: (action: ActivityState) => dispatch(updateActivityState(action))
});

export default connect(mapStateToProps, mapDispatchToProps)(CurrentGames);
