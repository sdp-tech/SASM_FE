import axios from "axios";

export default async function CheckLogin({email, password}){
  const url = 'https://6lro33prdc.execute-api.ap-northeast-2.amazonaws.com/prod/login'

  await axios.post(url, {
    email: email,
    password: password
  })
  .then(function(res){
    console.log(res.data.body);
  })
  .catch(function(error){
    console.log(error);
  })
};