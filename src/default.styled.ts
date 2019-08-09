import { createGlobalStyle } from 'styled-components';
import backgroundImage from './assets/img/chessPieces.jpg'

export const GlobalStyle = createGlobalStyle`
    * {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
    }

    html,
    body {
        height: 100%;
    }

    body {
        background-image: url(${backgroundImage});
        background-position: center;
        background-attachment: fixed;
        background-size: cover;
        background-repeat: no-repeat;
    }

    layer {
        background-color: #222;
    }
`;
