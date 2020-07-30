import { createGlobalStyle } from 'styled-components';

import 'react-toastify/dist/ReactToastify.css';

import background from '../assets/images/background.svg';

export default createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Roboto&display=swap');

  * {
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
  }

  body {
    background: #191920 url(${background}) no-repeat center top;
    -webkit-font-smoothing: antialiased;
    align-items: center;
  }

  body, input, button{
    font: 14px Roboto, sans-serif;
  }

  #root {
    max-width: 1020px;

  }

  button {
    cursor: pointer;
  }
`;
