import { createGlobalStyle } from 'styled-components';
import backgroundImage from './assets/img/site/chessPieces.jpg'

export const GlobalStyle = createGlobalStyle`
    $test: 000;

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
        
        background-image: linear-gradient(0deg,rgba(255, 255, 255, 0.1),rgba(0, 0, 0, 0.1)),url(${backgroundImage});
        background-position: center;
        background-attachment: fixed;
        background-size: cover;
        background-repeat: no-repeat;
    }
`;
