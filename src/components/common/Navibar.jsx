import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router";
import { useLocation } from "react-router-dom";
import logo from "../../assets/img/sasm_logo.png";
import { LoginContext } from "../../contexts/LoginContexts";
import PageRedirection from "../../functions/common/PageRedirection";
import { useCookies } from "react-cookie";
import { Pc, Tablet, Mobile } from "../../device"
import { useMediaQuery } from "react-responsive";
import { useRef } from "react";
import MenuOpen from "../../assets/img/Navibar/MenuOpen.svg"
import MenuClose from "../../assets/img/Navibar/MenuClose.svg"

const NavibarSection = styled.div`
  // position: relative;
  position: sticky;
  top: 0px;
  grid-area: navibar;
  min-height: 64px;
  max-height: 64px;
  width: 100%;
  z-index: 10;
  font-size: 16px;
  font-family: pretendard;
  color: #000;
`;
const Bar = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
  background-color: white;
  display: flex;
  flex-direction: row;
  // justify-content: space-between;
  justify-content: space-between;
  box-shadow: 0 4px 4px -4px black;
  z-index: 4;
`;
const LogoBox = styled.div`
  height: 100%;
  width: 10%;
  display: flex;
  align-items: center;
  cursor: pointer;
  margin-left: 10%;
  @media screen and (max-width: 768px) {
    margin-left: 5%;
  }
`;
const Logo = styled.img`
  display: block;
  width: auto;
  height: 60%;
  // position: absolute;
  left: 4%;
  float: left;
`;
const LogoWord = styled.div`
  display: block;
  // position: absolute;
  // left: 10%;
  float: right;
  font-weight: 700;
`
const PagesBox = styled.div`
  position: absolute;
  height: 100%;
  width: 45%;
  left: 27%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  // background-color: yellow;
`;
const AuthBox = styled.div`
  // position: absolute;
  height: 100%;
  width: 20%;
  display: flex;
  flex-direction: row;
  align-items: center;
  @media screen and (max-width: 768px) {
    width: 40%;
  }
`;
const PageTitleCss = styled.div`
  font-size: 1rem;
  cursor: pointer;
  text-decoration: none;
  &:active {
    // border: none;
    // background: white;
    font-weight: bold;
    cursor: revert;
    border-bottom: 2px solid #5480e5;
    color: #5480e5;
    transform: revert;
  }
  &:hover {
    // border-bottom: 2px solid #5480e5;
    cursor: pointer;
    color: #01A0FC;
    transform: translateY(-2px);
  }
  &[aria-current] {
    border: none;
    background: white;
    font-weight: bold;
    cursor: revert;
    color: #209DF5;
    transform: revert;
  }
`;
const MobileMenuBox = styled.div`
  width: 10%;
  display: flex;
  flex-direction: row;
  align-items: center;
  cursor: pointer;
  transition: all .5s;
  &:hover {
    transform: scale(0.8);
  }
`
const MobileMenuList = styled.div`
  width:100%;
  box-sizing: border-box;
  background-color: #FFFFFF;
  z-index: 10;
  position: fixed;
  top: 64px;
  color: black;
  border-top: 1px #999999 solid;
  box-shadow: 0 4px 4px -4px black;
`
const MobileAuthBox = styled.div`
  display: flex;
  align-items: center;
  padding: none;
  justify-content: flex-end;
  padding: 0% 5%;
`
const MobilePageTitle = styled.div`
  padding: 2% 5%;
  text-align: right;
  font-size: 0.8rem;
  cursor: pointer;
  text-decoration: none;
  border-bottom: 1px #999999 solid;
  &:active {
    // border: none;
    // background: white;
    font-weight: bold;
    cursor: revert;
    border-bottom: 2px solid #5480e5;
    color: #5480e5;
    transform: revert;
  }
  &:hover {
    // border-bottom: 2px solid #5480e5;
    cursor: pointer;
    color: #01A0FC;
    transform: translateY(-2px);
  }
  &[aria-current] {
    // border: none;
    background: white;
    font-weight: bold;
    cursor: revert;
    color: #209DF5;
    transform: revert;
  }
`;
const LogginOutTitle = styled.div`
  font-size: 1rem;
  cursor: pointer;
  @media screen and (max-width: 768px) {
    font-size: 0.8rem;
  }
