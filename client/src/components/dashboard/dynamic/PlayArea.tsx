import React from 'react';
import { connect } from 'react-redux';
import { Dispatch, Action } from 'redux';
import { AppState } from '../../utilities/store';

import { SystemState, ActivityState } from '../../utilities/store/system/types';
import { LobbyState, RoomInfo } from '../../utilities/store/lobby/types';
import { updateActivityState } from '../../utilities/store/system/actions';
import { sendRoom } from '../../utilities/store/lobby/actions';

import ChatWidget from '../chat/ChatWidget';
import GameInfo from '../../game/GameInfo';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Canvas from '../../game/Canvas';

interface IPlayAreaDispatchProps {
    updateActivityState: (room: ActivityState) => void;
    createRoom: (room: RoomInfo) => void;
    joinRoom: (room: RoomInfo) => void;
}

interface IPlayArea {
    updateActivityState: (room: ActivityState) => void;
    createRoom: any;
    joinRoom: any;
    activity: ActivityState;
    system: SystemState;
    lobby: LobbyState;
    location: Location;
}

class PlayArea extends React.Component<IPlayArea> {
    state = {
        player: ""
    }

    componentDidMount() {
        if (this.props.activity.isJoining) {
            if (this.props.activity.isHosting) {
                this.setState({
                    player: "Player 1"
                })
            } else {
                this.setState({
                    player: "Player 2"
                })
            }
        }
        else {
            if (!this.props.activity.isHosting && !this.props.activity.isJoining) {
                const currentTime = new Date();
                this.props.createRoom({
                    host: this.props.system.userName,
                    link: this.props.location.search.split("=")[1],
                    time: currentTime
                })
                this.props.updateActivityState({
                    isHosting: true,
                    isJoining: false,
                    isPlaying: true
                })
                this.setState({
                    player: "Player 1"
                })
            }
        }
    }

    componentWillUnmount() {}

    render() {
        return this.state.player !== "" ? this.renderCanvas() : (
            <span>Loading game...</span>
        );
    }

    renderCanvas() {
        return (
            <Container fluid>
                <Row>
                    <Col>

                    </Col>
                </Row>
                <Row>
                    <Col>
                        <GameInfo />
                    </Col>
                    <Col>
                        <Canvas player={this.state.player}/>
                    </Col>
                    <Col>
                        <ChatWidget />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        
                    </Col>
                </Row>
            </Container>
        )
    }
}

const mapStateToProps = (state: AppState) => ({
    system: state.systemState,
    activity: state.activityState,
    lobby: state.lobbyState,
    game: state.gameState
});

const mapDispatchToProps = (dispatch: Dispatch<Action>): IPlayAreaDispatchProps => ({
    updateActivityState: (action: ActivityState) => dispatch(updateActivityState(action)),
    createRoom: (room: RoomInfo) => dispatch(sendRoom(room)),
    joinRoom: (room: RoomInfo) => dispatch(sendRoom(room))
});

export default connect(mapStateToProps, mapDispatchToProps)(PlayArea);
