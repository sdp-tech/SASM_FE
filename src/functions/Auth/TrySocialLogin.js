import axios from "axios";
import { KAKAO_AUTH_URL } from "./OAuth.js";

axios.defaults.withCredentials = true;

// export const kakaoLogin = (code) => {
//   return function (dispatch, getState, { history }) {
//     console.log(code, 1);
//     axios({
//       method: "GET",
//       url: `http://api.sasmbe.com/users/kakao/callback/?code=${code}`,
//     })
//       .then((res) => {
//         console.log(1);
//         console.log(res); // 토큰이 넘어올 것임

//         const ACCESS_TOKEN = res.data.accessToken;

//         localStorage.setItem("token", ACCESS_TOKEN); //예시로 로컬에 저장함

//         history.replace("/map"); // 토큰 받았았고 로그인됐으니 화면 전환시켜줌(메인으로)
//       })
//       .catch((err) => {
//         console.log("소셜로그인 에러", err);
//         window.alert("로그인에 실패하였습니다.");
//         history.replace("/users/"); // 로그인 실패하면 로그인화면으로 돌려보냄
//       });
//   };
// };

export default async function TrySocialLogin(site) {
  var url = "";
  if (site === "google")
    url = process.env.REACT_APP_SASM_API_URL + "/users/google/login/";
  // url = '/o/oauth2/v2/auth/oauthchooseaccount?client_id=1037934278190-17b3othcsdmik8im5e1occ4u4kfpko2f.apps.googleusercontent.com&response_type=code&redirect_uri=http%3A%2F%2F127.0.0.1%3A8000%2Fusers%2Fgoogle%2Fcallback%2F&scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email&flowName=GeneralOAuthFlow'
  // url = 'https://accounts.google.com'
  // url = '/'

  if (site === "naver")
    // url = 'naver_url'
    url = "http://www.naver.com";
  if (site === "kakaotalk") {
    window.location.href = KAKAO_AUTH_URL;
  } //OAuth.js에 url 저장;

  console.log(url);

  // await axios
  //   .get(url, {
  //     header: {
  //       "Access-Control-Allow-Origin": "https://accounts.google.com",
  //     },
  //   })
  //   .then(function (res) {
  //     console.log(res);
  //   })
  //   .catch(function (error) {
  //     console.log(error);
  //   });
}
