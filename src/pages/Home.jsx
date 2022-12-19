import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Button from "@mui/material/Button";
import logo from "../assets/img/sasm_logo.png";
import picture from "../assets/img/Main/Picture.png";
import background1 from "../assets/img/Main/Background1.svg";
import background2 from "../assets/img/Main/Background2.svg";
import background3 from "../assets/img/Main/Background3.svg";
import mapimage from "../assets/img/Main/MapImage.svg";
import Navibar from "../components/common/Navibar";
import { Pc, Tablet, Mobile } from "../device"
const ImageBox = styled.div`
  
`
const IntroImg = styled.img`
  width: 100vw;
  height: auto;
  @media screen and (max-width: 768px) {
    height: 30vw;
  }
`;
const HomeImg = styled.img`
  width: 100vw;
  height: auto;
`;

//SASM
const SASM = styled.div`
  width: 60%;
  height: 550px;
  margin: 5% auto;
  color: black;
  display: block;
  @media screen and (max-width: 768px) {
    height: 300px;
  } 
`;
const SubTitle = styled.div`
  font-size: 2vw;
  font-weight: 600;
  @media screen and (min-width: 769px) and (max-width: 1023px) {
    font-size: 3vw;
  } 
  @media screen and (max-width: 768px) {
    font-size: 4vw;
  }
`
const TitleBox = styled.div`
  display: flex;
`
const Tittle = styled.div`
  box-sizing: border-box;
  color: black;
  font-size: 7vw;
  font-weight: 700;
  @media screen and (min-width: 769px) and (max-width: 1023px) {
    font-size: 9vw;
  } 
  @media screen and (max-width: 768px) {
    font-size: 10.5vw;
  } 
`;

const Content = styled.div`
  box-sizing: border-box;
  position: absolute;
  font-size: 1.5vw;
  @media screen and (min-width: 769px) and (max-width: 1023px) {
    font-size: 3vw;
  } 
  @media screen and (max-width: 768px) {
    font-size: 3.5vw;
  } 
`;
//Map
const Map = styled.div`
  
`
const Background2Box = styled.div`
  float: right;
  position: relative;
  z-index: 2;
  bottom: 80px;
`
const Background1Box = styled.div`
  position: relative;
  bottom: 65vw;
  z-index: 1;
  @media screen and (max-width: 768px) {
    bottom: 140vw;
  }
  @media screen and (min-width: 769px) and (max-width: 1023px) {
    bottom: 120vw;
  }
`

const MapSubtitle = styled.div`
  font-size: 3.5vw;
  font-weight: 700;
  text-align: center;
  margin-bottom: 3%;
  @media screen and (min-width: 769px) and (max-width: 1023px) {
    font-size: 3vw;
  } 
  @media screen and (max-width: 768px) {
    font-size: 4vw;
  }
`
const MapTitle = styled.div`
  font-size: 5vw;
  font-weight: 700;
  text-align: center;
  letter-spacing: 0.1em;
  @media screen and (min-width: 769px) and (max-width: 1023px) {
    font-size: 7vw;
  } 
  @media screen and (max-width: 768px) {
    font-size: 9vw;
  } 
`
const MapImage = styled.div`
  position: relative;
  z-index: 3;
  // top: 25vh;
  left: 5vw;
  width: 95vw;
  @media screen and (max-width: 768px) {
    bottom: 110vw;
    width: 130%;
    height: auto;
  }
  @media screen and (min-width: 769px) and (max-width: 1023px) {
    bottom: 80vw;
    width: 120%;
    height: auto;
  }
`
const MapImageBox = styled.img`
  // box-shadow: 0px 12px 32px 4px rgba(0, 0, 0, 0.2);
  left: 3%;
  width: 50%;
  height: auto;
`
const MapWrite = styled.div`
`
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
//Story
const Story = styled.div`

`
const Background3Box = styled.div`
  position: relative;
  float: right;
  bottom: 60vw;
  @media screen and (max-width: 768px) {
    bottom: 140vw;
  }
  @media screen and (min-width: 769px) and (max-width: 1023px) {
    bottom: 120vw;
  }
`
const StorySubtitle = styled.div`
  font-size: 3.5vw;
  font-weight: 700;
  margin-bottom: 3%;
  margin-left: 5%;
  @media screen and (min-width: 769px) and (max-width: 1023px) {
    position: relative;
    font-size: 3vw;
    bottom: 35vw;
  } 
  @media screen and (max-width: 768px) {
    position: relative;
    font-size: 4vw;
    bottom: 50vw;
  }
`
const StoryTitle = styled.div`
  font-size: 5vw;
  font-weight: 700;
  letter-spacing: 0.1em;
  margin-left: 5%;
  @media screen and (min-width: 769px) and (max-width: 1023px) {
    position: relative;
    font-size: 7vw;
    bottom: 35vw;
  } 
  @media screen and (max-width: 768px) {
    position: relative;
    font-size: 9vw;
    bottom: 50vw;
  } 
`
const StoryExample = styled.div`
  width: 90vw;
  height: 600px;
  background: rgba(255, 255, 255, 0.8);
  box-shadow: 0px 4px 7px rgba(0, 0, 0, 0.25);
  border-radius: 54px;
  border: 1px solid rgba(0, 0, 0, 0.25);

`
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
  // position: absolute;
  height: 15%;
  width: 15%;
  margin-left: 10%;
  margin-top: 1%;

