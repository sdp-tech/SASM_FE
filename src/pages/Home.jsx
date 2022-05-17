import React from 'react';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import styled from 'styled-components';
import img from '../assets/img/img.jpg'

// import HomeScreen from '../assets/img/HomeScreen.jpg'

const IntroImg = styled.img`
  width: 100%;
  height: auto;
  display: block;
  position: absolute;
  top : 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const SASM = styled.div`
  position: absolute;
  margin-left : 250px;
  margin-top : 350px;
  width : 600px;
  height : 300px;
  // border:1px solid RED;
`;

const Tittle = styled.div`
  font-family: 'Crimson Text';
  color : white;
  font-size : 120px;
  // border:1px solid RED;
`;

const Content = styled.div`
  position: absolute;
  font-family: 'Crimson Text';
  color : white;
  font-size : 30px;
`;

const Wrapper = styled.div`
  position: absolute;
  margin: 0 auto;
  top : 25%;
  left: 50%;
  transform: translate(-50%, -50%);
  width : 1000px;
  height : 50px;
  display:flex;
  flex-direction: row;
  justify-content: center;
  align-items:center;
  // border:1px solid RED;
`;

const NavBtn = styled.button`
  background:none;
  padding :20px;
  margin-right:50px;
  display:flex;
  flex-direction: row;
  justify-content: flex-start;
  border:none;
`;

const StyledLink = styled(Link)`
	box-sizing: border-box;
	display: block;
	margin: 0 auto;
	text-align: center;
  font-style: normal;
  font-weight: 400;
  font-size: 35px;
  line-height: 35px;
  color:black;
  text-decoration:none; 
`;

export default function Home(){
  return(
    <>
      <IntroImg src={img}></IntroImg>
      <SASM>
        <Tittle>SASM</Tittle>
      
        <Content>SASM은 지속가능한 공간을 큐레이팅하여,
          한국 도시의 지속가능한 발전을 돕습니다. 
        </Content> 
      </SASM>

      <Wrapper>
      {/* hover 추가하기 */}
        <NavBtn>
          <StyledLink to="/map">MAP</StyledLink>
        </NavBtn>

        <NavBtn> 
        <StyledLink to="/story">STORY</StyledLink>
        </NavBtn>

        <NavBtn>
        <StyledLink to="/">ABOUT</StyledLink>
        </NavBtn>
  
        <NavBtn>
        <StyledLink to="/">MY PICK</StyledLink>
        </NavBtn>

      {/* <NavBtn> 
        <StyledLink to="/auth">Sign in</StyledLink> 
      </NavBtn>  */}
      
      </Wrapper>
    </>
  )
};
