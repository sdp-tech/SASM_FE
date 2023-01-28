import React, { useState } from 'react'
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import Request from '../../../../functions/common/Request';
import styled from 'styled-components';

const StyledForm = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
`
const InputTitle = styled.input`
  width: 100%;
  height: 5vh;
`

const InputContent = styled.textarea`
  width: 100%;
  height: 40vh;
  margin: 5vh 0;
  padding: 0 auto;
`
const InputHashtag = styled.input`
`
const ButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`
const Button = styled.button`
  width: 15%;
`

export default function PromotionBoardUpload({ handleMode }) {
  const [cookies, setCookie, removeCookie] = useCookies(["name"]);
  const [hashtag, setHashtag] = useState([])
  const navigate = useNavigate();
  const request = new Request(cookies, localStorage, navigate);
  const uploadItem = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('board', '3');
    formData.append('title', `${event.target.title.value}`);
    formData.append('content', `${event.target.content.value}`);
    const response = await request.post("/community/posts/create/", formData, { "Content-Type": "multipart/form-data" });
    window.location.reload();
  }
  const handleHashtag = (event) => {
    let str = event.target.value.split(' ').join('')
    str = str.split(/[#,]+/)
    let filterStr = str.filter(function (e) { return e !== '' })
    if (filterStr.length > 5) {
      alert('해쉬태그는 최대 5개까지만');
      event.target.value = null;
    }
    for (let i = 0; i < filterStr.length; i++) {
      if (filterStr[i].length > 9) {
        alert('해쉬태그는 최대 9글자까지만');
        event.target.value = null;
      }
    }
    setHashtag(filterStr);
  }
  return (
    <>
      <StyledForm onSubmit={uploadItem}>
        <InputTitle type="text" id="title" placeholder="제목을 입력해주세요." required />
        <InputContent id="content" placeholder="내용을 입력해주세요." required />
        <label htmlFor='hashtag'>해쉬태그</label>
        <InputHashtag type="text" id="hashtag" placeholder='해쉬태그는 최대 5개, 최대 9글자' onChange={handleHashtag} />
        <ButtonWrapper>
          <Button onClick={handleMode}>뒤로가기</Button>
          <Button type="submit">작성하기</Button>
        </ButtonWrapper>
      </StyledForm>
    </>
  )
}
