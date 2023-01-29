import React from 'react'
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
const ButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`
const Button = styled.button`
  width: 15%;
`

export default function PlaceBoardUpload() {
  const [cookies, setCookie, removeCookie] = useCookies(["name"]);
  const navigate = useNavigate();
  const request = new Request(cookies, localStorage, navigate);
  const uploadItem = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('board', '2');
    formData.append('title', `${event.target.title.value}`);
    formData.append('content', `${event.target.content.value}`)
    const response = await request.post("/community/posts/create/", formData, { "Content-Type": "multipart/form-data" });
    window.location.reload();
  }
  const defaultValue = <div><p>SDG와의 연관성 : </p><p>예시</p></div>
  return (
    <>
      <StyledForm onSubmit={uploadItem}>
        <InputTitle type="text" id="title" placeholder="장소명을 입력해주세요." required/>
        <InputContent id="content" required defaultValue={`추천 장소 : \n제목 : \nSDGs와의 연관성 : \n추천 이유 : \n장소 링크 첨부 : ` }></InputContent>
        <ButtonWrapper>
          <Button type="submit">작성하기</Button>
        </ButtonWrapper>
      </StyledForm>
    </>
  )
}
