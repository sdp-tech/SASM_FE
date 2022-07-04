//아이디 찾기 서버 연결

import axios from "axios";
export default async function FindId(id) {
  const url = "http://127.0.0.1:8000/users/findid/";

  await axios
    .post(url, {
      email: id.email,
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
