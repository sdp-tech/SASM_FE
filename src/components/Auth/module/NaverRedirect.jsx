import React, { useState, useContext, useEffect } from "react";

import axios from "axios";
import { LoginContext } from "../../../contexts/LoginContexts";
import { useNavigate } from "react-router";


const NaverCallback = (props) => {
    const [login, setLogin] = useContext(LoginContext);
    const navigate = useNavigate();

    useEffect(async () => {
        // 인가코드
        const code = new URL(window.location.href).searchParams.get("code");
        await axios({
            method: "GET",
            url:
                process.env.REACT_APP_SASM_API_URL +
                `/users/naver/callback/?code=${code}`,
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
                localStorage.setItem("refreshTK", res.data.data.refresh);

                navigate("/map?page=1");
            })
            .catch((err) => {
                window.alert("로그인에 실패하였습니다.");
                navigate("/auth");
            });
    }, []);

    return (
        <>
        </>
    );
};

export default NaverCallback;