`;
const Logo = styled.img`
  display: block;
  height: 100%;
  width: 100%;
  cursor: pointer;
  display: flex;
`;
//
export default function Home() {
  return (
    <>

      <ImageBox>
        <IntroImg src={picture}></IntroImg>
      </ImageBox>
      <SASM>
        <SubTitle>Sustainable Act Space Map</SubTitle>
        <TitleBox>
          <Tittle>SASM</Tittle>
          <LogoBox>
            <Logo
              src={logo}
            // onClick={() => PageRedirection(navigate, "SASM")}
            ></Logo>
          </LogoBox>
        </TitleBox>
        <Content>
          SASM은 지속가능한 공간을 큐레이팅하여, <br /> 한국 도시의 지속가능한
          발전을 돕습니다.
        </Content>
      </SASM>
      <Map>
        <MapSubtitle>Subtitle about map</MapSubtitle>
        <MapTitle>MAP</MapTitle>
        <Background2Box>
          <Pc><img src={background2}></img></Pc>
          <Tablet><img src={background2}></img></Tablet>
          <Mobile><HomeImg src={background2}></HomeImg></Mobile>
        </Background2Box>
        <MapImage>
          <MapImageBox src={mapimage}></MapImageBox>
          <MapWrite>방문하고 싶은 장소를 검색하세요. <br />
            식당, 복합문화공간 등 장소 유형을 선택하거나 <br />
            지역이나 장소 이름을 검색해도 좋습니다.</MapWrite>
        </MapImage>
        <Background1Box>
          <Pc><img src={background1}></img></Pc>
          <Tablet><img src={background1}></img></Tablet>
          <Mobile><HomeImg src={background1}></HomeImg></Mobile>
        </Background1Box>
      </Map>
      <Story>
        <StorySubtitle>Subtitle about Story</StorySubtitle>
        <StoryTitle>Story</StoryTitle>
        <Background3Box>
          <Pc><img src={background3}></img></Pc>
          <Tablet><HomeImg src={background3}></HomeImg></Tablet>
          <Mobile><HomeImg src={background3}></HomeImg></Mobile>
        </Background3Box>
        <StoryExample>
        </StoryExample>
      </Story>


      {/* <Wrapper>
        {/* hover 추가하기 */}
      {/* <NavBtn>
        <StyledLink to="/map">MAP</StyledLink>
      </NavBtn>
      <NavBtn>
        <StyledLink to="/story">STORY</StyledLink>
      </NavBtn>
      <NavBtn>
        <StyledLink to="/mypage">MY PAGE</StyledLink>
      </NavBtn> */}

      {/* <NavBtn>
          <StyledLink to="/auth">Sign in</StyledLink>
        </NavBtn> */}
      {/* </Wrapper> */}
    </>
  );
}
