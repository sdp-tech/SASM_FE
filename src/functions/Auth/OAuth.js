//카카오 로그인 url 페이지

const BASE_URL = "https://sasm.co.kr/";

const KAKAO_CALLBACK_URI = BASE_URL + "users/kakao/callback/";

const CLIENT_ID = "c7a34e2bccc9bf9d8cf67cd940cc039a";
export const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${KAKAO_CALLBACK_URI}&response_type=code`;
