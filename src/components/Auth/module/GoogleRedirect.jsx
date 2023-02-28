import React, { useState, useContext } from "react";

import axios from "axios";
import { useEffect } from "react";
import { LoginContext } from "../../../contexts/LoginContexts";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

const GoogleRedirect = () => {
  const navigate = useNavigate();
  const [login, setLogin] = useContext(LoginContext);
  const [cookies, setCookie] = useCookies(["name"]);

  useEffect(async () => {
    const parsedHash = new URLSearchParams(window.location.hash.substring(1));
    const accessToken = parsedHash.get("access_token");

    await axios({
      method: "GET",
      url:
        process.env.REACT_APP_SASM_API_URL +
        `/users/google/callback/?access_token=${accessToken}`,
    })
      .then((res) => {
        setLogin({
          ...login,
          loggedIn: true,
          refresh: res.data.data.refresh,
          access: res.data.data.access,
          nickname: res.data.data.nickname,
        });
        localStorage.setItem("nickname", res.data.data.nickname);
        localStorage.setItem("accessTK", res.data.data.access);
        setCookie("name", res.data.data.refresh);

        navigate("/map");
      })
      .catch((err) => {
        window.alert("로그인에 실패하였습니다.");
        console.log(accessToken)
        navigate("/auth");
      });
  }, []);
  return <>
  </>
};

export default GoogleRedirect;
