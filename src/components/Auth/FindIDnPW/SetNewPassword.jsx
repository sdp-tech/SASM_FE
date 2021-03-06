import React, { useState, useEffect } from "react";
import { AuthButton, InputWithLabel } from "../module";
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
const InputAndButton = styled.div`
    position: relative;
    display: flex;
    flex-wrap: nowrap;
    align-items: end;
    width: 100%;
    margin-top: 0.8em;
    margin-bottom: 0.8em;
`
const Message = styled.div`
  font-size: 0.2em;
//   margin-top: 1.1em;
  color: #DB524E;
`

const SetNewPassword = () => {
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')
  const navigate = useNavigate() 

  // 비밀번호 확인 체크
  var passwordCheck = false
  if(password === passwordConfirm || passwordConfirm === '')
      passwordCheck = true

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
          비밀번호 재설정
        </div>
        <br />
        <div>새로 사용하기를 원하는 비밀번호를 입력해 주세요.</div>
      </Wrapper>
      
      <InputAndButton>
                <InputWithLabel 
                  onChange={(event)=>{setPassword(event.target.value)}}
                  label="새로운 비밀번호" name="password" type="password"
                />
      </InputAndButton>

      <InputAndButton>
                <InputWithLabel 
                  onChange={(event)=>{setPasswordConfirm(event.target.value)}}
                  label="새로운 비밀번호 확인" name="passwordConfirm" type="password"
                  style={passwordCheck?{} : {backgroundColor: '#F9E3E3'}}
                />
      </InputAndButton>
      <Message>
          {passwordCheck ? '' : '입력한 비밀번호와 일치하지 않습니다.'}
      </Message>

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
        onClick={() => {
          alert('비밀번호가 새롭게 설정되었습니다. 로그인 후 이용해주세요')
          PageRedirection(navigate, "LOG IN")
        }}
      >
        완료
      </AuthButton>
    </>
  );
};

export default SetNewPassword;
