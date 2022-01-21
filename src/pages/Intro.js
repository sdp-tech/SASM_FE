import React from 'react';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import styled from 'styled-components';

import img from '../img/space1.jpg'

const IntroImg = styled.img`
  width: 100%;
  height: auto;
  display: block;

  position: absolute;
  top : 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const Wrapper = styled.div`
  position: absolute;
  top : 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: grey;
`;

/*
ISSUE 1
사진 비율에 따라서 화면 페이지 구성을 맞춰서 해줘야 하는건지
어떻게 화면 구성을 맞춰줘야 하는건지 애매한거 같음
일단 Routing만 짜놓고 좀 더 확실한 UI 디자인 나오면
그거에 맞춰서 작업하는 걸로 지금 스타일링 해봐야 의미가 없음
*/
export default function Intro(){
  return(
    <>
      <IntroImg src={img}></IntroImg>
      <Wrapper>
        <div>SASM INTRO Page</div>
        <Button variant="outlined">
          <Link to="/Home">Go to Home</Link>
        </Button>
        <Button>
          <Link to="/Blog">Go to Blog</Link>
        </Button>
      </Wrapper>
    </>
  )
};

/*
ISSUE 2
페이지 전반의 구성과 그리고 그것이 어떤 방식으로 연결되면 좋을지
레퍼런스 페이지들이나 이런 것들을 바탕으로 좀 더 정확하게 알면 좋을 것 같음
리서치팀에서 나온 것들을 종합해서 페이지구조도 자체는 확정이 되야 작업할 수 있겠다
*/