import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router";

import logo from "../../assets/img/sasm_logo.svg";
import { LoginContext } from "../../contexts/LoginContexts";
import PageRedirection from "../../functions/common/PageRedirection";
import axios from "axios";
import { useCookies } from "react-cookie";

const NavibarSection = styled.div`
  // position: relative;
  position: sticky;
  top: 0px;
  grid-area: navibar;
  min-height: 120px;
  max-height: 120px;
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
  width: 15%;
  display: flex;
  align-items: center;
  cursor: pointer;
`;
const Logo = styled.img`
  display: block;
  width: auto;
  height: 80%;
  position: absolute;
  left: 4%;
`;
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
  // background-color: green;
  // right: 5%;
  display: flex;
  flex-direction: row;
  align-items: center;
  // justify-content: space-between;
  // cursor: pointer;
`;
const PageTitleCss = styled.div`
  fontsize: 2vw;
  cursor: pointer;
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
    border-bottom: 2px solid #5480e5;
    cursor: pointer;
    color: #5480e5;
    transform: translateY(-2px);
  }
`;

// 페이지 이름 받아서 해당 페이지로 이동하는 링크 타이틀 컴포넌트
const PageTitle = ({ navigate, title }) => {
  const [color, setColor] = useState("yellow");
  return (
    <PageTitleCss
      style={{ fontSize: "2vw" }}
      onClick={() => {
        console.log("@@@", title);
        // color === "yellow" ? setColor("red") : setColor("yellow");
        // // PageRedirection(navigate, title.includes("님") ? "MY PICK" : title)
        // // aria-current={ ? "title" : null}
        PageRedirection(navigate, title.includes("님") ? "MY PICK" : title);
      }}
    >
      {/* {userID} */}
      {title}
    </PageTitleCss>
  );
};

const LoggingOut = ({ login, setLogin }) => {
  return (
    <div
      style={{ fontSize: "2vw", cursor: "pointer" }}
      onClick={() => {
        setLogin({ loggedIn: false });
        alert("로그아웃 되었습니다. 이용을 원할 시 로그인 해주세요");
      }}
    >
      LOG OUT
    </div>
  );
};

export default function Navibar() {
  const [login, setLogin] = useContext(LoginContext);

  const navigate = useNavigate();

  return (
    <NavibarSection>
      <Bar>
        {/* 로고 */}
        <LogoBox>
          <Logo
            src={logo}
            onClick={() => PageRedirection(navigate, "SASM")}
          ></Logo>
        </LogoBox>

        {/* 메뉴 */}
        <PagesBox>
          <PageTitle navigate={navigate} title="MAP"></PageTitle>
          <PageTitle navigate={navigate} title="STORY"></PageTitle>
          <PageTitle navigate={navigate} title="MY PICK"></PageTitle>
        </PagesBox>

        {/* 로그인 및 회원가입 */}
        <AuthBox>
          {!login.loggedIn ? (
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
                title={`${login.nickname}님`}
              ></PageTitle>
              <div style={{ padding: "5%" }}>|</div>
              <LoggingOut login={login} setLogin={setLogin} />
            </>
          )}
        </AuthBox>
      </Bar>
    </NavibarSection>
  );
}
