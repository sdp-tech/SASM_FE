import React from 'react';
import { Link } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';

import Navibar from '../components/Home/Navi';
import List from '../components/Home/List';
// import Maps from '../components/Home/Maps';

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
      {/* <Maps></Maps> */}
    </>
  );
};

export default Home;