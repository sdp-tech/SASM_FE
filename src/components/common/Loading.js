import React from "react";
import styled from "styled-components";
import Spinner from "../../assets/img/Spinner.gif";
const Background = styled.div`
  position: absolute;
  width: 50vw;
  height: 50vh;
  top: 30%;
  left: 30%;
  // background: #ffffffb7;
  background: none;
  z-index: 999;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const LoadingText = styled.div`
  font: 1rem "Noto Sans KR";
  text-align: center;
`;

const Loading = () => {
  return (
    <Background>
      {/* <LoadingText>잠시만 기다려 주세요.</LoadingText> */}
       <img src={Spinner} alt="로딩중" width="5%" />
    </Background>
  );
};
export default Loading;
