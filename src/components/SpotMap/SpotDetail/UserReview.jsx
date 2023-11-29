import React, { useEffect } from 'react'
import { useState } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import Request from '../../../functions/common/Request';
import styled from 'styled-components';
import OtherUserData from '../../../functions/common/OtherUserData';

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
const NicknameWrapper = styled.div`
    cursor: pointer;
    &:hover {
        color: #289AFF;
    }
`

export default function UserReview({ reviewData, setReviewOpen, setTargetData, writer, setValue }) {
    const [toggle, setToggle] = useState(false);
    const [open, setOpen] = useState(false);
    const [otherUser, setOtherUser] = useState({});
    const navigate = useNavigate();
    const [refresh, setRefresh] = useState(false);
    const request = Request(navigate);
    const handleToggle = () => {
        setToggle(!toggle);
    }
    const rerender = () => {
        setRefresh(!refresh);
    }
    const deleteReview = async () => {
        const response_delete = await request.del(`/places/place_review/${reviewData.id}/`);
        setValue(0);
    }
    const confirmDelete = () => {
        if (window.confirm('삭제하시겠습니까?')) {
            deleteReview();
        }
    }
    const otherUserData = async (email) => {
        const response = await request.get('/mypage/user/', {
          email: email
        });
        setOtherUser(response.data.data);
        setOpen(true);
      }
    const handleClose = () => {
    setOpen(false);
    }
    useEffect(() => {
        open && otherUserData(reviewData.writer);
    }, [refresh])
    return (
        <>
          {open && <OtherUserData open={open} userData = {otherUser} handleClose = {handleClose} rerender={rerender}/>}
            <div style={{ padding: '5px', borderBottom: '1px black solid', position: 'relative' }}>
                <NicknameWrapper onClick={() => {otherUserData(reviewData.writer)}}>{reviewData.nickname}</NicknameWrapper>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    {reviewData.updated.slice(0, 10)} {reviewData.updated.slice(11, 19)}
                    <span style={{ color: '#999999' }}>
                        {
                            !(reviewData.created.slice(0, 19) == reviewData.updated.slice(0, 19)) && '수정됨'
                        }
                    </span>
                </div>
                <div>
                    {
                        toggle ?
                            <div style={{ display: 'flex' }}>{reviewData.contents}</div> :
                            <div>{reviewData.contents}</div>
                    }
                    <div onClick={handleToggle} style={{ position: 'absolute', right: '5px', top: '5px' }}>{toggle ? "∧" : "∨"}</div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                    {
                        reviewData.photoList?.map((data, index) => {
                            return (
                                <img src={data.imgfile} key={`review_photos_${reviewData.id}_${index}`} alt="review photos" style={{ width: '100px', height: '100px' }} />
                            )
                        })
                    }
                </div>
                {
                    writer &&
                    <>
                        <Button onClick={confirmDelete}>삭제</Button>
                        <Button onClick={() => { setReviewOpen(true); setTargetData(reviewData); }}>수정</Button>
                    </>
                }
            </div>
        </>
    )
}
