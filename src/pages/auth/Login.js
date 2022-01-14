import React, { useState, useRef } from 'react';
import { BrowserRouter,Route,Link,Switch } from "react-router-dom"

function Login() {

  return (
    <div>
    <input
      name="Id"
      placeholder="ID"
    />
    <input
      name="Password"
      placeholder="Password"
    />
    <button>로그인</button>
    <button>
      <Link to="/Signin">회원가입</Link>
      </button>
  </div>
  );
}

export default Login;