import axios from "axios";

export default async function TrySocialLogin(site){
  
  var url = ''
  if(site === 'google')
    url = 'google_url'
  if(site === 'naver')
    url = 'naver_url'
  if(site === 'kakaotalk')
    url = 'kakaotalk_url'

  console.log(url);
  
  // await axios.post(url, {
  //   email: info.email,
  //   password: info.password
  // })
  // .then(function(res){
  //   console.log(res.data.body);
  // })
  // .catch(function(error){
  //   console.log(error);
  // })
};