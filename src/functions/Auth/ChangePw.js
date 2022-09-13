import axios from "axios";

export default async function ChangePw(info) {
  const url = "http://127.0.0.1:8000/users/pwchange/";
  if (info.code && info.password) {
    try {
      const response = await axios.post(url, {
        code: info.code,
        password: info.password,
      });

      // console.log("response", response.data);
      return response;
    } catch (err) {
      console.log("Error >>", err);
    }
  } else return { meassge: "fail" };
}
