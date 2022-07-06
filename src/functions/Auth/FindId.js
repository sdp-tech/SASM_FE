//아이디 찾기 서버 연결

import axios from "axios";
export default async function FindId(id) {
  const url = "http://127.0.0.1:8000/users/findid/";
  return await axios
    .post(url, {
      email: id.email,
    })
    .then(function (res) {
      if (res.data === "존재하는 이메일입니다") {
        console.log("exist");
      }
      return [res.data, id];
      // window.location.href = "/map";
    })
    .catch(function (error) {
      console.log(error);
    });
}
