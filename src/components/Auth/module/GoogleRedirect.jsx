import React, { useState, useContext } from "react";

import axios from "axios";
import { useEffect } from "react";
import { LoginContext } from "../../../contexts/LoginContexts";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import Loading from "../../common/Loading";

const GoogleRedirect = () => {
  const navigate = useNavigate();
  const parsedHash = new URLSearchParams(window.location.hash.substring(1));
  const accessToken = parsedHash.get("access_token");
  const [login, setLogin] = useContext(LoginContext);
  const [cookies, setCookie] = useCookies(["name"]);

  console.log(accessToken);

  const GoogleUserInfoRequest = (accessToken) => {
    console.log(accessToken);
    axios
      .post(process.env.REACT_APP_SASM_API_URL + `/users/google/callback/`, {
        accessToken,
      })
      .then((res) => {
        // console.log(res);
        // console.log("로그인 성공!!");

        //#####
        const access = res.data.data.access;
        const nickname = res.data.data.nickname;
        const refresh = res.data.data.refresh;

        setLogin({
          ...login,
          loggedIn: true,
          // token :res.token
          refresh: res.data.data.refresh,
          access: res.data.data.access,
          nickname: res.data.data.nickname,
        });
        localStorage.setItem("nickname", res.data.data.nickname); //닉네임 따로 저장
        localStorage.setItem("accessTK", res.data.data.access); //access token 따로 저장
        setCookie("name", refresh);

        navigate("/map");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(async () => {
    await GoogleUserInfoRequest(accessToken);
    navigate("/");
  }, []);
  return (
    <div>
      <Loading />
    </div>
  );
};

export default GoogleRedirect;
