import axios from "axios";

export default async function TryLogin(info) {
  const url = 'http://127.0.0.1:8000/users/login/'

  if(info.email && info.password){

    console.log(info);
    
    return await axios.post(url, {
      email: info.email,
      password: info.password
    })
    .then(function (res) {
      return res.data
    })
    .catch(function (error) {
      console.log(error);
    })
  }
  else
    return {meassge: 'fail'}
};