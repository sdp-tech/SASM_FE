import React, { useContext } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router";

import logo from "../../assets/img/sasm_logo.svg";
import { LoginContext } from "../../contexts/LoginContexts";
import PageRedirection from "../../functions/common/PageRedirection";

const NavibarSection = styled.div`
  position: relative;
  grid-area: navibar;
  min-height: 120px;
  max-height: 120px;
`;
const Bar = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
  background-color: white;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  box-shadow: 0 4px 4px -4px black;
  z-index: 4;
`;
const LogoBox = styled.div`
  height: 100%;
  width: 20%;
  // background-color: red;
  display: flex;
  align-items: center;
  cursor: pointer;
`;
const Logo = styled.img`
  display: block;
  width: auto;
  height: 80%;
  position: absolute;
  left: 5%;
`;
const PagesBox = styled.div`
  position: absolute;
  height: 100%;
  width: 40%;
  // background-color: yellow;
  left: 30%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  // cursor: pointer;
`;
const AuthBox = styled.div`
  position: absolute;
  height: 100%;
  width: 10%;
  // background-color: green;
  right: 5%;
  display: flex;
  flex-direction: row;
  align-items: center;
  // justify-content: space-between;
  // cursor: pointer;
`;

// 페이지 이름 받아서 해당 페이지로 이동하는 링크 타이틀 컴포넌트
const PageTitle = ({ navigate, title }) => {
  return (
    <div
      style={{ fontSize: "150%", cursor: "pointer" }}
      onClick={() =>
        PageRedirection(navigate, title.includes("님") ? "MY PICK" : title)
      }
    >
      {title}
    </div>
  );
};

const LoggingOut = ({ login, setLogin }) => {
  return (
    <div
      style={{ fontSize: "150%" }}
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
