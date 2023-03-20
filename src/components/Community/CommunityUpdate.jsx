import React, { useState } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Request from '../../functions/common/Request';
import ZoomPlus from "../../assets/img/Map/ZoomPlus.svg";

const StyledForm = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
`
const InputTitle = styled.input`
  width: 100%;
  height: 5vh;
  border:none;
  outline:none;
  padding: 20px;
  font-size: 1rem;
  box-shadow: 0px 1px 12px rgba(0,0,0,0.3);
  border-radius: 7px;
`
const InputContent = styled.textarea`
  width: 100%;
  height: 40vh;
  margin: 5vh 0;
  padding: 20px;
  font-size: 1rem;
  box-shadow: 0px 1px 12px rgba(0,0,0,0.3);
  background-color: #EFEFEF;
  border-radius: 7px;
  outline: none;
  border: none;
  resize: none;
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
  margin-top: 3vh;
  flex-flow: row wrap;
  min-height: 100px;
`
const PhotoBox = styled.div`
  width: 20%;
  height: 100px;
  display: flex;
  justify-content: center;
  position: relative;
`
const InputHashtag = styled.input`
  width: 46vw;
  border-radius: 7px;
  border: 1px rgba(0,0,0,0.2) solid;
  outline: none;
  box-shadow: 2px 4px 4px rgba(0,0,0,0.2);
`
const ButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-top: 2vh;
`
const Button = styled.button`
  border: none;
  width: 8%;
  height: 5vh;
  outline: none;
  background-color: #FFFFFF;
  font-size: 0.8rem;
  border-radius: 7px;
  box-shadow: 2px 4px 4px rgba(0,0,0,0.2);
  cursor: pointer;
`
const LabelWrapper = styled.div`
  display: flex;
`
const Label = styled.div`
  width: 7vw;
  height: 5vh;
  border-radius: 7px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #EFEFEF;
  font-size: 0.8rem;
  box-shadow: 2px 4px 4px rgba(0,0,0,0.2);
  margin-right: 1vw;
`
const FileWrapper = styled.label`
  width: 5vh;
  height: 5vh;
  box-shadow: 2px 4px 4px rgba(0,0,0,0.2);
  display: flex;
  margin-right: 3vw;
`
export default function CommunityUpdate({ setMode, detail, id, format }) {
  const [cookies, setCookie, removeCookie] = useCookies(["name"]);
  const [photoList, setPhotoList] = useState(detail.photoList);
  const [imageList, setImageList] = useState([]);
  const [hashtag, setHashtag] = useState(detail.hashtagList);
  const navigate = useNavigate();
  const request = new Request(cookies, localStorage, navigate);
  const selectFile = (file) => {
    //각각의 파일을 FileReader로 읽어옴
    const fileReader = new FileReader();
    fileReader.onload = () => { setImageList(prev => [...prev, fileReader.result]) };
    fileReader.readAsDataURL(file)
  }
  const inputFile = (event) => {
    //파일 입력 시 개수 제한
    if (event.target.files.length > 10) {
      alert('사진은 최대 10장까지 업로드 할 수 있습니다.');
      event.target.files = null;
    }
    else for (let i = 0; i < event.target.files.length; i++) {
      selectFile(event.target.files[i]);
    }
  }
  const updatePost = async (event) => {
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
    for (let i = 0; i < event.target.file.files.length; i++) {
      formData.append('imageList', event.target.file.files[i]);
    }
    const response_update = await request.put(`/community/posts/${id}/update/`, formData, { "Content-Type": "multipart/form-data" });
    window.location.reload();
  }
  const deletePhoto = (data, state, setState) => {
    setState(state.filter((el) => el !== data));
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
    <StyledForm onSubmit={updatePost}>
      <InputTitle type="text" id="title" defaultValue={detail.title} required />
      <InputContent id="content" defaultValue={detail.content} required />
      <div style={{ display: 'flex' }}>
        {
          format.supportsPostPhotos &&
          <>
            <LabelWrapper>
              <Label>사진 첨부</Label>
              <FileWrapper htmlFor='file'>
                <img src={ZoomPlus} style={{ transform: 'scale(0.6)' }} />
              </FileWrapper>
            </LabelWrapper>
            <InputImage type="file" id="file" onChange={inputFile} accept='image/*' multiple />
          </>
        }
        {
          format.supportsHashtags &&
          <>
            <LabelWrapper>
              <Label>#해쉬태그</Label>
              <InputHashtag type="text" id="hashtag" defaultValue={detail.hashtagList} onChange={handleHashtag} />
            </LabelWrapper>
          </>
        }
      </div>
      <PhotoList>
        {
          photoList.map((data, index) => (
            <PhotoBox key={index}>
              <img src={data} style={{ width: '90px', height: '90px', margin:'5px' }} onClick={() => { deletePhoto(data, photoList, setPhotoList) }} />
            </PhotoBox>
          ))
        }
        {
          imageList.map((data, index) => (
            <PhotoBox key={index}>
              <img src={data} style={{ width: '90px', height: '90px', margin:'5px' }} onClick={() => { deletePhoto(data, imageList, setImageList) }} />
            </PhotoBox>
          ))
        }
      </PhotoList>
      <ImageList id="filelist">
      </ImageList>
      <ButtonWrapper>
        <Button onClick={() => { setMode(false) }}>뒤로가기</Button>
        <Button type="submit">작성하기</Button>
      </ButtonWrapper>
    </StyledForm>
  )
}
