import React from 'react';
import { connect } from 'react-redux';
import { Dispatch, Action } from 'redux';
import { AppState } from '../../utilities/store';

import { SystemState, ActivityState } from '../../utilities/store/system/types';
import { LobbyState, RoomInfo } from '../../utilities/store/lobby/types';
import { GameState } from '../../utilities/store/game/types';
import { updateActivityState } from '../../utilities/store/system/actions';
import { sendRoom } from '../../utilities/store/lobby/actions';

import ChatWidget from '../chat/ChatWidget';
import GameInfo from './GameInfo';
import Game from './Game';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

interface IPlayAreaDispatchProps {
    updateActivityState: (room: ActivityState) => void;
    createRoom: (room: RoomInfo) => void;
}

interface IPlayArea {
    updateActivityState: (room: ActivityState) => void;
    createRoom: any;
    activity: ActivityState;
    system: SystemState;
    lobby: LobbyState;
    game: GameState;
    location: Location;
    gameRooms: RoomInfo[];
}

class PlayArea extends React.Component<IPlayArea> {
    state = {
        player: "",
        roomId: "",
    }

    componentDidMount() {
        this.setState(
            {
                roomId: this.props.location.search.split("=")[1]
            },
        this.configureLobby
        );
    }
      
    componentWillUnmount() {}

    configureLobby() {
        if (this.props.activity.isJoining) {
            this.joinGame();
            return;
        }
        this.hostGame();
    }
    
    hostGame() {
        if (!this.props.activity.isHosting && !this.props.activity.isJoining) {
            const currentTime = new Date();
            this.props.createRoom({
                gameId: this.state.roomId,
                whitePlayer: this.props.system.userName,
                timeCreated: currentTime
            })
            this.props.updateActivityState({
                isHosting: true,
                isJoining: false,
                isPlaying: true
            })
            this.setState({ player: "Player 1" })
        }
        else if (this.props.activity.isHosting) {
            this.setState({ player: "Player 1" });
        }
    }

    joinGame() {
        this.props.lobby.gameRooms.forEach(room => {
            if (room.gameId === this.state.roomId) {
                
            }
        })
        this.setState({ player: "Player 2" })
    }

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
                        <Game player={this.state.player} />
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
    createRoom: (room: RoomInfo) => dispatch(sendRoom(room))
});

export default connect(mapStateToProps, mapDispatchToProps)(PlayArea);
