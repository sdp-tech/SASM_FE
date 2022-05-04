import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import SpotMap from './pages/SpotMap';
import Story from './pages/Story';
import Auth from './pages/Auth'
import BlogContent from './pages/BlogContent'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/map" element={<SpotMap />} />
        <Route path="/story" element={<Story />} />
        <Route path="/auth/*" element={<Auth />} />
        <Route path="/detail" element={< BlogContent/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App