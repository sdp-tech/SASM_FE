import React, { useState, useContext } from "react";
import Navibar from "../../common/Navibar";
import axios from "axios";
import { LoginContext } from "../../../contexts/LoginContexts";
import { useNavigate } from "react-router";
import { useCookies } from "react-cookie";

// import { KakaoLogin } from "../../../functions/Auth/TrySocialLogin";
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
const KakaoLogin = (code) => {
  // console.log(code, 1);

  const [login, setLogin] = useContext(LoginContext);
  const [cookies, setCookie] = useCookies(["name"]); // 쿠키 훅
  const navigate = useNavigate();

  const KakaoClick = async (code) => {
    // const data = await axios.get(
    //   process.env.REACT_APP_SASM_API_URL + `/users/kakao/callback/?code=${code}`
    // );
    // console.log(data);
    axios({
      method: "GET",
      url:
        process.env.REACT_APP_SASM_API_URL +
        `/users/kakao/callback/?code=${code}`,
    })
      .then((res) => {
        // console.log("성공");
        // console.log(res); // 토큰이 넘어올 것임

        const access = res.data.data.access;
        const nickname = res.data.data.nickname;
        const refresh = res.data.data.refresh;

        // localStorage.setItem("token", ACCESS_TOKEN); //예시로 로컬에 저장함

        console.log("로그인 성공!!");

        //#####

        setLogin({
          ...login,
          loggedIn: true,
          // token :res.token
          refresh: res.data.data.refresh,
          access: res.data.data.access,
          nickname: res.data.data.nickname,
        });
        localStorage.setItem("nickname", res.data.data.nickname); //닉네임 따로 저장
        localStorage.setItem("accessTK", res.data.data.access); //access token 따로 저장
        // console.log(res.data.data.nickname, 111);
        // setCookie("name", access);
        // console.log("refresh: ", refresh);
        setCookie("name", refresh);

        // console.log("쿠키 설정 완료");
        // console.log("화면 전환");
        navigate("/map");
        // window.location.replace("/"); // 토큰 받았았고 로그인됐으니 화면 전환시켜줌(메인으로)
      })
      .catch((err) => {
        console.log("소셜로그인 에러", err);
        window.alert("로그인에 실패하였습니다.");
        // history.replace("/users/"); // 로그인 실패하면 로그인화면으로 돌려보냄
      });
  };

  KakaoClick(code);
};

var n = 0;
const KakaoRedirect = (props) => {
  // const dispatch = useDispatch();

  // 인가코드
  let code = new URL(window.location.href).searchParams.get("code");
  // console.log(code, n);

  if (n == 0) {
    KakaoLogin(code);
    // console.log("요청넣기");
  }
  // React.useEffect(async () => {
  //   await KakaoLogin(code);
  // }, []);
  n = n + 1;
  return (
    <>
      <Sections>
        <Navibar />
      </Sections>
    </>
  );
};

export default KakaoRedirect;
