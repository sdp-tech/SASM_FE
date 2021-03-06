import React from "react";
import { Routes, Route } from "react-router-dom";
import styled from "styled-components";

import AuthWrapper from "../components/Auth/module/AuthWrapper";
import Login from "../components/Auth/Login";
import Register from "../components/Auth/Register";
import Navibar from "../components/common/Navibar";
import FindIDnPW from "../components/Auth/FindIDnPW";

export default function Auth() {
  return (
    <Sections>
      <Navibar />
      <AuthWrapper>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/find/*" element={<FindIDnPW />} />
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
  grid-template-rows: 0.15fr 0.85fr;
  grid-template-areas:
    "navibar"
    "auth";
`;