import React, { useState } from 'react'
import styled from 'styled-components';
import { useCookies } from 'react-cookie';
import Request from '../../../functions/common/Request';
import { useNavigate } from 'react-router-dom';

const CommentBox = styled.div`
  margin-bottom: 3vh;
`
const InfoBox = styled.div`
  width: 100%;
  display: flex;
  position: relative;
  align-items: center;
  margin-bottom: 1vh;
`
const UserBox = styled.div`
  display: flex;
  align-items: center;
  margin-right: 20px;
  font-size: 1.25rem;
  font-weight: 700;
  }
`
const DateBox = styled.div`
  @media screen and (max-width: 768px) {
  }
`
const ContentBox = styled.div`
  width: 100%;
  font-size: 1rem;
  font-weight: 500;
  padding-left: 65px;
  @media screen and (max-width: 768px) {
    padding: 0;
    font-size: 0.75rem;
  }
`
const ButtonBox = styled.div`
  display: flex;
  justify-content: center;
  position: absolute;
  right: 0;
  width: 12%;
  box-sizing: border-box;
  @media screen and (max-width: 768px) {
    width: auto;
  }
`
const Button = styled.button`
  cursor: pointer;
  border: none;
  outline: none;
  background-color: white;
  height: 100%;
  font-size: 1rem;
  font-weight: 600;
  @media screen and (max-width: 768px) {
    font-size: 0.75rem;
  }
`
const TextArea = styled.textarea`
    display:block;
    margin:0;
    width: 100%;
    margin-right: 3vw;
    height: 5vh;
    resize:none;
    border: 1px rgba(0,0,0,0.3) solid;
    padding: 11px 30px;
    border-radius:1000px;
    @media screen and (max-width: 768px) {
      height: 3vh;
      padding: 5px 15px;
    }
`
export default function Comment({ data }) {
  const date = data.updated_at.slice(0, 10);
  const [update, setUpdate] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies(["name"]);
  // const token = cookies.name; // 쿠키에서 id 를 꺼내기
  const token = localStorage.getItem("accessTK"); //localStorage에서 accesstoken꺼내기
  const navigate = useNavigate();
  const request = new Request(cookies, localStorage, navigate);
  const email = localStorage.getItem('email');
  const [updatetext, setUpdateText] = useState(data.content);

  const handleUpdate = () => {
    setUpdate(!update);
  }
  const deleteComment = async () => {
    const response = await request.delete(`/stories/comments/delete/${data.id}/`, {});
    window.location.reload();
  }
  const updateComment = async () => {
    const response = await request.put(`/stories/comments/update/${data.id}/`, {
      content: document.getElementById('textarea').value,
    });
    window.location.reload();
  }
  let isWriter = false;
  if (data.email == email) {
    isWriter = true;
  }
  return (
    <CommentBox>
      <InfoBox>
        <UserBox>
          <img src={data.profile_image} style={{ width: '45px', height: '45px', borderRadius: '50%', marginRight: '20px' }} />
          {data.nickname}
        </UserBox>
        <DateBox>
          {date}

          <span style={{color:'#999999', marginLeft:'10px'}}>
              {date.slice(0, 19) != date.slice(0, 19) ? '수정됨' : null}
          </span>
        </DateBox>
        <ButtonBox>
          {isWriter ?
            <>
              {update ?
                <>
                  <Button onClick={updateComment}>저장</Button>
                  <Button onClick={handleUpdate}>취소</Button>
                </> :
                <>
                  <Button onClick={() => {
                    handleUpdate();
                  }}>수정</Button>
                  <Button onClick={deleteComment}>삭제</Button>
                </>}
            </> : null}
        </ButtonBox>
      </InfoBox>
      <ContentBox>
        {update ? <><TextArea autoFocus id="textarea" value={updatetext} onChange={(event) => {
          setUpdateText(event.target.value);
        }}></TextArea></> : <>{data.content}</>}
      </ContentBox>
    </CommentBox>
  )
}
