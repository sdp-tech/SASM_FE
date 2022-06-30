import { color } from "@mui/system";
import React, { useState } from "react";
import CheckLogin from "../../functions/Auth/CheckLogin";
import {
  AuthContent,
  InputWithLabel,
  AuthButton,
  RightAlignedLink,
  AuthWrapper,
} from "./module";
import styled from "styled-components";

const Wrapper = styled.div`
  width: 100%;

  // transform: translate(70%, 20%);

  //   margin-top: 3rem;
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

const FindID = () => {
  const [info, setInfo] = useState({});

  return (
    <>
      <Wrapper>
        <div>SASM은 이메일을 아이디로 사용합니다.</div>
        <div>소유하신 이메일을 입력하시면,</div>
        <div>가입여부를 알려드립니다.</div>
      </Wrapper>

      <InputWithLabel
        onChange={(event) => {
          setInfo({
            ...info,
            email: event.target.value,
          });
        }}
        name="email"
        placeholder="Email"
      />

      <AuthButton
        style={{
          color: "#FFFFFF",
          backgroundColor: "#5480E5",
          boxShadow:
            "0px 4px 4px rgba(51, 51, 51, 0.04), 0px 4px 16px rgba(51, 51, 51, 0.08)",
          border: "none",
          fontSize: "16px",
          padding: "10px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          borderRadius: "4px",
          transform: "translate(-1.5%, 50%)",
        }}
        onClick={() => CheckLogin(info)}
      >
        확인
      </AuthButton>
    </>
  );
};

export default FindID;
