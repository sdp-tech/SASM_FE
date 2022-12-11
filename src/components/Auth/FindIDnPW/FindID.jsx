import React from "react";
import { InputWithLabel, AuthButton } from "../module";
import styled from "styled-components";
import SasmLogo from '../../../assets/img/sasm_logo.png'

const Wrapper = styled.div`
  width: 100%;

  // transform: translate(70%, 20%);

  margin-bottom: 3%;
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

const FindID = ({ TryFindEmail, handleId }) => {
  return (
    <>
      <Wrapper>
        <img style={{ width: '10%', margin: '3% 0' }} src={SasmLogo} />
        <div>SASM은 이메일을 아이디로 사용합니다.</div>
        <div>소유하신 이메일을 입력하시면,</div>
        <div>가입여부를 알려드립니다.</div>
      </Wrapper>
      <InputWithLabel onChange={handleId} name="email" placeholder="Email" />
      <AuthButton
        style={{
          border:'none',
          backgroundColor:"#44ADF7",
          borderRadius:'4px',
          color:'white',
          marginTop:'3%'
        }}
        onClick={TryFindEmail}
      >
        확인
      </AuthButton>
    </>
  );
};

export default FindID;
