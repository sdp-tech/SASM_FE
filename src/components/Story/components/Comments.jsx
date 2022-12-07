import React, { useState } from 'react'
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import Request from '../../../functions/common/Request';

const Comment = styled.div`
    width: 70%;
    margin: 0 auto;
    border-bottom: 1px black solid;
    padding: 3px;
    padding-left: 10px;
    display: flex;
    position: relative;
`
const CommentText = styled.div`
    margin-left: ${props => props.marginLeft};
`
const ButtonWrapper = styled.div`
    position: absolute;
    right: 1%;
`
const Button = styled.button`
    border: none;
    background: none;
`

export default function Comments(props) {
    const [cookies, setCookie, removeCookie] = useCookies(["name"]);
    // const token = cookies.name; // 쿠키에서 id 를 꺼내기
    const token = localStorage.getItem("accessTK"); //localStorage에서 accesstoken꺼내기
    const navigate = useNavigate();
    const request = new Request(cookies, localStorage, navigate);
    const comment = props.comment;
    const setMode = (Mode) => {
        props.setMode(Mode);
    }
    const setTarget = (Target) => {
        props.setTarget(Target);
    }
    const deleteComment = async () => {
        const response = await request.delete(`/stories/comments/${comment.id}`, null, null);
        window.location.reload();
    }
    return (
        <Comment>
            <CommentText marginLeft="1%">{comment.nickname}</CommentText>
            <CommentText marginLeft="10%">{comment.content}</CommentText>
            {props.isWriter ?
                <ButtonWrapper>
                    <Button onClick={deleteComment}>삭제</Button>/
                    <Button onClick={() => {
                        setMode('update');
                        setTarget(comment.id);
                    }}>수정</Button>
                </ButtonWrapper> :
                null
            }
        </Comment>
    )
}
