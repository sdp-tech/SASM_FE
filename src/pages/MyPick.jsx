import React, { useState, useEffect } from "react";
import Navibar from "../components/common/Navibar";
import styled from "styled-components";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router";
import Mypick from "../components/mypick/Mypick"

export default function MyPick() {
  const [cookies, setCookie, removeCookie] = useCookies(["name"]);
  // const token = cookies.name;
  const token = localStorage.getItem("accessTK"); //localStorage에서 accesstoken꺼내기

  console.log("token@!", token);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/auth");
    } else {
      navigate("/mypick/myplace?page=1");
    }
  }, []);

  return (
    <Sections>
      {token ? <Mypick/> : alert("로그인이 필요합니다.")}
    </Sections>
  );
}

const Sections = styled.div`
  box-sizing: border-box;
  display: grid;
  position: relative;
  height: calc(100vh - 64px);
  grid-template-rows: 1fr;
  grid-template-areas:
    "mypage";
`;

