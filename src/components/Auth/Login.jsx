import { ConstructionOutlined } from '@mui/icons-material';
import React, { useState } from 'react';
import CheckLogin from '../../functions/Auth/CheckLogin';
import { AuthContent, InputWithLabel, AuthButton, RightAlignedLink } from './module';
import google_login from '../../assets/img/google_login.svg'
import naver_login from '../../assets/img/naver_login.svg'
import kakaotalk_login from '../../assets/img/kakaotalk_login.svg'

const Login = () => {

  const [info, setInfo] = useState({});

  const props ={
    email : 'dzf12424@naver.com',
    password: '4445'
  }

  return (
    <AuthContent title="LOG IN">
        <InputWithLabel onChange={(event)=>{
          setInfo({
            ...info,
            email: event.target.value
          })}} 
          name="email" placeholder="Email"/>
          
        <InputWithLabel onChange={(event)=>{
          setInfo({
            ...info,
            password: event.target.value
          })}} 
          name="password" placeholder="Password" type="password"/>

        <RightAlignedLink to="/auth/register">아이디/비밀번호 찾기</RightAlignedLink>
        <RightAlignedLink to="/auth/register">회원가입 하기</RightAlignedLink>
        <AuthButton onClick={()=>CheckLogin(info)}>Log in</AuthButton>
        
        <img src={google_login}></img>
        <img src={naver_login}></img>
        <img src={kakaotalk_login}></img>

    </AuthContent> 
  );
}

export default Login;