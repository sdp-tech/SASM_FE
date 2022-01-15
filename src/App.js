import React from 'react';
import { createGlobalStyle } from 'styled-components';
import Navibar from './Component/Navibar';
import List from './Component/List.js/List';

const GlobalStyle = createGlobalStyle`
  body {
    background: #e9ecef;
  }
`;

function App() {
  return (
    <>
      <GlobalStyle />
      <Navibar/>
      <List/>
    </>
  );
}

export default App;
