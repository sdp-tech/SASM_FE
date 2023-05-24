import React, { useState, useEffect } from "react";
import { AuthButton, InputWithLabel } from "../module";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Request from "../../../functions/common/Request";
import { useCookies } from "react-cookie";
import PageRedirection from "../../../functions/common/PageRedirection";
import { AltRoute } from "@mui/icons-material";
const Div = styled.div`
  margin: 7% auto;
  padding: 2rem;
  width: 33%;
  height: auto;
  justify-content: center;
  box-shadow: rgba(0, 0, 0, 0.15) 2px 2px 4px; 
`
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
  width: auto;
  margin-top: 0.8em;
  margin-bottom: 0.8em;
  justify-content: center;
`;
const Message = styled.div`
  font-size: 0.2em;
  //   margin-top: 1.1em;
  color: #db524e;
`;
const ChangePassword = () => {
  const [info, setInfo] = useState("");
  const [password, setPassword] = useState("");
  const [cookies, setCookie, removeCookie] = useCookies(["name"]);
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const navigate = useNavigate();
  const token = localStorage.getItem("accessTK"); //localStorage에서 accesstoken꺼내기
  const request = new Request(cookies, localStorage, navigate);

  // 비밀번호 확인 체크
  var passwordCheck = false;
  if (password === passwordConfirm || passwordConfirm === "")
    passwordCheck = true;

  return (
    <>
      <Div>
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
                if (password === passwordConfirm) {
                  const response = await request.put('/users/pw_change/', {
                    password: password,
                    password_confirm: passwordConfirm,
                  });
                  if (response.data.status === "success") {
                    alert("비밀번호가 새롭게 설정되었습니다. 로그인 후 이용해주세요");
                    removeCookie("name"); // 쿠키 삭제
                    localStorage.removeItem("accessTK"); //access token 삭제
                    localStorage.removeItem("nickname"); //nickname 삭제
                    localStorage.removeItem("email"); //email 삭제
                    PageRedirection(navigate, "LOG IN");
                  }
                } else {
                  alert( "입력한 비밀번호와 일치하지 않습니다.");
                }
              }}
            >
              완료
            </AuthButton>
          </form>
        </>
      </Div>
    </>
  );
};

export default ChangePassword;
