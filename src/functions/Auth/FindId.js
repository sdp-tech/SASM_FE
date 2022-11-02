//아이디 찾기 서버 연결

import axios from "axios";
export default async function FindId(id) {
  const url = process.env.REACT_APP_SASM_API_URL + "/users/findid/";
  return await axios
    .post(url, {
      email: id.email,
    })
    .then(function (res) {
      return [res.data, id];
    })
    .catch(function (error) {
      console.log(error);
    });
}
