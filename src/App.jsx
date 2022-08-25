import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import SpotMap from "./pages/SpotMap";

import MyPage from "./pages/MyPage";
import Auth from "./pages/Auth";

import StoryList from "./pages/Story";
import StoryDetail from "./pages/StoryDetail";
import { LoginProvider } from "./contexts/LoginContexts";
import { CookiesProvider } from "react-cookie";
import { useCookies } from "react-cookie";
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
    <CookiesProvider>
      <LoginProvider value={[login, setLogin]}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/users/*" element={<Auth />} />
            <Route path="/map" element={<SpotMap />} />

            <Route path="/mypage" element={<MyPage />} />
            <Route path="/auth/*" element={<Auth />} />

            <Route path="/story" element={<StoryList />} />
            <Route path="/story/:id" element={<StoryDetail />} />
          </Routes>
        </BrowserRouter>
      </LoginProvider>
    </CookiesProvider>
  );
};

export default App;
