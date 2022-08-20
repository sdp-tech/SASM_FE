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
} from "./module";
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
  margin-top: 1.1em;
  color: #db524e;
`;

const Login = () => {
  const [info, setInfo] = useState({ email: "" });
  const [fail, setFail] = useState(false);
  const [login, setLogin] = useContext(LoginContext);
  const [cookies, setCookie] = useCookies(["id"]); // 쿠키 훅

  const navigate = useNavigate();

  // 이메일 체크
  var flag = false;
  for (const format of emailFormat) {
    if (info.email.includes(format) || info.email === "") {
      flag = true;
      break;
    }
  }

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

      <RightAlignedLink to="/auth/find">아이디/비밀번호 찾기</RightAlignedLink>
      <RightAlignedLink to="/auth/register">회원가입 하기</RightAlignedLink>

      <AuthButton
        onClick={async () => {
          const res = await TryLogin(info);
          console.log("외부", res);

          if ("success" in res) {
            setLogin({
              ...login,
              loggedIn: true,
              token: res.token,
              nickname: res.nickname,
            });
            setCookie("id", res.data.token); // 쿠키에 토큰 저장
            console.log("외부", login);

            navigate("/map");
            // window.location.href = "/map";
          } else {
            setFail(true);
          }
        }}
      >
        Log in
      </AuthButton>
      <SocialLogin />
    </AuthContent>
  );
};

export default Login;
