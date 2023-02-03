import axios from "axios";
import { KAKAO_AUTH_URL } from "./OAuth.js";

axios.defaults.withCredentials = true;

export default async function TrySocialLogin(site) {
  var url = "";

  const CLIENT_ID =
    "331125329639-06aq4tbiph820egb15e305gj16ds5avb.apps.googleusercontent.com";

  if (site === "google") {
    window.location.href =
      "https://accounts.google.com/o/oauth2/auth?" +
      `client_id=${CLIENT_ID}&` +
      `redirect_uri=${"https://www.sasm.co.kr/googleredirect"}&` +
      "response_type=token&" +
      "scope=https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile";
  }
  if (site === "naver")
    // url = 'naver_url'
    url = "http://www.naver.com";
  if (site === "kakaotalk") {
    window.location.href = KAKAO_AUTH_URL; //OAuth.js에 url 가져오기
  }

  // console.log(url);
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
