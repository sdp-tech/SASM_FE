import React from 'react'
import styled from 'styled-components';
import { useCookies } from 'react-cookie';
import Request from '../../../functions/common/Request';
import { useNavigate } from 'react-router-dom';

const CommentWrapper = styled.div`
  position: relative;
  display:flex;
  flex-flow: row no wrap;
  border-bottom: 1px black solid;
`
const ButtonWrapper = styled.div`
  position: absolute;
  height: 100%;
  right: 0;
  display:flex;
`
const Button = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
  cursor: pointer;
  padding: 0 5px;
  & + & {
    border-left: 1px black solid;
  }
`
const NickNameBox = styled.div`
  width:20%;
  padding: 1% 3%;
  border-right: 1px black solid;
  @media screen and (max-width: 768px) {
    width: 30%;
  }
`
const ContentBox = styled.div`
  padding: 1% 3%;
`

export default function Comment({ data, setMode,setTarget }) {
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
    <CommentWrapper>
      <NickNameBox>
        {data.nickname}
      </NickNameBox>
      <ContentBox>
        {data.content}
      </ContentBox>
      {isWriter ?
        <ButtonWrapper>
          <Button onClick={deleteComment}>삭제</Button>
          <Button onClick={()=>{
            setMode('update');
            setTarget(data);
          }}>수정</Button>
        </ButtonWrapper> : null}
    </CommentWrapper>
  )
}
