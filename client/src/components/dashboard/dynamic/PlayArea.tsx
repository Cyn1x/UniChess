import React from 'react';
import { connect } from "react-redux";
import { Dispatch, Action } from 'redux';
import { AppState } from "../../utilities/store";
import { SystemState } from '../../utilities/store/system/types';
import { LobbyState, RoomInfo } from '../../utilities/store/game/types';
import { createRoom } from "../../utilities/store/socket/actions";
import { ChatWidget } from '../chat/ChatWidget';
import { GameInfo } from '../../game/GameInfo';

import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Canvas from '../../game/Canvas';

interface IPlayAreaDispatchProps {
    createRoom: (room: RoomInfo) => void;
    joinRoom: (room: RoomInfo) => void;
}

interface IPlayArea {
    createRoom: any; // TODO: types
    joinRoom: any; // TODO: types
    system: SystemState;
    lobby: LobbyState;
    location: Location;
}

class PlayArea extends React.Component<IPlayArea> {
    state = {
        player: ""
    }

    componentDidMount() {
        if (this.props.system.joining) {
            if (this.props.system.hosting) {
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
            if (!this.props.system.hosting && !this.props.system.joining) {
                const currentTime = new Date();
                this.props.createRoom({
                    host: this.props.system.userName,
                    link: this.props.location.search.split("=")[1],
                    time: currentTime
                })
                this.props.system.hosting = true;
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
    lobby: state.lobbyState,
    game: state.gameState
});

const mapDispatchToProps = (dispatch: Dispatch<Action>): IPlayAreaDispatchProps => ({
    createRoom: (room: RoomInfo) => dispatch(createRoom(room)),
    joinRoom: (room: RoomInfo) => dispatch(createRoom(room))
});

export default connect(mapStateToProps, mapDispatchToProps)(PlayArea);
