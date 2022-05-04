import React from 'react';
import {Routes, Route} from 'react-router-dom';

import AuthWrapper from '../components/Auth/AuthWrapper';

import Login from '../components/Auth/Login';
import Register from '../components/Auth/Register';

const Auth = () => {
  return (
      <AuthWrapper>
        <Routes>
            <Route path="/" element={<Login />}/>
            <Route path="/register" element={<Register />}/>
        </Routes>
      </AuthWrapper>
  );
}

export default Auth;