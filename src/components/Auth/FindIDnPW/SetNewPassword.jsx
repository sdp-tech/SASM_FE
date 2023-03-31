import React, { useState, useEffect } from "react";
import { AuthButton, InputWithLabel } from "../module";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import PageRedirection from "../../../functions/common/PageRedirection";
import ResetPw from "../../../functions/Auth/ResetPw";
import { AltRoute } from "@mui/icons-material";
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
`;
const Message = styled.div`
  font-size: 0.2em;
  //   margin-top: 1.1em;
  color: #db524e;
`;

const SetNewPassword = () => {
  const [info, setInfo] = useState("");
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const navigate = useNavigate();

  // 비밀번호 확인 체크
  var passwordCheck = false;
  if (password === passwordConfirm || passwordConfirm === "")
    passwordCheck = true;

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
        <div>새로운 비밀번호를 입력해 주세요.</div>
      </Wrapper>
      <>
        <form>
          <InputAndButton>
            <InputWithLabel
              onChange={(event) => {
                // setCode(event.target.value);
                setInfo({
                  ...info,
                  code: event.target.value,
                });
              }}
              label="인증번호"
              name="code"
              type="code"
            />
          </InputAndButton>
          <InputAndButton>
            <InputWithLabel
              onChange={(event) => {
                setPassword(event.target.value);
                setInfo({
                  ...info,
                  password: event.target.value,
                });
              }}
              placeholder="새로운 비밀번호"
              name="password"
              type="password"
            />
          </InputAndButton>

          <InputAndButton>
            <InputWithLabel
              onChange={(event) => {
                setPasswordConfirm(event.target.value);
              }}
              placeholder="새로운 비밀번호 확인"
              name="passwordConfirm"
              type="password"
              style={passwordCheck ? {} : { backgroundColor: "#F9E3E3" }}
            />
          </InputAndButton>
          <Message>
            {passwordCheck ? "" : "입력한 비밀번호와 일치하지 않습니다."}
          </Message>

          <AuthButton
            style={{
              border: 'none',
              backgroundColor: "#44ADF7",
              borderRadius: '4px',
              color: 'white',
            }}
            onClick={async () => {
              const res = await ResetPw(info);
              console.log("res!!!!!", res);
              if (res.data.status === "success") {
                alert(
                  "비밀번호가 새롭게 설정되었습니다. 로그인 후 이용해주세요"
                );
                PageRedirection(navigate, "LOG IN");
              } else if (res.data.status === "error") {
                alert("인증번호가 일치하지 않습니다.");
              } else if (res.data.status === "fail") {
                alert("기존 비밀번호와 일치합니다.");
              }
            }}
          >
            완료
          </AuthButton>
        </form>
      </>
    </>
  );
};

export default SetNewPassword;
