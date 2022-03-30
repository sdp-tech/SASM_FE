import React from 'react';
import { BrowserRouter as Route, Routes } from "react-router-dom";

import AuthWrapper from '../components/Auth/AuthWrapper';

import Login from '../containers/Auth/Login';
import Register from '../containers/Auth/Register';

const RegisterPage = () => {
  return (
      <AuthWrapper>
        <Register />
      </AuthWrapper>
  );
}

export default RegisterPage;