import React, { useState } from 'react'
import { useCookies } from 'react-cookie';
import Request from '../../../functions/common/Request'
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Wrapper = styled.div`
    position:relative;
    width:80%;
    margin:10px auto;
    @media screen and (max-width: 768px) {
        width: 100%;
    }
`

const TextArea = styled.textarea`
    display:block;
    margin:0;
    height:100%;
    width:80%;
    resize:none;
    outine-color:red;
    box-sizing:border-box;
    border-radius:none;
`

const SubmitBtn = styled.button`
    position:absolute;
    top:0;
    right:0;
    height:100%;
    width:20%;
    border:1px black solid;
    background-color:#fff;
`

export default function WriteComment({ id, mode, setMode, target }) {
    const [cookies, setCookie, removeCookie] = useCookies(["name"]);
    // const token = cookies.name; // 쿠키에서 id 를 꺼내기
    const token = localStorage.getItem("accessTK"); //localStorage에서 accesstoken꺼내기
    const navigate = useNavigate();
    const request = new Request(cookies, localStorage, navigate);
    const uploadComment = async (event) => {
        const response = await request.post("/stories/comments/", {
            story: id,
            content: event.target.text.value,
        });
    }
    const updateComment = async (event) => {
        const response = await request.patch(`/stories/comments/${target.id}`, {
            content: event.target.text.value,
        });
    }

    if (mode == 'write') {
        return (
            <Wrapper>
                <form onSubmit={(event) => {
                    uploadComment(event);
                    setMode('write');
                }}>
                    <TextArea id='text'></TextArea>
                    <SubmitBtn type='submit'>제출</SubmitBtn>
                </form>
            </Wrapper>
        )
    }
    else {
        return (
            <Wrapper>
                <form onSubmit={(event) => {
                    updateComment(event);
                }}>
                    <TextArea id='text' placeholder={target.content}></TextArea>
                    <SubmitBtn type='submit'>수정</SubmitBtn>
                </form>
            </Wrapper>
        )
    }
}
