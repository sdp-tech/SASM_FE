import React from "react";
import styled from "styled-components";
import picture from "../assets/img/Main/LandingPage.png";
import map from "../assets/img/Main/map_image.png";
import map_category from "../assets/img/Main/map_component_img.png";
import background_green from "../assets/img/Main/BackgroundGreen.png";
import { Pc, Tablet, Mobile } from "../device"

const IntroImg = styled.img`
  float: right;
  position: absolute;
  left: 62%;
  @media screen and (max-width: 768px) {
    width: 50%;
    left: 50%;
  } 
  @media screen and (min-width: 769px) and (max-width: 1023px) {
    width: 50%;
  } 
`;

//SASM
const SASM = styled.div`
  width: 60%;
  height: 550px;
  margin-left: 10%;
  margin-top: 10%;
  color: black;
  display: block;
  @media screen and (max-width: 768px) {
    height: 180px;
    width: 30%;
  } 
`;
const SASMDescription = styled.div`
  display: flex;
  @media screen and (max-width: 768px) {
    width: 63%;
  } 
`
const SubLogo = styled.div`
  margin-left: 5%;
  @media screen and (min-width: 769px) and (max-width: 1023px) {
    font-size: 2vw;
  } 
  @media screen and (max-width: 768px) {
    font-size: 2vw;
  }
`;
const SubTitle = styled.div`
  margin-left: 10%;
  font-size: 1.5vw;
  @media screen and (min-width: 769px) and (max-width: 1023px) {
    margin-left: 10%;
    font-size: 2vw;
    width: 30%;
  } 
  @media screen and (max-width: 768px) {
    font-size: 2vw;
  }
`
const TitleBox = styled.div`
  display: flex;
  margin-bottom : 7%;
`
const Tittle = styled.div`
  box-sizing: border-box;
  color: black;
  font-size: 10vw;
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
  font-size: 2vw;
  @media screen and (min-width: 769px) and (max-width: 1023px) {
    font-size: 3vw;
  } 
  @media screen and (max-width: 768px) {
    font-size: 1.5vw;
  } 
`;
const ContentBox = styled.div`
  margin-top: 30vh;
  margin-left: 5vw;
  font-size: 2vw;
  @media screen and (min-width: 769px) and (max-width: 1023px) {
    font-size: 3vw;
  } 
  @media screen and (max-width: 768px) {
    margin-top: 10vh;
    font-size: 3.5vw;
  } 
`
//Map
const Map = styled.div`
  margin-top: 2.5vw;
  height: 5vw;
  font-size: 1.5vw;
  border-bottom:1px solid rgba(0, 0, 0, .5);
  @media screen and (min-width: 769px) and (max-width: 1023px) {
    font-size: 3vw;
  } 
  @media screen and (max-width: 768px) {
    font-size: 4vw;
    height: 8vw;
  }
`
const MapBox = styled.div`
  padding-top: auto;
  padding-bottom: auto;
  line-height: 3vw;
  text-align: center;
  margin-left: 20%;
  width: 15%;
  height: 3vw;
  background: linear-gradient(102.78deg, rgba(255, 255, 255, 0.7) 4.48%, rgba(255, 255, 255, 0) 90.51%), #3AE894;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 75px;
  @media screen and (max-width: 768px) {
    width: 20%;
    height: 5vw;
    line-height: 5vw;
  } 
  @media screen and (min-width: 769px) and (max-width: 1023px) {
    width: 20%;
  } 
`
const MapDescrip = styled.div`
  margin-left: 2vw;
  @media screen and (max-width: 768px) {
    margin-left: 4vw;
    font-size: 1vw;
  } 
  @media screen and (min-width: 769px) and (max-width: 1023px) {
    width: 50%;
  } 
`
const MapWrapper = styled.div`
  display: flex;
  height: 4vw;
  line-height: 4vw;
  @media screen and (max-width: 768px) {
    height: 6vw;
    line-height:6vw;
  } 
  @media screen and (min-width: 769px) and (max-width: 1023px) {
    width: 50%;
  } 
`
const MyPickBox = styled.div`
  padding-top: auto;
  padding-bottom: auto;
  line-height: 3vw;
  text-align: center;
  margin-left: 20%;
  width: 15%;
  height: 3vw;
  background : linear-gradient(102.78deg, rgba(255, 255, 255, 0.7) 4.48%, rgba(255, 255, 255, 0) 90.51%), #FFE9D0;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 75px;
  @media screen and (max-width: 768px) {
    width: 20%;
    height: 5vw;
    line-height: 5vw;
  } 
  @media screen and (min-width: 769px) and (max-width: 1023px) {
    width: 20%;
  } 
`

