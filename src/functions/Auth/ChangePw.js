import axios from "axios";

export default async function ChangePw(info) {
  const url = process.env.REACT_APP_SASM_API_URL + "/users/pwchange/";
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
