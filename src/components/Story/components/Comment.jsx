import React from 'react'
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
  border: none;
  outline: none;
  background-color: white;
  height: 100%;
  font-size: 1rem;
  font-weight: 600;
`
export default function Comment({ data, setMode, setTarget }) {
  const date = data.updated_at.slice(0,10);
  const [cookies, setCookie, removeCookie] = useCookies(["name"]);
  // const token = cookies.name; // 쿠키에서 id 를 꺼내기
  const token = localStorage.getItem("accessTK"); //localStorage에서 accesstoken꺼내기
  const navigate = useNavigate();
  const request = new Request(cookies, localStorage, navigate);
  const email = localStorage.getItem('email');

  const deleteComment = async () => {
    const response = await request.delete(`/stories/comments/${data.id}`, {});
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
          <img src={data.profile_image} style={{width: '45px', height:'45px', borderRadius:'50%', marginRight:'20px'}} />
          {data.nickname}
        </UserBox>
        {date}
        <ButtonBox>
          {isWriter ?
            <>
              <Button onClick={() => {
                setMode('update');
                setTarget(data);
              }}>수정</Button>
              <Button onClick={deleteComment}>삭제</Button>
            </> : null}
        </ButtonBox>
      </InfoBox>
      <ContentBox>{data.content}</ContentBox>
    </CommentBox>
  )
}
