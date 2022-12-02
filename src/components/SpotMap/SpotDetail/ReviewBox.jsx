import React from 'react'
import { useState } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import Request from '../../../functions/common/Request';
import WriteReview from '../SpotDetail/WriteReview'

export default function ReviewBox(props) {
    const [cookies, setCookie, removeCookie] = useCookies(["name"]);
    const navigate = useNavigate();
    const request = new Request(cookies, localStorage, navigate);
    const reviewInfo = props.data;
    const date = reviewInfo.created.substr(0, 10);
    const setMode = (mode) => {
        props.setMode(mode);
    }
    const setReviewOpen = (mode) => {
        props.setReviewOpen(mode);
    }
    const setTarget = (target) => {
        props.setTarget(target);
    }
    const reviewDelete = async () => {
        const response = await request.delete(`/places/place_review/${reviewInfo.id}/`, null, null);
        window.location.reload();
        console.log(response);
    }
    return (
        <div style={{ padding: '5px', borderBottom: '1px black solid' }}>
            <>
                {reviewInfo.nickname} - {reviewInfo.contents} - {reviewInfo.id}
                <div style={{ display: 'flex', border: "1px black solid", justifyContent: 'space-around' }}>
                    <img src={reviewInfo.photos[0]?.imgfile} style={{ width: '50px' }}></img>
                    <img src={reviewInfo.photos[1]?.imgfile} style={{ width: '50px' }}></img>
                    <img src={reviewInfo.photos[2]?.imgfile} style={{ width: '50px' }}></img>
                </div>
            </>
            {props.writer ?
                <>
                    <button onClick={reviewDelete}>삭제</button>
                    <button onClick={()=>{
                        setMode('update');
                        setReviewOpen(true);
                        setTarget(reviewInfo.id);
                    }}>수정</button>
                </> : null}
        </div>
    )
}
