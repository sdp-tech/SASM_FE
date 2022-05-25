import React from 'react';
import CheckLogin from '../../functions/Auth/CheckLogin';
import { AuthContent, InputWithLabel, AuthButton, RightAlignedLink } from './module';

const Login = () => {
  const props ={
    email : 'dzf12224@naver.com',
    password: '4434'
  }

  return (
    <AuthContent title="LOG IN">
        <InputWithLabel name="email" placeholder="Email"/>
        <InputWithLabel  name="password" placeholder="Password" type="password"/>
        <RightAlignedLink to="/auth/register">아이디/비밀번호 찾기</RightAlignedLink>
        <RightAlignedLink to="/auth/register">회원가입 하기</RightAlignedLink>
        <AuthButton onClick={()=>CheckLogin(props)}>Log in</AuthButton>
    </AuthContent> 
  );
}

export default Login;