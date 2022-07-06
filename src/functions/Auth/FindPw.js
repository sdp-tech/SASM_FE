//비밀번호 찾기 서버 연결

import axios from "axios";
export default async function FindPw(pw) {
  const url = "http://127.0.0.1:8000/users/find_pw/";

  await axios
    .post(url, {
      email: pw.email,
    })
    .then(function (res) {
      alert(res.data);
      // window.location.href = "/map";
    })
    .catch(function (error) {
      console.log(error);
    });
}