`
// 페이지 이름 받아서 해당 페이지로 이동하는 링크 타이틀 컴포넌트
const PageTitle = ({ navigate, title, setMenu, style }) => {
  const isMobile = useMediaQuery({ query: "(max-width:768px)" });
  const location = useLocation();
  return (
    <>
      {isMobile ? <MobilePageTitle
        onClick={() => {
          PageRedirection(navigate, title.includes("님") ? "MY PAGE" : title);
          setMenu(false);
        }}
        aria-current={location.pathname.includes(`${title.replace(" ","").toLowerCase()}`)?"page":null}
        style={style}
      >
        {/* {userID} */}
        {title}
      </MobilePageTitle> : <PageTitleCss
        onClick={() => {
          PageRedirection(navigate, title.includes("님") ? "MY PAGE" : title);
        }}
        aria-current={location.pathname.includes(`${title.replace(" ","").toLowerCase()}`)?"page":null}
        style={style}
      >
        {/* {userID} */}
        {title}
      </PageTitleCss>}
    </>
  );
};

const LoggingOut = ({ login, setLogin, setMenu }) => {
  const navigate = useNavigate();
  return (
    <LogginOutTitle
      onClick={() => {
        setLogin({ loggedIn: false });
        alert("로그아웃 되었습니다. 이용을 원할 시 로그인 해주세요");
        // 서버에 토큰 블랙리스트화하기 위해 전달
        localStorage.removeItem("accessTK"); //access token 삭제
        localStorage.removeItem("nickname"); //nickname 삭제
        localStorage.removeItem("email"); //email 삭제
        localStorage.removeItem("refreshTK"); //refreshtoken 삭제
        setMenu(false);
        navigate("/"); // 메인 페이지로 이동
      }}
    >
      LOG OUT
    </LogginOutTitle>
  );
};

export default function Navibar() {
  const isMobile = useMediaQuery({ query: "(max-width:768px)" });
  const [login, setLogin] = useContext(LoginContext);
  const [menu, setMenu] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies(["name"]);
  // const token = cookies.name;
  const token = localStorage.getItem("accessTK"); //localStorage에서 accesstoken꺼내기
  const setNickname = localStorage.getItem("nickname"); //닉네임 가져오기
  const navigate = useNavigate();
  const node = useRef();
  const handleMobileMenu = () => {
    setMenu(!menu);
  }
  useEffect(() => {
    const clickOutside = (e) => {
      // 모달이 열려 있고 모달의 바깥쪽을 눌렀을 때 창 닫기
      if (menu && node.current && !node.current.contains(e.target)) {
        setMenu(false);
      }
    };
    document.addEventListener("mousedown", clickOutside);

    return () => {
      // Cleanup the event listener
      document.removeEventListener("mousedown", clickOutside);
    };
  }, [menu]);
  return (
    <NavibarSection ref={node}>
      <Bar>
        {/* 로고 */}
        <LogoBox>
          <Logo
            src={logo}
            onClick={() => {
              setMenu(false);
              PageRedirection(navigate, "SASM")
            }}
          ></Logo>
          <LogoWord
            style={{ paddingLeft: "5%" }}
            onClick={() => {
              setMenu(false);
              PageRedirection(navigate, "SASM")
            }}
          >SASM</LogoWord>
        </LogoBox>
        {isMobile ?
          <MobileMenuBox onClick={handleMobileMenu}>{menu ? <img src={MenuOpen} style={{ transform: 'scale(0.8)' }} /> : <img src={MenuClose} style={{ transform: 'scale(0.8)' }} />}</MobileMenuBox>
          :
          <>
            <PagesBox>
              <PageTitle navigate={navigate} title="MAP"></PageTitle>
              <PageTitle navigate={navigate} title="STORY"></PageTitle>
              <PageTitle navigate={navigate} title="CURATION"></PageTitle>
              <PageTitle navigate={navigate} title="COMMUNITY"></PageTitle>
              <PageTitle navigate={navigate} title="MY PICK"></PageTitle>
            </PagesBox>
            {/* 로그인 및 회원가입 */}
            <AuthBox>
              {!token ? (
                <>
                  <PageTitle navigate={navigate} title="LOG IN"></PageTitle>
                  <div style={{ padding: "5%" }}>|</div>
                  <PageTitle navigate={navigate} title="JOIN"></PageTitle>
                </>
              ) : (
                <>
                  <PageTitle navigate={navigate} title={`${setNickname}님`}></PageTitle>
                  <div style={{ padding: "5%" }}>|</div>
                  <LoggingOut login={login} setLogin={setLogin} setMenu={setMenu} />
                </>
              )}
            </AuthBox>
          </>}
      </Bar>
      {menu ? <MobileMenuList>
        <PageTitle navigate={navigate} setMenu={setMenu} title="MAP"></PageTitle>
        <PageTitle navigate={navigate} setMenu={setMenu} title="STORY"></PageTitle>
        <PageTitle navigate={navigate} setMenu={setMenu} title="CURATION"></PageTitle>
        <PageTitle navigate={navigate} setMenu={setMenu} title="COMMUNITY"></PageTitle>
        <PageTitle navigate={navigate} setMenu={setMenu} title="MY PICK"></PageTitle>
        {!token ? (
          <MobileAuthBox>
            <PageTitle navigate={navigate} setMenu={setMenu} style={{ border: "none" }} title="LOG IN"></PageTitle>
            <div style={{ padding: "0 5%" }}>|</div>
            <PageTitle navigate={navigate} setMenu={setMenu} style={{ border: "none" }} title="JOIN"></PageTitle>
          </MobileAuthBox>
        ) : (
          <MobileAuthBox>
            <PageTitle navigate={navigate} setMenu={setMenu} style={{ border: "none" }} title={`${setNickname}님`}></PageTitle>
            <div style={{ padding: "0 5%" }}>|</div>
            <LoggingOut login={login} setLogin={setLogin} setMenu={setMenu} />
          </MobileAuthBox>
        )}
      </MobileMenuList> : null}
    </NavibarSection>
  );
}
