import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router";
import Myplace from "../components/mypick/myplace/Myplace";

export default function MyPick() {
  // const token = cookies.name;
  const token = localStorage.getItem("accessTK"); //localStorage에서 accesstoken꺼내기

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
      {token ? <Myplace/> : alert("로그인이 필요합니다.")}
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

