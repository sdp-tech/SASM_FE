import React, { useEffect, useRef } from "react";
import styled, { keyframes } from "styled-components";
import picture from "../assets/img/Home/LandingPage.png";
import picture_mobile from "../assets/img/Home/LandingPageMobile.png";
import { Pc, Tablet, Mobile } from "../device"
import sasm_logo from "../assets/img/sasm_logo.png";
import map_category from "../assets/img/Home/map_category.svg"
import map_categoryMobile from "../assets/img/Home/map_categoryMobile.svg"
import map from "../assets/img/Home/map_image.png";
import map_Mobile from "../assets/img/Home/map_imageMobile.png";
import story from "../assets/img/Home/story_image.png";
import mypick from "../assets/img/Home/mypick_image.png";
import footer from "../assets/img/Home/footer.svg";
import { useMediaQuery } from "react-responsive";
import sasm_logo_blackwhite from "../assets/img/Home/sasm_logo_blackwhite.svg";
import sasm_full_logo_blackwhite from "../assets/img/Home/sasm_full_logo_blackwhite.svg";
import sdp_logo_blackwhite from "../assets/img/Home/sdp_logo_blackwhite.svg";
import sdp_full_logo_blackwhite from "../assets/img/Home/sdp_full_logo_blackwhite.svg";
import { Link } from "react-router-dom";
import gsap from 'gsap';
import { ScrollTrigger } from "gsap/ScrollTrigger";

const imgAnimation  = keyframes`
from { 
  transform: translateY(0);
}
to   { 
  transform: translateY(20px) ;
}
`

const Wrapper = styled.div`
  overflow: hidden;
  position: relative;
  font-family: pretendard;
  height: auto;
`

const IntroImg = styled.img`
  float: right;
  position: absolute;
  right: -1000px;
  width: 80%;
  @media screen and (max-width: 767px) {
    display: none;
  }
  @media screen and (min-width: 768px) and (max-width: 991px) {
    width: 40%
  }
  @media screen and (min-width: 992px) and (max-width: 1199px) {
    width: 38%
  }
`;

//SASM
const SASM = styled.div`
  width: 60%;
  height: 550px;
  margin-left: 30%;
  margin-top: 10%;
  color: black;
  display: block;
  @media screen and (max-width: 767px) {
    height: auto;
    width: 100%;
    margin-left: 0;
    margin-top: 20vh;
    padding-left: 6vw;
  } 
  @media screen and (min-width: 768px) and (max-width: 991px) {
    font-size: 1rem;
    width: 35%
  }
  @media screen and (min-width: 992px) and (max-width: 1199px) {
    width: 40%
    margin-left: 0;
    margin-top: 20vh;
    padding-left: 6vw;
  }
`;
const SASMDescription = styled.div`
  display: flex;
  width: 100%;
  padding-left: 10vw;
  margin-top: 15vh;
  @media screen and (max-width: 767px) {
    padding-left: 6vw;
    margin-top: 5vh;
  } 
  @media screen and (min-width: 768px) and (max-width: 991px) {
    padding-left: 6vw;
    margin-top: 5vh;
    width: 140%;
    font-size: 0.9rem;
  }
  @media screen and (min-width: 992px) and (max-width: 1200px) {
    padding-left: 6vw;
    margin-top: 5vh;
    width: 140%;
    font-size: 0.7rem;
  }
`
const SASMLogo = styled.img`
  position: absolute;
  width: 4vw;
  @media screen and (max-width: 768px) {
    width: 4vw;
  }
  ${props => props.rotate ? "transform: rotate(180deg) translate(120%, 0%);" : ""};
`

const SubLogo = styled.div`
  font-size: 1.5vw;
  padding-top: 5%;
  @media screen and (min-width: 769px) and (max-width: 1023px) {
    font-size: 2vw;
  } 
  @media screen and (max-width: 768px) {
    font-size: 1.5rem;
  }
`;
const SubTitle = styled.div`
  margin-left: 10%;
  line-height: 150%;
  font-size: 1.5vw;
  padding-top: 10%;
  @media screen and (min-width: 769px) and (max-width: 1023px) {
  margin-left: 10%;
  font-size: 2vw;
  width: 30%;
  } 
  @media screen and (max-width: 768px) {
    margin: 0;
    font-size: 1rem;
  }
`
const TitleBox = styled.div`
  display: flex;
  margin-bottom : 7%;
  @media screen and (max-width: 768px) {
    margin-bottom: 1%;
  }
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
    font-size: 5rem;
  } 
`;

