import React, { useState } from 'react'
import { useCookies } from 'react-cookie';
import Request from '../../../functions/common/Request'
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Wrapper = styled.div`
    position:relative;
    width:80%;
    height: 3vh;
    margin:10px auto;
    @media screen and (max-width: 768px) {
        width: 100%;
    }
`
const Form = styled.form`
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: space-between;
`

const TextArea = styled.textarea`
    display:block;
    margin:0;
    width: 100%;
    margin-right: 3vw;
    height: 100%;
    resize:none;
    border: 1px rgba(0,0,0,0.3) solid;
    padding: 15px 30px;
    border-radius:1000px;
    ::placeholder,
    ::-webkit-input-placeholder {
        font-size: 0.75rem;
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        left: 5%;
    }
    :-ms-input-placeholder {
        font-size: 0.75rem;
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        left: 5%;
    }
    @media screen and (max-width: 768px) {
        padding: 0;
    }
`

const SubmitBtn = styled.button`
    cursor: pointer;
    border: none;
    font-size: 1.25rem;
    font-weight: 700;
    color: #FFFFFF;
    background-color: #767676;
    border-radius: 1000px;
    width: 15%;
    box-shadow: 2px 2px 4px rgba(0,0,0,0.3);
    @media screen and (max-width: 768px) {
        font-size: 0.75rem;
    }
`

export default function WriteComment({ id }) {
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

    return (
        <Wrapper>
            <Form onSubmit={(event) => {
                uploadComment(event);
            }}>
                <TextArea id='text' placeholder='댓글을 달아주세요.'></TextArea>
                <SubmitBtn type='submit'>제출</SubmitBtn>
            </Form>
        </Wrapper>
    )
}
