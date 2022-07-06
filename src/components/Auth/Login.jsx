import React, { useState } from "react";
import styled from "styled-components";

import CheckLogin from "../../functions/Auth/CheckLogin";
import {
  AuthContent,
  InputWithLabel,
  AuthButton,
  RightAlignedLink,
  SocialLogin,
} from "./module";

const emailFormat = ['@naver.com', '@gmail.com', '@daum.net', '@hanmail.net', '.ac.kr']

const Message = styled.div`
  font-size: 0.2em;
  margin-top: 1.1em;
  color: #DB524E;
`

const Login = () => {
  const [info, setInfo] = useState({email: ''});
  
  // 이메일 체크
  var flag = false
  for(const format of emailFormat){
    if(info.email.includes(format) || info.email == ''){
      flag = true
      break
    }
  }
  console.log(flag)

  return (
    <AuthContent title="LOG IN">
      <InputWithLabel
        onChange={(event) => {
          setInfo({
            ...info,
            email: event.target.value,
          });
        }}
        name="email"
        placeholder="Email"
        style={flag?{} : {backgroundColor: '#F9E3E3'}}
      />
      <Message>
        {flag ? '' : '이메일 형식이 올바르지 않습니다'}
      </Message>

      <InputWithLabel
        onChange={(event) => {
          setInfo({
            ...info,
            password: event.target.value,
          });
        }}
        name="password"
        placeholder="Password"
        type="password"
      />

      <RightAlignedLink to="/auth/find">아이디/비밀번호 찾기</RightAlignedLink>
      <RightAlignedLink to="/auth/register">회원가입 하기</RightAlignedLink>

      <AuthButton onClick={() => CheckLogin(info)}>Log in</AuthButton>
      <SocialLogin />
    </AuthContent>
  );
};

export default Login;
