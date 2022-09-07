import React, { useState } from "react";
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

const InputAndButton = styled.div`
  position: relative;
  display: flex;
  flex-wrap: nowrap;
  align-items: end;
  width: 100%;
  margin-top: 0.8em;
  margin-bottom: 0.8em;
`;

const Button = styled.div`
  background-color: rgba(84, 128, 229, 1);
  height: 100%;
  text-align: center;
  line-height: 3;
  border-radius: 4px;
  font-size: 16px;
  color: white;

  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.1em;
  cursor: pointer;
  flex-grow: 0.5;
  margin-left: 1em;
`;
const Message = styled.div`
  font-size: 0.2em;
  //   margin-top: 1.1em;
  color: #db524e;
`;

const year = ["년도"];
const month = ["월"];
const day = ["일"];
for (var i = 1950; i <= new Date().getFullYear(); i++) year.push(i.toString());
for (var i = 1; i <= 12; i++) {
  if (i <= 9) month.push("0" + i.toString());
  else month.push(i.toString());
}
for (var i = 1; i <= 31; i++) {
  if (i <= 9) day.push("0" + i.toString());
  else day.push(i.toString());
}

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

  // 이메일 체크
  var emailCheck = false;
  for (const format of emailFormat) {
    if (info.email.includes(format) || info.email === "") {
      emailCheck = true;
      break;
    }
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

      <InputAndButton>
        <SelectWithLabel
          label="생년월일 (선택)"
          item1={year}
          item2={month}
          item3={day}
          onChange={() => {
            let birthdate = "";
            const items = document.getElementsByClassName("birthdate");

            for (let i = 0; i < items.length; i++) {
              if (i == items.length - 1) {
                birthdate += items[i].value;
              } else {
                birthdate = birthdate + items[i].value + "-";
              }
            }
            // for (const item of items) birthdate = birthdate + item.value + "-";
            setInfo({
              ...info,
              birthdate: birthdate,
            });
          }}
        />
      </InputAndButton>

      <AuthButton
        style={{
          color: "rgba(84, 128, 229, 1)",
          boxShadow:
            "0px 4px 4px rgba(51, 51, 51, 0.04), 0px 4px 16px rgba(51, 51, 51, 0.08)",
          border: "none",
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
