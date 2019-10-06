import React from "react";

import styled from "styled-components";

const Styles = styled.section`
    height: 100%;
    background-color: #FFF;
`;

interface IGameInfo {
    
}

export class GameInfo extends React.Component<IGameInfo> {
    state = {
        userName: ""
    }

    componentDidMount() {}

    render() {
        return (
            <Styles>

            </Styles>
        );
    }
}
