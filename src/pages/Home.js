import React from 'react';
import { createGlobalStyle } from 'styled-components';

import Navibar from '../components/Home/Navibar';
import List from '../components/Home/List';
import Maps from '../components/Home/Map';

const GlobalStyle = createGlobalStyle`
  body {
    background: #e9ecef;
  }
`;

const Home = () => {
  return (
    <>
      <GlobalStyle />
      <Navibar/>
      <List/>
      <Maps></Maps>
    </>
  );
};

export default Home;