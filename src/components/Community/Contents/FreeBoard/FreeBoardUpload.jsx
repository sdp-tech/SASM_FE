import React from 'react'
import { useCookies } from 'react-cookie'
import { useNavigate } from 'react-router-dom';
import Request from '../../../../functions/common/Request';
import styled from 'styled-components';

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  position: relative;
  align-items: flex-end;
`
const UploadButton = styled.button`
  width: 15%;
`
const InputTitle = styled.input`
  width: 100%;
  height: 5vh;
`

const InputBody = styled.input`
  width: 100%;
  height: 50vh;
  margin: 5vh 0;
`

export default function FreeBoardUpload() {
  const [cookies, setCookie, removeCookie] = useCookies(["name"])
  const token = localStorage.getItem('accessTK');
  const navigate = useNavigate();
  const request = new Request(cookies, localStorage, navigate);

  const PostArticle = async (event) => {
    event.preventDefault();
    if (!token) {
      alert('로그인이 필요합니다.');
      navigate('/auth');
    }
    else {
      const response = await request.post("", {
        title: event.target.text.value,
        content: event.target.textarea.value
      });
    }
  }
  return (
    <>
      <StyledForm onSubmit={PostArticle}>
        <InputTitle type="text" id="text" placeholder="제목을 입력해주세요" />
        <InputBody type="textarea" id="textarea" placeholder="내용을 입력해주세요" />
        <UploadButton type='submit'>등록하기</UploadButton>
      </StyledForm>
    </>
  )
}
