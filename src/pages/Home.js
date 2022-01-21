import React from 'react';
import { createGlobalStyle } from 'styled-components';
import styled from "styled-components";


import Navibar from '../components/Home/Navibar';
import List from '../components/Home/List';
import Map from '../components/Home/Map';

const GlobalStyle = createGlobalStyle`
  body {
    background: #e9ecef;
  }
`;

const TempMap = styled.div`
  height: 100vh;
  width: 100vw;
  position: fixed;
  z-index: 0;
`;

const Color =styled.div`
  height: 100%;
  width: 100%;
  background: #e9ecef;
`;
const Test =styled.div`
  height: 100%;
  width: 100px;
  background: orange;
`;

/*
Idea
홈 페이지의 핵심은 전체 창에 대한 스크롤이 생기지 않게 페이지 구성하는 것
Naver Map 참고하도록 https://map.naver.com/v5/?c=14140229.5770244,4469646.3491519,10,0,0,0,dh
Map 안에서 줌 기능과 스크롤 기능을 하기 때문에 전체 창 고정시켜놓고
Map 전체 창에 띄우고 그 위에 Navibar, List가 얹혀있는 느낌이 되어야 함

++ 현재 Navibar의 구성과 
*/

const Home = () => {
  return (
    <>
    <TempMap/>
    <Navibar/>
    <List/>
    </>
  );
};

export default Home;