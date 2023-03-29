import axios from "axios";

export default async function CheckRepetition(type, data) {

  const url = process.env.REACT_APP_SASM_API_URL + '/users/rep_check/'

  var new_data = {}

  if (type === 'email') {
    new_data = {
      type: type,
      value: data
    }
  }

  if (type === 'nickname') {
    new_data = {
      type: type,
      value: data
    }
  }

  await axios.post(url, new_data)
    .then(function (res) {
      console.log(res);
      // if(res.data === '존재하는 이메일입니다')
      alert(res.data.data)
    })
    .catch(function (error) {
      console.log(error);
    })
};