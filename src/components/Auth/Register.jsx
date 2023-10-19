import React, { useEffect, useState } from "react";
import {
  AuthContent,
  InputWithLabel,
  AuthButton,
  RightAlignedLink,
} from "./module";
import styled from "styled-components";
import { NoEncryption } from "@mui/icons-material";
import TryRegister from "../../functions/Auth/TryRegister";
import CheckRepetition from "../../functions/Auth/CheckRepetition";
import SelectWithLabel from "./module/SelectWithLabel";
import { useNavigate } from "react-router-dom";

const InputAndButton = styled.div`
  position: relative;
  display: flex;
  flex-wrap: nowrap;
  align-items: flex-end;
  width: 100%;
  margin: 0.8em 0;
`;

const Button = styled.div`
  background-color: #44ADF7;
  margin-left: 2%;
  height: 100%;
  text-align: center;
  // line-height: 3;
  border-radius: 4px;
  font-size: 16px;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  flex-grow: 0.5;
`;
const Message = styled.div`
  font-size: 0.2em;
  //   margin-top: 1.1em;
  color: #db524e;
  margin-left: 2.5%;
`;

const emailFormat = [
  "@naver.com",
  "@gmail.com",
  "@daum.net",
  "@hanmail.net",
  ".ac.kr",
];

const Register = () => {
  const [info, setInfo] = useState({
    email: "",
    passwordConfirm: "",
  });
  const token = localStorage.getItem("accessTK");
  const navigate = useNavigate();
  useEffect(()=>{
    const loginCheck = () => {
      if (token) {
        navigate("/notexistpage", {state:{message: "유효한 접근이 아닙니다.", path: "/"}});
      }
    }
    loginCheck();
  }, [])
  // 이메일 체크
  const isEmail = (email) => {
    const emailRegex =
      /^(([^<>()\[\].,;:\s@"]+(\.[^<>()\[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
    return emailRegex.test(email);
  };
  // 이메일 체크
  var emailCheck = false;
  if (isEmail(info.email) || info.email === "") {
    emailCheck = true;
  }

  // 비밀번호 확인 체크
  var passwordCheck = false;
  if (info.password === info.passwordConfirm || info.passwordConfirm === "")
    passwordCheck = true;

  return (
    <AuthContent title="JOIN">
      <InputAndButton>
        <InputWithLabel
          onChange={(event) => {
            setInfo({
              ...info,
              email: event.target.value,
            });
          }}
          label="메일 주소"
          name="email"
          placeholder="sasm@sdp.com"
          style={emailCheck ? {} : { backgroundColor: "#F9E3E3" }}
        />
        <Button
          onClick={(e) => CheckRepetition(e.target.id, info.email)}
          id="email"
        >
          중복확인
        </Button>
      </InputAndButton>
      <Message>{emailCheck ? "" : "이메일 형식이 올바르지 않습니다"}</Message>

      <InputAndButton>
        <InputWithLabel
          onChange={(event) => {
            setInfo({
              ...info,
              password: event.target.value,
            });
          }}
          label="비밀번호"
          name="password"
          type="password"
        />
      </InputAndButton>

      <InputAndButton>
        <InputWithLabel
          onChange={(event) => {
            setInfo({
              ...info,
              passwordConfirm: event.target.value,
            });
          }}
          label="비밀번호 확인"
          name="passwordConfirm"
          type="password"
          style={passwordCheck ? {} : { backgroundColor: "#F9E3E3" }}
        />
      </InputAndButton>
      <Message>
        {passwordCheck ? "" : "입력한 비밀번호와 일치하지 않습니다."}
      </Message>

      <InputAndButton>
        <InputWithLabel
          onChange={(event) => {
            setInfo({
              ...info,
              nickname: event.target.value,
            });
          }}
          label="닉네임"
          name="nickname"
        />
        <Button
          onClick={(e) => CheckRepetition(e.target.id, info.nickname)}
          id="nickname"
        >
          중복확인
        </Button>
      </InputAndButton>

      <AuthButton
        style={{
          border: "1px #44ADF7 solid",
          fontSize: "16px",
          padding: "10px",
        }}
        onClick={() => TryRegister(info)}
      >
        인증하고 시작하기
      </AuthButton>
    </AuthContent>
  );
};

export default Register;
