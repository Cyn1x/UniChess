import React from 'react';
import { connect } from "react-redux";
import { Dispatch, Action } from 'redux';
import { AppState } from '../../utilities/store';
import { SideAccordion } from './SideAccordion';
import { SystemState } from '../../utilities/store/system/types';
import { LobbyState } from '../../utilities/store/lobby/types';

import CurrentGames from './CurrentGames';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

interface ILobbyDispatchProps {

}

interface ILobby {
    system: SystemState;
    lobbyState: LobbyState;
    match: any; // TODO: type
}

class Lobby extends React.Component<ILobby> {

    componentDidMount() {}

    componentWillUnmount() {}

    render() {
        return (
            <Container fluid>
                <Row>
                    <Col>
                        <SideAccordion />
                    </Col>
                    <Col>

                    </Col>
                    <Col>
                        <CurrentGames gameRooms={this.props.lobbyState.gameRooms} />
                    </Col>
                </Row>
            </Container>
        )
    }
}

const mapStateToProps = (state: AppState) => ({
    system: state.systemState,
    lobbyState: state.lobbyState
});

const mapDispatchToProps = (dispatch: Dispatch<Action>): ILobbyDispatchProps => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(Lobby);
