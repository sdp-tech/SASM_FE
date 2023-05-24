import React from "react";
import styled from "styled-components";

import TrySocialLogin from "../../../functions/Auth/TrySocialLogin";

import google_login from "../../../assets/img/google_login.svg";
import naver_login from "../../../assets/img/naver_login.svg";
import kakaotalk_login from "../../../assets/img/kakaotalk_login.svg";

const Wrapper = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 3rem auto;
  // transform: translate(70%, 20%);
  padding-top: 0.6rem;
  padding-bottom: 0.5rem;

  // border: 3px solid yellow;
  color: black;

  text-align: center;
  font-size: 1rem;
  font-weight: 500;

  user-select: none;
  translation: 0.2s all;
`;

const LogoWrapper = styled.div`
  width: 280px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  margin-top: 1.5rem;
  // background-color: black;
  display: flex;
  justify-content: space-between;
`;

const SocialLogo = styled.img`
  border-radius: 50%;
  width: 40px;
  height: 40px;
  cursor: pointer;
`;

const SocialLogin = () => {
  return (
    <Wrapper>
      SNS 계정으로 시작하기
      <LogoWrapper>
        <SocialLogo
          onClick={(e) => TrySocialLogin(e.target.id)}
          id="google"
          src={google_login}
          style={{ border: "1px solid #eaeaea" }}
        />

        <SocialLogo
          onClick={(e) => TrySocialLogin(e.target.id)}
          id="naver"
          src={naver_login}
          style={{ border: "1px solid #eaeaea" }}
        />
        <SocialLogo
          onClick={(e) => TrySocialLogin(e.target.id)}
          id="kakao"
          src={kakaotalk_login}
          style={{ border: "1px solid #eaeaea" }}
        />
      </LogoWrapper>
    </Wrapper>
  );
};

export default SocialLogin;
