import axios from "axios"

export default async function TryRegister(info) {
  const url = process.env.SASM_API_URL + '/users/signup/'

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