const Content = styled.div`
  box-sizing: border-box;
  font-size: 2vw;
  font-weight: 700;
  line-height: 1.5;
  position: relative;
  @media screen and (min-width: 769px) and (max-width: 1023px) {
    font-size: 4vw;
  } 
  @media screen and (max-width: 768px) {
    font-size: 0.9rem;
    margin-top: 8%;
  } 
`;
const ContentBox = styled.div`
  margin-top: 30vh;
  width: 100%;
  padding-left: 15vw;
  font-size: 2vw;
  position: relative;
  @media screen and (min-width: 769px) and (max-width: 1023px) {
    font-size: 1rem;
  } 
  @media screen and (max-width: 768px) {
    margin-top: 10vh;
    font-size: 1rem;
    padding: 0;
    text-align: center;
  } 
`
//Function SASM 기능 정의
const Function = styled.div`
  margin-top: 2.5vh;
`
const FunctionWrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 5vh 0 5vh 15vw;
  @media screen and (min-width: 769px) and (max-width: 991px) {
    width: 100%;
  } 
  &: nth-of-type(2) {
    padding-left: 22vw;
  }
  & + & {
    border-top: 1px rgba(0,0,0,0.5) solid;
  }
  @media screen and (max-width: 767px) {
    padding: 3vh 0;
    flex-direction: column;
    align-items: flex-start;
    &: nth-of-type(1) {
      padding-left: 10vw;
    }
    &: nth-of-type(2) {
      padding-left: 20vw;
    }
    &: nth-of-type(3) {
      padding-left: 5vw;
    }
  } 
`
const FunctionBox = styled.div`
  color: black;
  padding-top: auto;
  padding-bottom: auto;
  line-height: 3vw;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 15vw;
  font-weight: 900;
  background: linear-gradient(102.78deg, rgba(255, 255, 255, 0.7) 4.48%, rgba(255, 255, 255, 0) 90.51%), ${props => props.backgroundColor};
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 75px;
  @media screen and (max-width: 768px) {
    width: 40vw;
    height: 5vh;

  } 
  @media screen and (min-width: 769px) and (max-width: 1023px) {
    width: 20vw;
  } 
`
const FunctionDescp = styled.div`
  margin-left: 2vw;
  font-size: 1rem;
  @media screen and (max-width: 768px) {
    font-size: 0.8rem;
    margin: 3vh 0 0 10vw;
  }
`
const ContentTitle = styled.p`
  line-height: 100%;
  margin: 0 0 3vh 0;
  font-weight: 700;
  font-size: 8rem;
  width: 100%;
  @media screen and (max-width: 768px) {
    font-size: 4rem;
  }
`
const MapTitle = styled.div`
  color: #FFFFFF;
  background: linear-gradient(222.99deg, rgba(255, 255, 255, 0.35) 0%, rgba(255, 255, 255, 0) 100.52%), #00613E;
  padding-top: 10vh;
  width: 100vw;
  height: 100vh;
`
const MapSubtitle = styled.div`
  text-align: center;
  font-size: 1.5vw;
  line-height: 150%;
  border-right: 4px solid #FFFFFF;
  @media screen and (min-width: 769px) and (max-width: 1023px) {
    font-size: 3vw;
    width: 100%;
    margin-bottom: 30px;
  } 
  width: 20%;
  @media screen and (max-width: 768px) {
    width: 100%;
    text-align:left;
    padding-left: 1.5vw;
    margin-left: 10vw;
    border: none;
    font-size: 1rem;
    padding-top: 1.5vh;
  }
`
const MapImage = styled.div`
  display: flex;
  width: 100%;
  @media screen and (max-width: 768px) {
    flex-direction: column;
    // padding: 1vh 0;
    align-items: center;
  }
  @media screen and (min-width: 769px) and (max-width: 1023px) {
    bottom: 80vw;
    height: auto;
  }
`
const MapText = styled.div`
  line-height: 150%;
  font-size: 1.5vw;
  padding-left: 0.5vw;
  @media screen and (max-width: 768px) {
    width: 100%;
    font-size: 0.8rem;
    margin-left: 10vw;
  }
  @media screen and (min-width: 768px) and (max-width: 1024px) {
    width: 80%;
    font-size: 1rem;
    margin-left: 5vw;
  }
