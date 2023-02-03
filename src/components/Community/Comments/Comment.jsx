import React, { useState } from 'react'
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Request from '../../../functions/common/Request';
import WriteComment from './WriteComment';

const CommentWrapper = styled.div`
  border-bottom: 1px black solid;
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  padding: 1% 0;
`
const Content = styled.div(({ isParent }) => ({
  width: '80%',
  paddingLeft: isParent ? '0' : '5%',
}))
const ButtonWrapper = styled.div`
  width: 20%;
  display: flex; 
`
const Button = styled.button`
  width: 50%;
`


export default function Comment({ data, id }) {
  //mode의 default는 대댓글을 작성하지 않는 false
  const [mode, setMode] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies(["name"]);
  const navigate = useNavigate();
  const email = localStorage.getItem('email');
  const request = new Request(cookies, localStorage, navigate);
  const handleMode = () => {
    setMode(!mode);
  }
  const deleteComment = async () => {
    const response = await request.delete(`/community/post_comments/${data.id}/delete`);
    window.location.reload();
  }
  let isWriter = false;
  if (data.email == email) {
    isWriter = true;
  }
  return (
    <CommentWrapper>
      <Content isParent={data.isParent}>{data.content}</Content>
      <ButtonWrapper>
        {isWriter && <Button onClick={deleteComment}>삭제</Button>}
        {data.isParent&&<Button onClick={handleMode}>댓글</Button>}
      </ButtonWrapper>
      {mode && <WriteComment id={id} isParent={false} parentId={data.id} />}
    </CommentWrapper>
  )
}
