import { createGlobalStyle } from 'styled-components'

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
    background-color: ${({ theme }) => theme.background};
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

  @media only screen and (max-width: 480px) {
    .Toastify__toast-container {
      width: 70vw;
      height: 5px;
      font-size: 13px;
      padding: 0;
      left: calc(50% - 4.8rem);
      margin: 0;
    }

    .Toastify__toast {
      min-height: 5px;
    }
    
  }
`
