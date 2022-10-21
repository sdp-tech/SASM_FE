import React, { useState, useEffect } from "react";
import Navibar from "../components/common/Navibar";
import styled from "styled-components";
import Mypage from "../components/mypage/Mypage";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router";
export default function MyPage() {
  const [cookies, setCookie, removeCookie] = useCookies(["name"]);
  // const token = cookies.name;
  const token = localStorage.getItem("accessTK"); //localStorage에서 accesstoken꺼내기

  console.log("token@!", token);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/auth");
    } else {
      navigate("/mypage");
    }
  }, []);

  return (
    <Sections>
      <Navibar />
      {token ? <Mypage /> : alert("로그인이 필요합니다.")}
    </Sections>
  );
}

const Sections = styled.div`
  box-sizing: border-box;
  display: grid;
  position: relative;
  height: 100vh;
  grid-template-rows: 0.13fr 0.87fr;
  grid-template-areas:
    "navibar"
    "mypage";
`;
