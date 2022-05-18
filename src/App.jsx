import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import SpotMap from './pages/SpotMap';
import Story from './pages/Story';
import MyPage from './pages/MyPage';
import Auth from './pages/Auth'
import StoryContent from './components/Story/StoryContent'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/map" element={<SpotMap />} />
        <Route path="/story" element={<Story />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/auth/*" element={<Auth />} />

        {/* Stroy Content 삭제해야 함 */}
        <Route path="/detail" element={< StoryContent/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App