import React, { useContext } from "react";
import { Routes, Route } from "react-router-dom";
import styled from "styled-components";

import AuthWrapper from "../components/Auth/module/AuthWrapper";
import Login from "../components/Auth/Login";
import Register from "../components/Auth/Register";
import Navibar from "../components/common/Navibar";
import FindIDnPW from "../components/Auth/FindIDnPW";
import KakaoRedirect from "../components/Auth/module/KakaoRedirect";
import { useCookies } from "react-cookie";
import { LoginContext } from "../contexts/LoginContexts";

export default function Auth() {
  // const [cookies, setCookie, removeCookie] = useCookies(["id"]);
  // const [login, setLogin] = useContext(LoginContext);
  // console.log("LLL", login.nickname);

  // const token = cookies.id;
  // console.log("token@", token);
  return (
    <Sections>
      <Navibar />
      <AuthWrapper>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/find/*" element={<FindIDnPW />} />
          <Route path="/kakao/callback/" element={<KakaoRedirect />} />
        </Routes>
      </AuthWrapper>
    </Sections>
  );
}

const Sections = styled.div`
  box-sizing: border-box;
  display: grid;
  position: relative;
  height: 100vh;
  grid-template-rows: 0.05fr 0.95fr;
  grid-template-areas:
    "navibar"
    "auth";
`;
