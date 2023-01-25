import React, { useState, useEffect } from 'react'
import styled from 'styled-components';
import Community from "../components/Community/Community"
import checkSasmAdmin from '../components/Admin/Common';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';

export default function SpotCommunity() {
    const [isSasmAdmin, setIsSasmAdmin] = useState(false);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [cookies, setCookie, removeCookie] = useCookies(["name"]);
    // const token = cookies.name;
    const token = localStorage.getItem("accessTK"); //localStorage에서 accesstoken꺼내기
    useEffect(() => {
        checkSasmAdmin(token, setLoading, cookies, localStorage, navigate).then((result) => setIsSasmAdmin(result));
    }, []);
    return (
        <>
            {isSasmAdmin ?
                <Sections>
                    <Community></Community>
                </Sections> :
                null
            }
        </>
    )
}

const Sections = styled.div`
box-sizing: border-box;
height: calc(100vh - 64px);
`;
