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
`
const ContentBox = styled.div`
  width: 100%;
  font-size: 1rem;
  font-weight: 500;
  padding-left: 65px;
`
const ButtonBox = styled.div`
  display: flex;
  justify-content: center;
  position: absolute;
  right: 0;
  width: 12%;
  box-sizing: border-box;
`
const Button = styled.button`
  cursor: pointer;
  border: none;
  outline: none;
  background-color: white;
  height: 100%;
  font-size: 1rem;
  font-weight: 600;
`
const TextArea = styled.textarea`
    display:block;
    margin:0;
    width: 100%;
    margin-right: 3vw;
    height: 5vh;
    resize:none;
    border: 1px rgba(0,0,0,0.3) solid;
    padding: 10px 30px;
    border-radius:1000px;
    ::placeholder,
    ::-webkit-input-placeholder {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        left: 5%;
    }
    :-ms-input-placeholder {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        left: 5%;
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

  const handleUpdate = () => {
    setUpdate(!update);
  }
  const deleteComment = async () => {
    const response = await request.delete(`/stories/comments/${data.id}`, {});
    window.location.reload();
  }
  const updateComment = async () => {
    const response = await request.patch(`/stories/comments/${data.id}`, {
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
        {date}
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
        {update ? <><TextArea id="textarea"></TextArea></> : <>{data.content}</>}
      </ContentBox>
    </CommentBox>
  )
}
