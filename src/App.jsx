import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import SpotMap from "./pages/SpotMap";

import MyPage from "./pages/MyPage";
import Auth from "./pages/Auth";

import StoryList from "./pages/Story";
import StoryDetail from "./pages/StoryDetail";
import { LoginProvider } from "./contexts/LoginContexts";

const App = () => {
  const [login, setLogin] = useState({
    loggedIn: false,
  });

  return (
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
  );
};

export default App;
