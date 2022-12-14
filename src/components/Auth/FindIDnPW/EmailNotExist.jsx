import React from "react";
import { AuthButton } from "../module";
import { useNavigate } from 'react-router-dom'
import SasmLogo from "../../../assets/img/sasm_logo.png"
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

const EmailNotExist = ({ id, handleAnotherEmail }) => {
  const navigate = useNavigate()

  return (
    <>
      <Wrapper>

        <img style={{ width: '10%', margin: '3% 0' }} src={SasmLogo} />
        <div
          style={{
            height: "30px",
            fontWeight: "600",
            margin: "auto",
          }}
        >
          {id.email}
        </div>
        <br />
        <div>는 SASM에 등록되지 않은 이메일입니다.</div>
        <div>회원가입을 하거나 다른 계정을 입력해보세요.</div>
      </Wrapper>

      <AuthButton
        style={{
          border: 'none',
          backgroundColor: "#44ADF7",
          borderRadius: '4px',
          color: 'white',
          marginTop: '3%',
          marginBottom: '3%'
        }}
        onClick={() => PageRedirection(navigate, "JOIN")}
      >
        회원가입하기
      </AuthButton>

      <AuthButton
        style={{
          border: 'none',
          boxShadow: '2px 2px 4px rgba(0,0,0,0.15)',
          borderRadius: '4px',
          marginTop: '1%',
        }}
        onClick={() => navigate('../')}
      >
        다른 이메일로 확인
      </AuthButton>
    </>
  );
};

export default EmailNotExist;
