import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Button from "@mui/material/Button";
import img from "../assets/img/img.jpg";
import logo from "../assets/img/sasm_logo.svg";

const IntroImg = styled.img`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  height: 100vh;
  width: 100vw;
`;

const SASM = styled.div`
  box-sizing: border-box;
  position: absolute;
  width: 60%;
  height: 40%;
  margin: 0 auto;
  top: 55%;
  left: 45%;
  transform: translate(-50%, -50%);
`;

const Tittle = styled.div`
  box-sizing: border-box;
  color: white;
  font-size: 7.5vw;
  // font-size: 80px;
`;

const Content = styled.div`
  box-sizing: border-box;
  position: absolute;
  // font-family: 'Crimson Text';
  color: white;
  font-size: 2vw;
  // font-size: 20px;
`;

const Wrapper = styled.div`
  position: absolute;
  margin: 0 auto;
  top: 26%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 10%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  // border: 1px solid RED;
`;

const NavBtn = styled.button`
  background: none;
  padding: 3vw;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  border: none;
  align-items: center;
  // border: 1px solid yellow;
`;

const StyledLink = styled(Link)`
  box-sizing: border-box;
  display: block;
  margin: 0 auto;
  text-align: center;
  font-style: normal;
  font-weight: 40%;
  // font-size: 3.5vw;
  // font-size: 30px;
  // font-size: 5vw;
  // font-size: 2.8em;
  font-size: 2rem;
  line-height: 35px;
  color: black;
  text-decoration: none;
  // border: 1px solid RED;
`;

// logo
const LogoBox = styled.div`
  box-sizing: border-box;
  position: absolute;
  height: 15%;
  width: 100%;
  margin-top: 3%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  // border: 1px solid RED;
`;
const Logo = styled.img`
  display: block;
  width: auto;
  height: 100%;
  // position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 5%;
  left: 5%;
  // border: 1px solid yellow;
`;
//
export default function Home() {
  return (
    <>
      <IntroImg src={img}></IntroImg>

      <LogoBox>
        <Logo
          src={logo}
          // onClick={() => PageRedirection(navigate, "SASM")}
        ></Logo>
      </LogoBox>

      <SASM>
        <Tittle>SASM</Tittle>

        <Content>
          SASM은 지속가능한 공간을 큐레이팅하여, <br /> 한국 도시의 지속가능한
          발전을 돕습니다.
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
          <StyledLink to="/mypage">MY PAGE</StyledLink>
        </NavBtn>

        {/* <NavBtn>
          <StyledLink to="/auth">Sign in</StyledLink>
        </NavBtn> */}
      </Wrapper>
    </>
  );
}
