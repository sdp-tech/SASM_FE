import { color } from "@mui/system";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import FindPw from "../../../functions/Auth/FindPw";
import {
  AuthContent,
  InputWithLabel,
  AuthButton,
  RightAlignedLink,
} from "../module";

import styled from "styled-components";
import FindId from "../../../functions/Auth/FindId";
import { Navigate } from "react-router-dom";
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

const FindPW = ({TryFindPassword, handleId}) => {
  const [pw, setPw] = useState({});
  const [pressed, setPressed] = useState(false)

  const navigate = useNavigate()

  return (
    <>
      <Wrapper>
        <img style={{width:'10%', margin:'3% 0'}} src={SasmLogo}/>
        <div>가입하셨던 이메일 계정을 입력하시면,</div>
        <div>비밀번호를 새로 만들 수 있는 링크를</div>
        <div>이메일로 발송해드립니다.</div>
      </Wrapper>

      <InputWithLabel onChange={handleId} name="email" placeholder="Email"/>

      <AuthButton
        style={{
          border:'none',
          backgroundColor:"#44ADF7",
          borderRadius:'4px',
          color:'white',
          marginTop:'3%'
        }}
        onClick={TryFindPassword}
      >
        {pressed? '링크 재발송하기': '링크 발송하기'}
      </AuthButton>
    </>
  );
};

export default FindPW;
