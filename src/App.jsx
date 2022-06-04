import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import SpotMap from "./pages/SpotMap";
import Story from "./pages/Story";
import MyPage from "./pages/MyPage";
import Auth from "./pages/Auth";
import StoryContent from "./components/Story/StoryContent";
import StoryListContainer from "./components/Story/StoryListContainer";
import StoryContainer from "./components/Story/StoryContainer";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/users/*" element={<Auth />} />
        <Route path="/map" element={<SpotMap />} />

        <Route path="/mypage" element={<MyPage />} />
        <Route path="/auth/*" element={<Auth />} />

        {/* Stroy Content 삭제해야 함 */}
        {/* <Route path="/detail" element={< StoryContent/>} /> */}
        {/* <Route path="/story" component={StoryListContainer} /> */}
        <Route path="/story" element={<StoryListContainer />} />
        <Route path="/story/:id/:slug" element={<StoryContainer />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
