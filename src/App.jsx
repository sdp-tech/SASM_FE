import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import SpotMap from "./pages/SpotMap";
import Curation from "./pages/Curation";
import MyPage from "./pages/MyPage";
import Auth from "./pages/Auth";
import StoryAdmin from "./pages/StoryAdmin";
import StoryList from "./pages/Story";
import StoryDetail from "./pages/StoryDetail";
import PlaceAdmin from "./pages/PlaceAdmin";
import { LoginProvider } from "./contexts/LoginContexts";
import { CookiesProvider } from "react-cookie";
import { createGlobalStyle } from "styled-components";
import "./index.css";
import Navibar from "./components/common/Navibar";
import Myplace from "./components/mypick/myplace/Myplace";
import Mystory from "./components/mypick/mystory/Mystory";
import MyCuration from "./components/mypick/mycuration/MyCuration";
import SpotCommunity from "./pages/SpotCommunity";
import CurationAdmin from "./pages/CurationAdmin";
import CurationDetailPage from "./components/Curation/CurationDetailPage";
import CurationMoreView from "./components/Curation/components/CurationMoreView";
import CurationUserMoreView from "./components/Curation/components/CurationUserMoreView";

const App = () => {
  const [login, setLogin] = useState({
    loggedIn: false,
  });
  const GlobalStyle = createGlobalStyle`
  *, *::before, *::after {
    box-sizing: border-box;
  }
  * {
    @media screen and (max-width: 768px) {
      
    }
    @media screen and (min-width:769px) and (max-width: 1023px) {
      
    }
    @media screen and (min-width: 1024px) {
    }
  }
  html {
    @media screen and (max-width: 1536px) {
      font-size: 16px;
    }
    @media screen and (min-width: 1537px) and (max-width: 1920px) {
      font-size : 22px;
    }
    @media screen and (min-width: 1921px) and (max-width: 2560px) {
      font-size: 30px;
    }
  }
`;
  return (
    <>
      <GlobalStyle />
      <CookiesProvider>
        <LoginProvider value={[login, setLogin]}>
          <BrowserRouter>
            <Navibar />
            <Routes>
              <Route path="/map/:id" element={<SpotMap />} />
              <Route path="/" element={<Home />} />
              <Route path="/users/*" element={<Auth />} />
              <Route path="/map" element={<SpotMap />} />
              <Route path="/curation" element={<Curation />} />
              <Route path="/curation/curationlist" element={<CurationMoreView />} />
              <Route path="/curation/usercurationlist" element={<CurationUserMoreView />} />
              <Route path="/curation/:id" element={<CurationDetailPage />} />
              <Route path="/map/:place" element={<SpotMap />} />
              <Route path="/mypage/*" element={<MyPage />} />
              <Route path="/mypick/myplace" element={<Myplace />} />
              <Route path="/mypick/mystory" element={<Mystory />} />
              <Route path="/mypick/mycuration" element={<MyCuration />} />
              <Route path="/auth/*" element={<Auth />} />
              <Route path="/story" element={<StoryList />} />
              <Route path="/story/:id" element={<StoryDetail />} />
              <Route path="/admin/place" element={<PlaceAdmin />} />
              <Route path="/admin/place/:id" element={<PlaceAdmin />} />
              <Route path="/admin/story" element={<StoryAdmin />} />
              <Route path="/admin/story/:id" element={<StoryAdmin />} />
              <Route path="/admin/curation" element={<CurationAdmin/>} />
              <Route path="/community/" element={<SpotCommunity />} />
              <Route path="/community/:board" element={<SpotCommunity />} />
              <Route path="/community/:board/:id/*" element={<SpotCommunity />} />
            </Routes>
          </BrowserRouter>
        </LoginProvider>
      </CookiesProvider>
    </>
  );
};

export default App;
