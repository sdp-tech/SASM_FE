import React from "react";
import { AuthButton } from "./module";
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

const EmailNotExist = (id) => {
  const urlHash = {
    SASM: "",
    MAP: "map",
    STORY: "story",
    "MY PICK": "mypage",
    "LOG IN": "auth",
    JOIN: "auth/register",
  };
  const handlePageRedirection = (title) => {
    window.location.href = "/" + urlHash[title];
  };
  return (
    <>
      <Wrapper>
        <div
          style={{
            height: "30px",
            fontWeight: "600",
            margin: "auto",
          }}
        >
          {id.id.email}
        </div>
        <br />
        <div>는 SASM에 등록되지 않은 이메일입니다.</div>
        <div>회원가입을 하거나 다른 계정을 입력해보세요.</div>
      </Wrapper>

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
        onClick={() => handlePageRedirection("JOIN")}
      >
        회원가입하기
      </AuthButton>

      <AuthButton
        style={{
          color: "rgba(84, 128, 229, 1)",
          boxShadow:
            "0px 4px 4px rgba(51, 51, 51, 0.04), 0px 4px 16px rgba(51, 51, 51, 0.08)",
          border: "none",
          fontSize: "16px",
          padding: "10px",
          width: "100%",
          transform: "translate(-1.5%, 50%)",
        }}
        onClick={() => handlePageRedirection("LOG IN")}
      >
        다른 이메일로 확인
      </AuthButton>
    </>
  );
};

export default EmailNotExist;
