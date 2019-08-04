import { createGlobalStyle } from 'styled-components';
import backgroundImage from './assets/chessPieces.jpg'

export const GlobalStyle = createGlobalStyle`
    body {
        background-image: url(${backgroundImage});
        background-position: center;
        background-attachment: fixed;
        background-size: cover;
        background-repeat: no-repeat;
    }
`;
