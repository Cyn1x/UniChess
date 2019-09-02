import React from "react";

import styled from "styled-components";

const Styles = styled.section`
    height: 100%;
    background-color: #FFF;
`;

interface IGameInfo {
    
}

export class GameInfo extends React.Component {
    state = {
        userName: ""
    }

    componentDidMount() {}

    render() {
        // TODO: Don't render until state has been updated
        return (
            <Styles>

            </Styles>
        );
    }
}
