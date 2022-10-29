import axios from "axios";

export default async function TryLogin(info) {
  const url = "https://3.38.89.18/users/login/";

  if (info.email && info.password) {
    console.log(info);

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
