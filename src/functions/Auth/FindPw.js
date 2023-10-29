//비밀번호 찾기 서버 연결

import axios from "axios";
export default async function FindPw(pw) {
  const url = process.env.REACT_APP_SASM_API_URL + "/users/find_pw/";

  return await axios
    .post(url, {
      email: pw.email,
    })
    .then(function (res) {
      // console.log(res);
    })
    .catch(function (error) {
      console.log(error);
    });
}
