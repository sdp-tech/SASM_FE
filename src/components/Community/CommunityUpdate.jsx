import React, { useState } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Request from '../../functions/common/Request';

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
const InputImage = styled.input`
  display: none;
`
const ImageList = styled.div`
  display: flex;
  flex-flow: row wrap;
`
const PhotoList = styled.div`
  display: flex;
`
const PhotoBox = styled.div`
  width: 100px;
  height: 100px;
  position: relative;
`
const DeleteButton = styled.div`
  width: 20%;
  height: 20%;
  border: 1px black solid;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  right: 0;
  top:0;
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

export default function CommunityUpdate({ setMode, detail, id, option }) {
  const [cookies, setCookie, removeCookie] = useCookies(["name"]);
  const [photoList, setPhotoList] = useState(detail.photoList);
  const [hashtag, setHashtag] = useState(detail.hashtagList);
  const navigate = useNavigate();
  const request = new Request(cookies, localStorage, navigate);

  const updateItem = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('title', event.target.title.value);
    formData.append('content', event.target.content.value);
    if (photoList != null) {
      for (let i = 0; i < photoList.length; i++) {
        formData.append('photoList', photoList[i]);
      }
    }
    for (let i = 0; i < hashtag.length; i++) {
      formData.append('hashtagList', hashtag[i]);
    }
    if(option) {
      for (let i = 0; i < event.target.file.files.length; i++) {
        formData.append('imageList', event.target.file.files[i]);
      }
    }
    const response = await request.put(`/community/posts/${id}/update/`, formData, { "Content-Type": "multipart/form-data" });
    //window.location.reload();
  }
  const handleFileInput = (data) => {
    setPhotoList(photoList.filter((el) => el !== data));
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
    <StyledForm onSubmit={updateItem}>
      <InputTitle type="text" id="title" defaultValue={detail.title} required />
      <InputContent id="content" defaultValue={detail.content} required />
      {
        option && <>
        <PhotoList>
          {photoList.map((data, index) => (
            <PhotoBox>
              <img src={data} style={{ width: '100px', height: '100px' }} />
              <DeleteButton onClick={() => { handleFileInput(data) }}>X </DeleteButton>
            </PhotoBox>
          ))}
        </PhotoList>
        <label htmlFor='file'>사진</label>
        <InputImage type="file" id="file" accept='image/*' multiple></InputImage>
        <ImageList id="filelist">
        </ImageList>
        <label htmlFor='hashtag'>해쉬태그</label>
        <InputHashtag type="text" id="hashtag" defaultValue={detail.hashtagList} onChange={handleHashtag} />
      </>
      }
      <ButtonWrapper>
        <Button onClick={()=>{setMode(false)}}>뒤로가기</Button>
        <Button type="submit">작성하기</Button>
      </ButtonWrapper>
    </StyledForm>
  )
}
