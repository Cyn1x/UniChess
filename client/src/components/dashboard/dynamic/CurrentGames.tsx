import React from "react";
import { connect } from "react-redux";
import { AppState } from "../../utilities/store";
import { LinkContainer } from 'react-router-bootstrap'
import { SystemState } from "../../utilities/store/system/types";
import { RoomInfo } from "../../utilities/store/game/types";

import Button from 'react-bootstrap/Button';
import styled from "styled-components";

const Styles = styled.div`
    div {
        background-color: #FFF;
        opacity: 0.9;

        padding: 5%;
    }
`;

interface ICurrentGames {
    system: SystemState;
    gameRooms: RoomInfo[];
}

function CurrentGames(props: ICurrentGames) {
    return (
        <Styles>
            <div>
                <h5>Game Rooms</h5>
                {props.gameRooms.map(room => (
                    <LinkContainer to={`/dashboard/play?gameId=${room.link}`} key={room.time} >
                        <Button variant="primary" onClick={() => {
                            props.system.joining = true;
                        }}>{room.link}</Button>
                    </LinkContainer>
                ))}
            </div>
            
        </Styles>
    );
};

const mapStateToProps = (state: AppState) => ({
    system: state.systemState
});

export default connect(mapStateToProps)(CurrentGames);
