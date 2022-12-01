import React from 'react'
import { useState } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import Request from '../../../functions/common/Request';
import WriteReview from '../SpotDetail/WriteReview'

export default function ReviewBox(props) {
    const [toggle, setToggle] = useState(false);
    const [cookies, setCookie, removeCookie] = useCookies(["name"]);
    const navigate = useNavigate();
    const request = new Request(cookies, localStorage, navigate);
    const reviewInfo = props.data;
    const date = reviewInfo.created.substr(0, 10);
    const handleToggle = () => {
        setToggle(!toggle);
    }
    const reviewDelete = async () => {
        const response = await request.delete(`/places/place_review/${reviewInfo.id}`, null, null);
        window.location.reload();
        console.log(response);
    }
    const reviewUpdate = async (event) => {
        event.preventDefault();
        const response = await request.put(`/places/place_review/${reviewInfo.id}`,
            {
                place: props.id,
                contents: event.target.text.value
            }, null);
        console.log(response);
        handleToggle();
    }
    return (
        <div style={{padding:'5px', borderBottom:'1px black solid' }}>
            <>
                {reviewInfo.nickname} - {reviewInfo.contents} - {date}
            </>
            {props.writer ?
                <>
                    <button onClick={reviewDelete}>삭제</button>
                    
                    <>
                        {toggle ? <form onSubmit={(event) => {
                            reviewUpdate(event)
                        }}>
                            <textarea id='text' defaultValue={reviewInfo.contents}></textarea>
                            <button type='submit'>수정</button>
                        </form> : <button onClick={handleToggle}>수정</button>}
                    </>
                </> : null}
        </div>
    )
}
