import React from 'react';

import styled from 'styled-components';

const Styles = styled.div`
    div {
        background-color: #FFF;
        opacity: 0.9;

        padding: 5%;
    }
`;

const None = () => (
    <Styles>
        <div>
            <h3>404</h3>
            <p>Page not found.</p>
        </div>
    </Styles>
)

export default None;
