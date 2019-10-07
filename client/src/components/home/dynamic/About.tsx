import React from 'react';

import styled from 'styled-components';

const Styles = styled.div`
    div {
        background-color: #FFF;
        opacity: 0.9;

        padding: 5%;
    }
`;

const About = () => (
    <Styles>
        <div>
            <h3>About</h3>
            <p>UniChess is a Player vs Player (PvP) and Player vs Environment (PvE) chess web app for university students to play in either ranked or unranked matches against other students or an AI controlled opponent.</p>
            <p>Ranked matches will be recorded against the player's total wins or losses, and contribute to the university where that player is currently studying. Unranked matches on the other hand, are just for fun and will not contribute to any leaderboard standings.</p>
            <p>All that is required is a user account to play, nothing more. For any questions or queries, please use the contact form on the home page which can be found on the top navigation bar.</p>
            <p>Features are still currently being added to this service, and the best place to check the current progress is the <a href="https://github.com/Cyn1x/unichess/wiki" target="_blank" rel="noreferrer noopener">wiki</a> on the official GitHub repository.</p>
        </div>
    </Styles>
);

export default About;