`
const StoryTitle = styled.div`
  display: flex;
  color: #FFFFFF;
  padding-top: 10vh;
  width: 100vw;
  height: 100vh;
  background: linear-gradient(119.48deg, rgba(255, 255, 255, 0.3) 0%, rgba(255, 255, 255, 0) 96.37%), #03216C;
  position: relative;
  @media screen and (max-width: 768px) {
    flex-direction: column;
  }
`
const StoryImage = styled.img`
  width: 100%;
`
const StorySubtitle = styled.div`
  padding: 1vw 0 1vw 3vw;
  width: 75%;
  font-size: 2vw;
  border-bottom: 4px #FFFFFF solid;
  @media screen and (max-width: 768px) {
    margin: 0 auto;
    padding-left: 0;
    text-align: center;
    font-size: 1rem;
    border: none;
  }
`
const StoryText = styled.div`
  margin: 5vh 5vw;
  font-size: 1.2rem;
  line-height: 150%;
  @media screen and (max-width: 768px) {
    font-size: 0.8rem;
    margin: 5vh 3vw;
    text-align: center;
  }
  @media screen and (min-width: 769px) and (max-width: 1024px) {
    font-size: 1.2rem;
    margin: 5vh 3vw;
    text-align: center;
  }
`
const MyPickTitle = styled.div`
  display: flex;
  flex-direction: column;
  padding: 5vh;
  width: 100vw;
  height: 100vh;
  background: linear-gradient(246.63deg, #FFFFFF 2.13%, rgba(255, 255, 255, 0) 96.85%), rgba(255, 240, 224, 0.6);
  position: relative;
`
const MyPickSubtitle = styled.div`
  font-weight: 600;
  font-size: 2vw;
  @media screen and (max-width: 768px) {
    font-size: 1.5rem;
    margin-bottom: 3vh;
  }
`
const MyPickImage = styled.img`
  width: 100%;
  // margin: 5vh 0;
  @media screen and (max-width: 768px) {
    margin-top: 150px;
  }
`
const MyPickText = styled.div`
  text-align: center;
  font-size: 1.3rem;
  font-weight: 600;
  @media screen and (max-width: 768px) {
    font-size: 1.1rem;
  }
`
const Footer = styled.div`
  background-color: #000000;
  padding: 5vh 3vw;
`
const Contact = styled.div`
  display: flex;
  width: 15%;
  padding-bottom: 1vh;
  color: #FFFFFF;
  justify-content: center;  
  border-bottom: 1px #FFFFFF solid;
  font-size: 2rem;
  @media screen and (max-width: 768px) {
    width: 23%;
    padding-bottom: 1vh;
    margin: 0 auto;
    font-size: 1.2rem;
  }
`
const ContactText = styled.div`
  width: 50%;
  margin-top: 5vh;
  display: flex;
  @media screen and (max-width: 768px) {
    width: 100%;
  }
`
const ContactTitle = styled.div`
  color: #FFFFFF;
  width: 40%;
  height: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2.5rem;
  font-weight: 900;
  @media screen and (max-width: 768px) {
    font-size: 1.5rem;
    width: 100%;
  }
`
const ContactSection = styled.div`
  display: flex;
  align-items: flex-start;
  width: 50%;
  @media screen and (max-width: 768px) {
    width: 50%;
    flex-direction: column;
    align-items: center;
  }
`
const ContactLinkWrapper = styled.div`
  display: flex;
  flex-direction: column;
  @media screen and (max-width: 768px) {
  }
`
const ContactLink = styled.a`
  color: #FFFFFF;
  text-decoration: none;
  margin: 3vh 3vw;
  cursor: pointer;
  @media screen and (max-width: 768px) {
    margin: 0;
    margin: 3vh;
    font-size: 1rem;
  }
  font-size: 1.3rem;
`
const ContactLogo = styled.img`
  @media screen and (max-width: 768px) {
    width: 10%;
    margin-bottom: 3vh;
  }
  width: 10%;
  margin-bottom: 3vh;
`
const ContactFullLogo = styled.img`
  @media screen and (max-width: 768px) {
    width: 60%;
  }
  width: 25%;
`
const ContactImage = styled.div`
  display: flex;
  justify-content: space-around;
  width: 50%;
`

const ScrollImg = styled.img`
  width: 30px;
  position: absolute;
  height: 64px;
  bottom: 10%;
  opacity: 0.5;
  animation: ${imgAnimation} 1s infinite alternate;
  z-index: 3;
`


export default function Home() {
  const isMobile = useMediaQuery({
    query: "(max-width:768px)"
  });
  const ref = useRef(null);
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const el = ref.current;
    const t2 = gsap.timeline({
      scrollTrigger: {
        trigger: el,
        start: "top top",
        // end: "bottom -500%",
        scrub: 3,
        pin: true,
        // anticipatePin: 1
      }
    })
    // t2.fromTo(".first-text", {opacity: 0}, {opacity: 1, duration: 0.2})
    t2.fromTo(".section01", {opacity: 1}, {opacity: 0, duration: 0.4})
    t2.fromTo(".section02", {opacity: 0}, {opacity: 1, duration: 0.4})
    t2.fromTo(".section02", {opacity: 1}, {opacity: 0, duration: 0.4})
    t2.fromTo(".section03", {opacity: 0}, {opacity: 1, duration: 0.4})
    t2.fromTo(".section03", {opacity: 1}, {opacity: 0, duration: 0.4})
    t2.fromTo(".section04", {opacity: 0}, {opacity: 1, duration: 0.4})
    t2.fromTo(".section04", {opacity: 1}, {opacity: 0, duration: 0.4})
    t2.fromTo(".section05", {opacity: 0}, {opacity: 1, duration: 0.4})
    t2.fromTo(".section05", {opacity: 1}, {opacity: 0, duration: 0.4})
    t2.fromTo(".section06", {opacity: 0}, {opacity: 1, duration: 0.4})
    t2.fromTo(".section06", {opacity: 1}, {opacity: 0, scale:1.2, duration: 0.5})
    // return () => {
    //   ref
    // }
  },[])
  return (
    <div>
      <Wrapper ref = {ref}>
      <div style={{height: '100vh', alignItems:'center', justifyContent: 'center', textAlign:'center', position: 'relative'}}>
        <div className="section01" style={{position:"fixed"}}>
          <IntroImg src={isMobile ? picture_mobile : picture}></IntroImg>
          <SASM>
            <TitleBox>
              <Tittle>SASM</Tittle>
            </TitleBox>
            <Mobile>
              <div style={{ width: '100%', fontSize: '1rem', fontWeight: '600' }}>SUSTAINABLE ACT SPATIAL MAP</div>
            </Mobile>
            <Content>
              <SASMLogo src={sasm_logo} rotate="true" />
              SASM은 지속가능한 공간을 큐레이팅하여, <br />한국 도시의 지속가능한
              발전을 돕습니다.
              <SASMLogo src={sasm_logo} />
            </Content>
          </SASM>
          </div>
          <div className="section02" style={{position:'fixed', left:'15%', top: '4%'}}>
          <SASMDescription>
            <Pc>
              <SubLogo>
                <span style={{ color: "#44ADF7" }}>S</span>USTAINABLE<br />
                <span style={{ color: "#29E48A" }}>A</span>CT<br />
                <span style={{ color: "#44ADF7" }}>S</span>PATIAL<br />
                <span style={{ color: "#29E48A" }}>M</span>AP<br />
              </SubLogo>
            </Pc>
            <Tablet>
              <SubLogo>
                <span style={{ color: "#44ADF7" }}>S</span>USTAINABLE<br />
                <span style={{ color: "#29E48A" }}>A</span>CT<br />
                <span style={{ color: "#44ADF7" }}>S</span>PATIAL<br />
                <span style={{ color: "#29E48A" }}>M</span>AP<br />
              </SubLogo>
            </Tablet>
            <SubTitle>
              SASM은 SDGs 목표 실현에 기여하는 여가 공간을<br />
              '지속가능한 공간'으로 정의하고,<br />
              이에 대한 지도화 및 큐레이션을 제공합니다. <br /><br />
              <b>'음식점 및 카페, 녹색공간, 제로웨이스트샵, 전시 및 체험공간,<br />
                복합문화공간, 도시재생 및 친환경 건축물'<br /><br /></b>
              6개의 테마로 분류하여, 다양한 지속가능한 공간을 연결해드립니다.<br /><br />
              <Pc>
                <b>SASM은 이를 통해 지역 커뮤니티를 활성화하고,<br />
                  건강한 생산과 소비 활동을 촉진시켜 일상의 지속가능화를 지향합니다.</b>
              </Pc>
              <Tablet>
                <b>SASM은 이를 통해 지역 커뮤니티를 활성화하고,<br />
                  건강한 생산과 소비 활동을 촉진시켜 일상의 지속가능화를 지향합니다.</b>
              </Tablet>
              <Mobile>
                SASM은 이를 통해<br />
                <span style={{ color: '#0068A4', fontSize: '1.2rem', fontWeight: '700' }}>
                  지역 커뮤니티를 활성화하고,<br />
                  건강한 생산과 소비 활동을 촉진시켜<br />
                  일상의 지속가능화를 지향합니다.
                </span>
              </Mobile>
            </SubTitle>
          </SASMDescription>
          </div>
          <div className="section03" style={{position:'fixed', top:isMobile ? "0%": "-8%"}}>
          <ContentBox>
            <SASMLogo src={sasm_logo} rotate="true" />
            <b>SASM</b>은 공간 큐레이션 플랫폼으로, <br />
            크게 <b>네 가지 기능</b>을 제공하고 있습니다.
            <SASMLogo src={sasm_logo} />
          </ContentBox>
          <br />
          <Function>
            <FunctionWrapper>
              <Link to={'/map?page=1'} style={{ textDecoration: 'none' }}>
                <FunctionBox backgroundColor="#3AE894">Map</FunctionBox>
              </Link>
              <FunctionDescp>지속가능한 공간을 탐색하고 방문해보세요.</FunctionDescp>
            </FunctionWrapper>
            <FunctionWrapper>
              <Link to={'/story?page=1'} style={{ textDecoration: 'none' }}>
                <FunctionBox backgroundColor="#01A0FC" marginLeft="8%">Story</FunctionBox>
              </Link>
              <FunctionDescp>공간에 대한 자세한 정보와 인사이트를 얻어가세요.</FunctionDescp>
            </FunctionWrapper>
            <FunctionWrapper>
              <Link to={'/curation'} style={{ textDecoration: 'none' }}>
                <FunctionBox backgroundColor="#8a2be2" >Curation</FunctionBox>
              </Link>
              <FunctionDescp>장소를 모아 놓은 코스를 추천받아보세요.</FunctionDescp>
            </FunctionWrapper>
            <FunctionWrapper>
              <Link to={'/mypick/myplace?page=1'} style={{ textDecoration: 'none', marginLeft:"8%" }}>
                <FunctionBox backgroundColor="#FFE9D0" >My Pick</FunctionBox>
              </Link>
              <FunctionDescp>마음에 드는 공간들의 컬렉션을 만들 수 있어요.</FunctionDescp>
            </FunctionWrapper>
          </Function>
          </div>
          <ScrollImg src="/img/icon_scroll.png"/>
        
        <br /><br />
        <div className="section04" style={{position:"fixed"}}>
        <MapTitle>
          <div style={{ display: "flex", flexDirection: isMobile ? 'column' : 'row' }}>
            <MapImage style={{width:isMobile ? '500px':"50%"}}>
              <Mobile><img src={isMobile ? map_categoryMobile : map_category} /></Mobile>
              <img src={isMobile ? map_Mobile : map} style={{ width: '80%'}} />
              <Pc><img src={isMobile ? map_categoryMobile : map_category} style={{width: '7%'}} /></Pc>
              <Tablet><img src={isMobile ? map_categoryMobile : map_category} style={{width: '10%'}} /></Tablet>
            </MapImage>
            <div style={{width:isMobile?"100%":"50%"}}>
              <MapSubtitle>
                SASM 아니면 몰랐을<b>지도</b><br />
                이렇게나 많은 지속가능성
              </MapSubtitle>
              <MapText>
                <ContentTitle>Map</ContentTitle>
                <b>식당/카페, 전시/체험, 제로웨이스트<br />
                  건축물, 복합문화, 녹색공간<br /></b>
                <br />
                SASM은 총 여섯 종류의 지속가능한 공간을 소개합니다. <br />
                필터를 선택해서 원하는 유형의 공간을 찾거나,<Mobile><br /></Mobile> 지역이나 장소를 검색할 수 있어요.<br />
                하트를 클릭하면 My Pick에 해당 공간을 저장할 수 있습니다.<br />
              </MapText>
            </div>
          </div>
        </MapTitle>
        </div>
        <div className="section05" style={{position:"fixed"}}>
        <StoryTitle>
          <div style={{ width: isMobile ? '100%' : '40%' }} >
            <StorySubtitle>
              공간에 대한 깊은 이해를 원한다면
            </StorySubtitle>
            <StoryText>
              <ContentTitle style={{ marginBottom: '5vh' }}>Story</ContentTitle>
              Story에서는 지속가능한 공간에 대한<Mobile><br /></Mobile>  구체적인 이야기를 들을 수 있어요. <br />
              <br />
              SASM 서비스를 제작한 SDP 구성원들이<Mobile><br /></Mobile>  직접 공간을 답사한 작성하는데요, <br />
              <br />
              <b>공간의 인테리어, 특징, 컨텐츠 등<Mobile><br /></Mobile>  온라인에서는 확인하기 어려운<Mobile><br /></Mobile>  다양한 디테일과 알찬 인사이트를<Mobile><br /></Mobile>  사진과 함께 설명해드려요.</b>
            </StoryText>
          </div>
          <div style={{ width: isMobile ? '250px' : '40%', padding: '0 3vh', position: 'absolute', bottom: 0, right: isMobile ? '25%' : '10px' }}>
            <StoryImage src={story}></StoryImage>
          </div>
        </StoryTitle>
        </div>
        
        <div className="section06" style={{position:"fixed"}}>
          <MyPickTitle>
            <div style={{ display: "flex", flexDirection: 'column', textAlign: 'center' }}>
              <MyPickSubtitle>
                나만의 지속가능성
              </MyPickSubtitle>
              <ContentTitle>My Pick</ContentTitle>
              <MyPickText>
              Map과 Story에서 '좋아요'를 누른 컨텐츠를<br />
              My Pick에서 저장하고 확인할 수 있어요. <br />
              <span style={{ color: '#843700', fontWeight: '700', fontSize: isMobile ? '1.3rem' : '2.5rem' }}>SASM과 함께 나만의 지속가능한 영역을 확장시켜보세요!</span>
            </MyPickText>
            </div>
            <MyPickImage src={mypick}></MyPickImage>
          </MyPickTitle>
        </div>
        </div>
        <div>
        <Footer>
          <Contact>Contact</Contact>
          <div style={{ display: 'flex' }}>
            <ContactText>
              <ContactSection>
                <Mobile><ContactLogo src={sdp_logo_blackwhite} /></Mobile>
                <ContactTitle>SDP</ContactTitle>
                <ContactLinkWrapper>
                  <ContactLink href="https://blog.naver.com/sdpofficial">Naver Blog</ContactLink>
                  <ContactLink href="https://www.instagram.com/_sdp_official/">Instagram</ContactLink>
                </ContactLinkWrapper>
                <Mobile><ContactFullLogo src={sdp_full_logo_blackwhite} /></Mobile>
              </ContactSection>
              <ContactSection>
                <Mobile><ContactLogo src={sasm_logo_blackwhite} /></Mobile>
                <ContactTitle>SASM</ContactTitle>
                <ContactLinkWrapper>
                  <ContactLink href="https://sasm.co.kr">Homepage</ContactLink>
                  <ContactLink href="https://www.instagram.com/sasmofficial/">Instagram</ContactLink>
                </ContactLinkWrapper>
                <Mobile><ContactFullLogo src={sasm_full_logo_blackwhite} /></Mobile>
              </ContactSection>
            </ContactText>
            <Pc>
              <ContactImage>
                <ContactFullLogo src={sdp_full_logo_blackwhite} />
                <ContactFullLogo src={sasm_full_logo_blackwhite} />
              </ContactImage>
            </Pc>
            <Tablet>
              <ContactImage>
                <ContactFullLogo src={sdp_full_logo_blackwhite} />
                <ContactFullLogo src={sasm_full_logo_blackwhite} />
              </ContactImage>
            </Tablet>
          </div>
        </Footer>
        </div>
      </Wrapper>
    </div>
  );
}