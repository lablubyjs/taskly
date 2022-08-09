import {createGlobalStyle} from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    width: 100vw;
  }

  body {
    background-color: ${({theme}) => theme.background};
    font-family: 'Nunito', sans-serif;
  }

  main {
    width: 100vw;
    height: 100vh;
  }

  button, a {
    cursor: pointer;
    font-family: inherit;
  }

  @media (max-width: 1080px) {
    html {
        font-size: 87.5%;
    }
  }
`;
