import React, { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie';
import Request from '../../../functions/common/Request'
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Wrapper = styled.div`
    position:relative;
    width:80%;
    margin:10px auto;
`

const TextArea = styled.textarea`
    display:block;
    margin:0;
    height:100%;
    width:90%;
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
    width:10%;
    border:1px black solid;
    background-color:#fff;
`

export default function WriteComment({ id, target, mode }) {
    const [like, setLike] = useState(false);
    const [loading, setLoading] = useState(true);
    const [cookies, setCookie, removeCookie] = useCookies(["name"]);
    const [data, setData] = useState(null);
    // const token = cookies.name; // 쿠키에서 id 를 꺼내기
    const token = localStorage.getItem("accessTK"); //localStorage에서 accesstoken꺼내기
    const navigate = useNavigate();
    const request = new Request(cookies, localStorage, navigate);

    const uploadComment = async (event) => {
        const response = await request.post("/stories/comments/", {
            story: id,
            content: event.target.text.value,
        }, null);
        console.log(response);
    }
    const updateComment = async (event) => {
        event.preventDefault();
        const response = await request.patch(`/stories/comments/${target}`, {
            story: id,
            content: event.target.text.value,
        }, null);
        console.log(response);
    }
    const getComment = async () => {
        setLoading(true);
        const response = await request.get(`/stories/comments/${target}`, null, null);
        setData(response.data.data);
        setLoading(false);
    }
    useEffect(() => {
        if (mode == 'update') {
            getComment();
        }
    }, [target]);
    if (mode == 'write') {
        return (
            <Wrapper>
                <form onSubmit={(event) => {
                    uploadComment(event);
                }}>
                    <TextArea id='text' placeholder='리뷰를 작성해보세요'></TextArea>
                    <SubmitBtn type='submit'>제출</SubmitBtn>
                </form>
            </Wrapper>
        )
    }
    else if (mode == 'update') {
        return (
            <>
                {
                    loading ?
                        null : <Wrapper>
                            <form onSubmit={(event) => {
                                updateComment(event);
                            }}>
                                <TextArea id='text' placeholder={data.content}></TextArea>
                                <SubmitBtn type='submit'>제출</SubmitBtn>
                            </form>
                        </Wrapper>
                }
            </>
        )
    }
}
