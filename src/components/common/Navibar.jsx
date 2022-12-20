import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router";

import logo from "../../assets/img/sasm_logo.png";
import { LoginContext } from "../../contexts/LoginContexts";
import PageRedirection from "../../functions/common/PageRedirection";
import axios from "axios";
import { useCookies } from "react-cookie";
import { Pc, Tablet, Mobile } from "../../device"

const NavibarSection = styled.div`
  // position: relative;
  position: sticky;
  top: 0px;
  grid-area: navibar;
  min-height: 64px;
  max-height: 64px;
  width: 100%;
  z-index: 10;
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
    width: 30%;
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
`;
const MobileMenuBox = styled.div`
  font-size: 0.5rem;
  height: 100%;
  width: 10%;
  display: flex;
  flex-direction: row;
  align-items: center;
`
const MobileMenuList = styled.div`
  width:100%;
  box-sizing: border-box;
  background-color: #FFFFFF;
  z-index: 10;
  position: fixed;
  top: 64px;
  color: black;
`
const MobilePageTitle = styled.div`
  padding: 2% 5%;
  text-align: right;
  font-size: 0.5rem;
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
  & + & {
    border-top:1px #999999 solid;
  }
`;
// 페이지 이름 받아서 해당 페이지로 이동하는 링크 타이틀 컴포넌트
const PageTitle = ({ navigate, title, setMenu }) => {
  const [color, setColor] = useState("yellow");
  return (
    <>
      <Pc><PageTitleCss
        onClick={() => {
          console.log("@@@", title);
          PageRedirection(navigate, title.includes("님") ? "MY PAGE" : title);
        }}
      >
        {/* {userID} */}
        {title}
      </PageTitleCss>
      </Pc>
      <Tablet>
        <PageTitleCss
          onClick={() => {
            console.log("@@@", title);
            PageRedirection(navigate, title.includes("님") ? "MY PAGE" : title);
          }}
        >
          {/* {userID} */}
          {title}
        </PageTitleCss>
      </Tablet>
      <Mobile>
        <MobilePageTitle
          onClick={() => {
            console.log("@@@", title);
            PageRedirection(navigate, title.includes("님") ? "MY PAGE" : title);
            setMenu(false);
          }}
        >
          {/* {userID} */}
          {title}
        </MobilePageTitle>
      </Mobile>
      </>
  );
};

const LoggingOut = ({ login, setLogin }) => {
  const [cookies, setCookie, removeCookie] = useCookies(["name"]);
  const navigate = useNavigate();
  return (
    <div
      style={{cursor: "pointer" }}
      onClick={() => {
        setLogin({ loggedIn: false });
        alert("로그아웃 되었습니다. 이용을 원할 시 로그인 해주세요");
        // 서버에 토큰 블랙리스트화하기 위해 전달
        removeCookie("name"); // 쿠키 삭제
        localStorage.removeItem("accessTK"); //access token 삭제
        localStorage.removeItem("nickname"); //nickname 삭제
        localStorage.removeItem("email"); //email 삭제
        navigate("/"); // 메인 페이지로 이동
      }}
    >
      LOG OUT
    </div>
  );
};

export default function Navibar() {
  const [login, setLogin] = useContext(LoginContext);
  const [menu, setMenu] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies(["name"]);
  // const token = cookies.name;
  const token = localStorage.getItem("accessTK"); //localStorage에서 accesstoken꺼내기
  const setNickname = localStorage.getItem("nickname"); //닉네임 가져오기
  const navigate = useNavigate();
  const handleMobileMenu = () => {
    console.log('handle');
    setMenu(!menu);
  }
  return (
    <NavibarSection>
      <Bar>
        {/* 로고 */}
        <LogoBox>
          <Logo
            src={logo}
            onClick={() => PageRedirection(navigate, "SASM")}
          ></Logo>
          <LogoWord
            style={{paddingLeft: "5%" }}
            onClick={() => PageRedirection(navigate, "SASM")}
          >SASM</LogoWord>
        </LogoBox>
        <Pc>
          <PagesBox>
            <PageTitle navigate={navigate} title="MAP"></PageTitle>
            <PageTitle navigate={navigate} title="STORY"></PageTitle>
            <PageTitle navigate={navigate} title="MY PICK"></PageTitle>
            <PageTitle navigate={navigate} title="MY PAGE"></PageTitle>
          </PagesBox>
        </Pc>
        <Tablet>
          <PagesBox>
            <PageTitle navigate={navigate} title="MAP"></PageTitle>
            <PageTitle navigate={navigate} title="STORY"></PageTitle>
            <PageTitle navigate={navigate} title="MY PICK"></PageTitle>
            <PageTitle navigate={navigate} title="MY PAGE"></PageTitle>
          </PagesBox>
        </Tablet>


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
              <PageTitle
                navigate={navigate}
                // title={`${login.nickname}님`}
                title={`${setNickname}님`}
              ></PageTitle>
              <div style={{ padding: "5%" }}>|</div>
              <LoggingOut login={login} setLogin={setLogin} />
            </>
          )}
        </AuthBox>
        <Mobile>
          <MobileMenuBox onClick={handleMobileMenu}>{menu ? "close" : "menu"}</MobileMenuBox>
        </Mobile>
      </Bar>
      {menu ? <MobileMenuList>
        <PageTitle navigate={navigate} setMenu={setMenu} title="MAP"></PageTitle>
        <PageTitle navigate={navigate} setMenu={setMenu} title="STORY"></PageTitle>
        <PageTitle navigate={navigate} setMenu={setMenu} title="MY PICK"></PageTitle>
        <PageTitle navigate={navigate} setMenu={setMenu} title="MY PAGE"></PageTitle>
      </MobileMenuList> : null}
    </NavibarSection>
  );
}
