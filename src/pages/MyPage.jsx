import React from "react";
import Navibar from "../components/common/Navibar";
import styled from "styled-components";
import Mypage from "../components/mypage/Mypage";

export default function MyPage() {
  return (
    <Sections>
      <Navibar />
      {/* <div>MyPage</div> */}
      <Mypage />
    </Sections>
  );
}

const Sections = styled.div`
  box-sizing: border-box;
  display: grid;
  position: relative;
  height: 100vh;
  grid-template-rows: 0.13fr 0.87fr;
  grid-template-areas:
    "navibar"
    "mypage";
`;
