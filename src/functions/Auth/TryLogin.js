import axios from "axios";

export default async function TryLogin(info) {
  const url = process.env.REACT_APP_SASM_API_URL + "/users/login/";

  if (info.email && info.password) {

    return await axios
      .post(url, {
        email: info.email,
        password: info.password,
      })
      .then(function (res) {
        return res.data;
      })
      .catch(function (error) {
        console.log(error);
      });
  } else return { meassge: "fail" };
}
