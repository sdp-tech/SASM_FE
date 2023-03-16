import React from 'react'
import { useState } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import Request from '../../../functions/common/Request';
import WriteReview from './WriteReview'
import styled from 'styled-components';

const TextBox = styled.div`
    white-space: normal;
    overflow: hidden;
    text-overflow: ellipsis;
    width: 100%;
    height: 100px;
`

const Button = styled.button`
    border: none;
    background: none;
`

export default function UserReview({reviewData, setReviewOpen, setTarget, writer}) {
    const [toggle, setToggle] = useState(false);
    const [overflow, setOverflow] = useState(false);
    const [cookies, setCookie, removeCookie] = useCookies(["name"]);
    const navigate = useNavigate();
    const request = new Request(cookies, localStorage, navigate);
    const date = reviewData.created.substr(0, 10);
    const handleToggle = () => {
        setToggle(!toggle);
    }

    const reviewDelete = async () => {
        const response = await request.delete(`/places/place_review/${reviewData.id}/`, null, null);
        window.location.reload();
        console.log(response);
    }
    const confirmDelete = () => {
        if(window.confirm('삭제하시겠습니까?')) {
            reviewDelete();
        }
        else {
        }
    }
    if(reviewData.contents.length>148) {
        return (
            <div style={{ padding: '5px', borderBottom: '1px black solid', position: 'relative' }}>
                <>
                    <div>{reviewData.nickname}</div>
                    <div>{date}</div>
                    <div>
                        {
                            toggle ?
                                <div style={{ display: 'flex' }}>{reviewData.contents}</div> :
                                <TextBox>{reviewData.contents}</TextBox>
                        }
                        <div onClick={handleToggle} style={{ position: 'absolute', right: '5px', top: '5px' }}>{toggle ? "∧" : "∨"}</div>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                        <img src={reviewData.photos[0]?.imgfile} style={{ width: '150px' }}></img>
                        <img src={reviewData.photos[1]?.imgfile} style={{ width: '150px' }}></img>
                        <img src={reviewData.photos[2]?.imgfile} style={{ width: '150px' }}></img>
                    </div>
                </>
                {writer ?
                    <>
                        <Button onClick={confirmDelete}>삭제</Button>
                        <Button onClick={() => {
                            setReviewOpen(true);
                            setTarget(reviewData.id);
                        }}>수정</Button>
                    </> : null}
            </div>
        )
    }
    else {
        return (
        <div style={{ padding: '5px', borderBottom: '1px black solid', position: 'relative' }}>
            <>
                <div>{reviewData.nickname}</div>
                <div>{date}</div>
                <div>
                    {
                        toggle ?
                            <div style={{ display: 'flex' }}>{reviewData.contents}</div> :
                            <div>{reviewData.contents}</div>
                    }
                    <div onClick={handleToggle} style={{ position: 'absolute', right: '5px', top: '5px' }}>{toggle ? "∧" : "∨"}</div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                    <img src={reviewData.photos[0]?.imgfile} style={{ width: '150px' }}></img>
                    <img src={reviewData.photos[1]?.imgfile} style={{ width: '150px' }}></img>
                    <img src={reviewData.photos[2]?.imgfile} style={{ width: '150px' }}></img>
                </div>
            </>
            {writer ?
                <>
                    <Button onClick={confirmDelete}>삭제</Button>
                    <Button onClick={() => {
                        setReviewOpen(true);
                        setTarget(reviewData.id);
                    }}>수정</Button>
                </> : null}
        </div>
    )
    }
}
