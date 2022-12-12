import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import SpotMap from "./pages/SpotMap";

import MyPage from "./pages/MyPage";
import Auth from "./pages/Auth";
import StoryAdmin from "./pages/StoryAdmin";

import StoryList from "./pages/Story";
import StoryDetail from "./pages/StoryDetail";
import PlaceAdmin from "./pages/PlaceAdmin";
import { LoginProvider } from "./contexts/LoginContexts";
import { CookiesProvider } from "react-cookie";
import { useCookies } from "react-cookie";
import { createGlobalStyle } from "styled-components";
import "./index.css";
import Navibar from "./components/common/Navibar";
import {device} from "./device"
const GlobalStyle = createGlobalStyle`
  *{
    @media screen and (${device.laptop}) {
      font-size: 12px;
    }
    @media screen and (${device.laptopL}) {
      font-size: 16px;
    }
    @media screen and (${device.desktop}) {
      font-size: 20px;
    }
  }
`;

const App = () => {
  const [login, setLogin] = useState({
    loggedIn: false,
  });
  // const [cookies, setCookie, removeCookie] = useCookies(["id"]);
  // const token = cookies.id;
  // console.log("token@!", token);
  // // 백 검사하기

  // useEffect(() => {
  //   if (token) {
  //     setLogin({
  //       ...login,
  //       loggedIn: true,
  //       // token: res.token,
  //       // nickname: res.nickname,
  //     });
  //   }
  // }, []);
  return (
    <>
      <GlobalStyle />
      <CookiesProvider>
        <LoginProvider value={[login, setLogin]}>
          <BrowserRouter>
          <Navibar/>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/users/*" element={<Auth />} />
              <Route path="/map" element={<SpotMap />} />
              <Route path="/map/:place" element={<SpotMap />} />
              
              <Route path="/mypage/*" element={<MyPage />} />
              <Route path="/auth/*" element={<Auth />} />

              <Route path="/story" element={<StoryList />} />
              <Route path="/story/:id" element={<StoryDetail />} />
              <Route path="/admin/place" element={<PlaceAdmin />} />
              <Route path="/admin/place/:id" element={<PlaceAdmin />} />
              <Route path="/admin/story" element={<StoryAdmin />} />
              <Route path="/admin/story/:id" element={<StoryAdmin />} />
            </Routes>
          </BrowserRouter>
        </LoginProvider>
      </CookiesProvider>
    </>
  );
};

export default App;
