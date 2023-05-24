import axios from "axios";

axios.defaults.withCredentials = true;

export default async function TrySocialLogin(site) {
  if (site === "google") {
    const GOOGLE_CLIENT_ID = "1065105720127-4eqoid2c2a89s2pal07gecfldte3sjjn.apps.googleusercontent.com";
    const GOOGLE_REDIRECT_URI = "https://www.sasm.co.kr/auth/google/callback";
    window.location.href = `https://accounts.google.com/o/oauth2/auth?client_id=${GOOGLE_CLIENT_ID}&redirect_uri=${GOOGLE_REDIRECT_URI}&response_type=token&scope=https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile`
  }
  if (site === "naver") {
    const NAVER_CLIENT_ID = "MPnY9ztwWhnUTEk5HXdO";
    const NAVER_REDIRECT_URI = "https://www.sasm.co.kr/auth/naver/callback";
    const NAVER_STATE = "test";
    window.location.href = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${NAVER_CLIENT_ID}&redirect_uri=${NAVER_REDIRECT_URI}&state=${NAVER_STATE}`;

  }
  if (site === "kakao") {
    const KAKAO_CLIENT_ID = "7fcf4129e14411d85f4468cbffae48c0";
    const KAKAO_REDIRECT_URI = "https://www.sasm.co.kr/auth/kakao/callback/";
    window.location.href = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_CLIENT_ID}&redirect_uri=${KAKAO_REDIRECT_URI}&response_type=code`;
  }
}
