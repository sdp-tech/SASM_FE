import React from 'react'
import Navibar from '../components/common/Navibar'
import styled from "styled-components";

export default function MyPage() {
  return (
    <Sections>
      <Navibar/>
      <div>MyPage</div>
    </Sections>
  )
}

const Sections = styled.div`
  box-sizing: border-box;
  display: grid;
  position: relative;
  height: 100vh;
  grid-template-rows: 0.15fr 0.85fr;
  grid-template-areas: 
    "navibar"
    "mypage"
  ;
`;