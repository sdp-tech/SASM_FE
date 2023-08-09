import React, { useState, useContext } from "react";
import styled from "styled-components";
import { LoginContext } from "../../contexts/LoginContexts";
import { useNavigate } from "react-router";
import TryLogin from "../../functions/Auth/TryLogin";
import {
  AuthContent,
  InputWithLabel,
  AuthButton,
  RightAlignedLink,
  SocialLogin,
  CenterAlignedLink
} from "./module";
// import { setCookie } from "../common/Cookie";
import { useCookies } from "react-cookie"; // useCookies import

const emailFormat = [
  "@naver.com",
  "@gmail.com",
  "@daum.net",
  "@hanmail.net",
  ".ac.kr",
];

const Message = styled.div`
  font-size: 0.2em;
  margin-left: 2.5%;
  margin-top: 1.1em;
  color: #db524e;
`;

const Login = () => {
  const [info, setInfo] = useState({ email: "" });
  const [fail, setFail] = useState(false);
  const [login, setLogin] = useContext(LoginContext);
  const [cookies, setCookie] = useCookies(["name"]); // 쿠키 훅

  const navigate = useNavigate();

  // 이메일 체크
  const isEmail = (email) => {
    const emailRegex =
      /^(([^<>()\[\].,;:\s@"]+(\.[^<>()\[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
    return emailRegex.test(email);
  };
  var flag = false;
  if (isEmail(info.email) || info.email === "") {
    flag = true;
  }
  const LoginClick = async () => {
    const res = await TryLogin(info);

    if (res === undefined) {
      alert("아이디 또는 비밀번호가 일치하지 않습니다.");
    } else if ("success" === res.status) {
      const access = res.data.access;
      // alert(access);
      const refresh = res.data.refresh;
      // alert(refresh);

      setLogin({
        ...login,
        loggedIn: true,
        // token :res.token
        refresh: res.data.refresh,
        access: res.data.access,
        nickname: res.data.nickname,
      });
      localStorage.setItem("nickname", res.data.nickname); //닉네임 따로 저장
      localStorage.setItem("accessTK", res.data.access); //access token 따로 저장
      localStorage.setItem("email", info.email);

      // setCookie("name", access);
      setCookie("name", refresh);
      navigate(-1);
      // window.location.href = "/map";
    } else {
      alert("아이디 또는 비밀번호가 일치하지 않습니다.");
    }
  };
  const onKeyPress = (e) => {
    if (e.key === "Enter") {
      LoginClick();
    }
  };

  return (
    <AuthContent title="LOG IN">
      <form onKeyPress={onKeyPress}>
        <InputWithLabel
          onChange={(event) => {
            setInfo({
              ...info,
              email: event.target.value,
            });
          }}
          name="email"
          placeholder="E-mail"
          style={flag ? {} : { backgroundColor: "#F9E3E3" }}
        />
        <Message>{flag ? "" : "이메일 형식이 올바르지 않습니다"}</Message>

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

        <Message>
          {!fail
            ? ""
            : "SASM에 등록되지 않은 아이디거나, 아이디 또는 비밀번호가 회원정보와 일치하지 않습니다."}
        </Message>

        <RightAlignedLink to="/auth/find">
          아이디/비밀번호 찾기
        </RightAlignedLink>

        <AuthButton onClick={LoginClick}>로그인하기</AuthButton>
        <SocialLogin />
        <CenterAlignedLink style={{ backgroundColor: '#44ADF7', color: 'white', padding: '10px 50px', borderRadius: '10px' }} to="/auth/register">회원가입하기</CenterAlignedLink>
      </form>
    </AuthContent>
  );
};

export default Login;