const MapSubtitle = styled.div`
  text-align: center;
  font-size: 1.5vw;
  border-right: 4px solid #FFFFFF;
  @media screen and (min-width: 769px) and (max-width: 1023px) {
    font-size: 3vw;
  } 
  @media screen and (max-width: 768px) {
    font-size: 4vw;
  }
  width: 20%;
  // height: 30%;
`
const MapTitle = styled.div`
  color: #FFFFFF;
  background-image: url(${background_green});
  width: 100%;
  height: auto;
  background-size: 100% 100%;
`
const MapImage = styled.img`
  // width: 80%;
  @media screen and (max-width: 768px) {
    bottom: 110vw;
    height: auto;
  }
  @media screen and (min-width: 769px) and (max-width: 1023px) {
    bottom: 80vw;
    height: auto;
  }
`
const CategoryImage = styled.img`
  @media screen and (max-width: 768px) {
      bottom: 110vw;
      height: auto;
    }
    @media screen and (min-width: 769px) and (max-width: 1023px) {
      bottom: 80vw;
      height: auto;
    }
`

const MapWrite = styled.div`
  font-size: 1.5vw;
`

const StoryWrapper = styled.div`
  margin-left: 8%;
  display: flex;
  height: 4vw;
  line-height: 4vw;
  @media screen and (max-width: 768px) {
    height: 6vw;
    line-height:6vw;
  } 
  @media screen and (min-width: 769px) and (max-width: 1023px) {
    width: 50%;
  } 
`
const StoryBox = styled.div`
  padding-top: auto;
  padding-bottom: auto;
  line-height: 3vw;
  text-align: center;
  margin-left: 20%;
  width: 15%;
  height: 3vw;
  background: linear-gradient(102.78deg, rgba(255, 255, 255, 0.7) 4.48%, rgba(255, 255, 255, 0) 90.51%), #01A0FC;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 75px;
  @media screen and (max-width: 768px) {
    width: 20%;
    height: 5vw;
    line-height: 5vw;
  } 
  @media screen and (min-width: 769px) and (max-width: 1023px) {
    width: 20%;
  } 
`
//
export default function Home() {
  return (
    <>
      <IntroImg src={picture}></IntroImg>
      <SASM>
        <TitleBox>
          <Tittle>SASM</Tittle>
        </TitleBox>
        <Content>
          SASM은 지속가능한 공간을 큐레이팅하여, <br />한국 도시의 지속가능한
          발전을 돕습니다.
        </Content>
      </SASM>
      <SASMDescription>
        <SubLogo>
            SUSTAINABLE<br/>
            ACT<br/>
            SPACE<br/>
            MAP<br/>
        </SubLogo>
        <SubTitle>
            SASM은 SDGs 목표 실현에 기여하는 여가 공간을<br />
            '지속가능한 공간'으로 정의하고,<br/>
            이에 대한 지도화 및 큐레이션을 제공합니다. <br/><br/>
            '음식점 및 카페, 녹색공간, 제로웨이스트샵, 전시 및 체험공간,<br/>
            복합문화공간, 도시재생 및 친환경 건축물'<br/><br/>
            6개의 테마로 분류하여, 다양한 지속가능한 공간을 연결해드립니다.<br/><br/>
            <b>SASM은 이를 통해 지역 커뮤니티를 활성화하고,<br/>
            건강한 생산과 소비 활동을 촉진시켜 일상의 지속가능화를 지향합니다.</b>
        </SubTitle>
        </SASMDescription>
        
        <ContentBox>
            <b>SASM</b>은 공간 큐레이션 플랫폼으로, <br />
            크게 <b>세 가지 기능</b>을 제공하고 있습니다.
        </ContentBox>
        <br/>
        <Map>
          <MapWrapper>
            <MapBox>Map</MapBox>
            <MapDescrip>지속가능한 공간을 탐색하고 방문해보세요.</MapDescrip>
          </MapWrapper>
        </Map>
        <Map>
          <StoryWrapper>
            <StoryBox>Story</StoryBox>
            <MapDescrip>공간에 대한 자세한 정보와 인사이트를 얻어가세요.</MapDescrip>
          </StoryWrapper>
        </Map>
        <Map>
          <MapWrapper>
            <MyPickBox>My Pick</MyPickBox>
            <MapDescrip>마음에 드는 공간들의 컬렉션을 만들 수 있어요.</MapDescrip>
          </MapWrapper>
        </Map>
        <br/><br/>
        <MapTitle>
          <div style={{display:"flex"}}>
            <MapSubtitle>
              SASM 아니면 몰랐을<b>지도</b><br/>
              이렇게나 많은 지속가능성
            </MapSubtitle>
            <MapWrite>
              <p style={{fontSize:"4vw"}}>MAP</p>
              <b>식당/카페, 전시/체험, 제로웨이스트<br/>
              건축물, 복합문화, 녹색공간<br/></b>
              <br/>
              SASM은 총 여섯 종류의 지속가능한 공간을 소개합니다. <br/>
              필터를 선택해서 원하는 유형의 공간을 찾거나, 지역이나 장소를 검색할 수 있어요.<br/>
              하트를 클릭하면 My Pick에 해당 공간을 저장할 수 있습니다.<br/>
            </MapWrite>
            </div>
            <MapImage src={map}></MapImage>
            <CategoryImage src={map_category}></CategoryImage>
        </MapTitle>
    </>
  );
}
