//아이디/비밀번호 찾기 서버 로직 확인 필요

import axios from "axios";
export default async function FindId(id) {
  const url = "http://127.0.0.1:8000/users/findid";

  await axios
    .put(url, {
      email: id.email,
      //   password: id.password,
    })
    .then(function (res) {
      console.log(res.data.success);
      alert(res.data);
      // window.location.href = "/map";
    })
    .catch(function (error) {
      console.log(error);
    });
}
