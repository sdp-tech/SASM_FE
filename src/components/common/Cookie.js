import { Cookies } from "react-cookie";
const cookies = new Cookies();

export const setCookie = (name, value, option) => {
  //   console.log("1", name, value, option);
  return cookies.set(name, value, { ...option });
};
export const getCookie = (name) => {
  //   alert("2", name);
  return cookies.get(name);
};
