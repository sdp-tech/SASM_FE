import axios from "axios"

export default async function TryRegister(info) {
  const url = 'http://127.0.0.1:8000/users/signup/'

  console.log(info)
  alert("회원가입 인증 메일을 확인해주세요 : )")

  await axios.post(url, info)
    .then(function (res) {
      console.log(res);
      window.location.href = "/auth";


    })
    .catch(function (error) {
      console.log(error);
      alert("회원가입 실패")
    })

}