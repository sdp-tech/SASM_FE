import React from "react";
import { useDispatch } from "react-redux";
import Navibar from "../../common/Navibar";
import axios from "axios";

// import { kakaoLogin } from "../../../functions/Auth/TrySocialLogin";
import styled from "styled-components";

const Sections = styled.div`
  box-sizing: border-box;
  display: grid;
  position: relative;
  height: 100vh;
  grid-template-rows: 0.15fr 0.85fr;
  grid-template-areas:
    "navibar"
    "auth";
`;
const kakaoLogin = (code) => {
  console.log(code, 1);
  axios({
    method: "GET",
    url: `http://api.sasmbe.com/users/kakao/callback/?code=${code}`,
  })
    .then((res) => {
      console.log(1);
      console.log(res); // 토큰이 넘어올 것임

      const ACCESS_TOKEN = res.data.accessToken;

      localStorage.setItem("token", ACCESS_TOKEN); //예시로 로컬에 저장함

      window.href.replace("/map"); // 토큰 받았았고 로그인됐으니 화면 전환시켜줌(메인으로)
    })
    .catch((err) => {
      console.log("소셜로그인 에러", err);
      window.alert("로그인에 실패하였습니다.");
      // history.replace("/users/"); // 로그인 실패하면 로그인화면으로 돌려보냄
    });
};

const KakaoRedirect = (props) => {
  // const dispatch = useDispatch();

  // 인가코드
  let code = new URL(window.location.href).searchParams.get("code");
  console.log(code);
  kakaoLogin(code);
  // React.useEffect(async () => {
  //   await kakaoLogin(code);
  // }, []);

  return (
    <>
      <Sections>
        <Navibar />
      </Sections>
    </>
  );
};

export default KakaoRedirect;
