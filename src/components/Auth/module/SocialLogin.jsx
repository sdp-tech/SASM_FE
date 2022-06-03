import React from 'react'
import styled from "styled-components";

import TrySocialLogin from '../../../functions/Auth/TrySocialLogin';

import google_login from '../../../assets/img/google_login.svg'
import naver_login from '../../../assets/img/naver_login.svg'
import kakaotalk_login from '../../../assets/img/kakaotalk_login.svg'

const Wrapper = styled.div`
  width: 40%;

  transform: translate(70%, 20%);

  margin-top: 3rem;
  padding-top: 0.6rem;
  padding-bottom: 0.5rem;

  // border: 3px solid yellow;
  color: black;

  text-align: center;
  font-size: 1rem;
  font-weight: 500;

  user-select: none;
  translation: .2s all;

`;

const LogoWrapper = styled.div`
  margin-top: 1.5rem;
  // background-color: black;
  display: flex;
  justify-content: space-between;
`

const SocialLogo = styled.img`
  cursor: pointer;
`


const SocialLogin = () => {
  return (
    <Wrapper>
      SNS 계정으로 시작하기
      <LogoWrapper>
        <SocialLogo onClick={(e)=>TrySocialLogin(e.target.id)} id='google' src={google_login}/>
        <SocialLogo onClick={(e)=>TrySocialLogin(e.target.id)} id='naver' src={naver_login}/>
        <SocialLogo onClick={(e)=>TrySocialLogin(e.target.id)} id='kakaotalk' src={kakaotalk_login}/> 
      </LogoWrapper>
    </Wrapper>
  )
}

export default SocialLogin;