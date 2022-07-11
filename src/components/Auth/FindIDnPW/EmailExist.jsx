import React from "react";
import { AuthButton } from "../module";
import { useNavigate } from 'react-router-dom'
import styled from "styled-components";
import PageRedirection from "../../../functions/common/PageRedirection";

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

const EmailExist = (id) => {

  const navigate = useNavigate() 

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
        <div>회원으로 등록된 이메일 아이디입니다.</div>
        <div>해당 이메일로 로그인하고 SASM을 이용하세요.</div>
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
        onClick={() => PageRedirection(navigate, "LOG IN")}
      >
        로그인
      </AuthButton>
    </>
  );
};

export default EmailExist;
