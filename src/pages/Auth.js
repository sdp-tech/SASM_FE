import React from 'react';
import { BrowserRouter as Route, Routes } from "react-router-dom";

import AuthWrapper from '../components/Auth/AuthWrapper';

import Login from '../containers/Auth/Login';
import Register from '../containers/Auth/Register';

const Auth = () => {
  return (
      <AuthWrapper>
       {/* <Routes>
            <Route path="/" element={<Login />}/>
            <Route path="/register" element={<Register />}/>
        </Routes> */}
        <Register />
      </AuthWrapper>
  );
}

export default Auth;