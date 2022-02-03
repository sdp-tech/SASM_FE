import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './pages/Home'
import Auth from './pages/Auth'
import Intro from './pages/Intro';
import Story from './pages/Story';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Intro />} />
        <Route path="/home" element={<Home />} />
        <Route path="/story" element={<Story />} />
        <Route path="/auth/*" element={<Auth />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App