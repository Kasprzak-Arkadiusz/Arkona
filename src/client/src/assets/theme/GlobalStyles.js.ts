import {createGlobalStyle} from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body {
    width: auto;
    height: auto;
    margin: 0;
    padding: 0;
    text-align: center;
  }
  
  header {
    margin: auto;
  }
  
  span {
    font-size: 14px;
    font-family: 'Domine', serif;
    font-style: normal;
    font-weight: 400;

    color: #fafafa;
  }
`;

export default GlobalStyle;