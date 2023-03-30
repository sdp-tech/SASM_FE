import axios from "axios";

export default async function ResetPw(info) {
  const url = process.env.REACT_APP_SASM_API_URL + "/users/pw_reset/";
  if (info.code && info.password) {
    try {
      const response = await axios.put(url, {
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
