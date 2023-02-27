import axios from "axios";
import { KAKAO_AUTH_URL } from "./OAuth.js";

axios.defaults.withCredentials = true;

export default async function TrySocialLogin(site) {
  var url = "";

  const CLIENT_ID =
    "1037934278190-17b3othcsdmik8im5e1occ4u4kfpko2f.apps.googleusercontent.com";

  if (site === "google") {
    window.location.href =
      "https://accounts.google.com/o/oauth2/auth?" +
      `client_id=${CLIENT_ID}&` +
      `redirect_uri=${"https://www.sasm.co.kr/googleredirect/"}&` +
      "response_type=token&" +
      "scope=https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile";
  }
  if (site === "naver") {
    const NAVER_CLIENT_ID = "MPnY9ztwWhnUTEk5HXdO";
    const NAVER_REDIRECT_URI = "https://sasm.co.kr/auth/naver/callback";
    const NAVER_STATE = "test";
    window.location.href = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${NAVER_CLIENT_ID}&redirect_uri=${NAVER_REDIRECT_URI}&state=${NAVER_STATE}`;

  }
  if (site === "kakaotalk") {
    window.location.href = KAKAO_AUTH_URL;
  }
}
