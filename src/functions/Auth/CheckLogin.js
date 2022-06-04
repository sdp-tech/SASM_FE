import axios from "axios";

export default async function CheckLogin(info) {
  const url = 'http://127.0.0.1:8000/users/login/'


  await axios.post(url, {
    email: info.email,
    password: info.password
  })
    .then(function (res) {
      console.log(res.data.success);
      window.location.href = "/map";
    })
    .catch(function (error) {
      console.log(error);
    })
};