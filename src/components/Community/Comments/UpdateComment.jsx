import React, { useState } from 'react'
import { useCookies } from 'react-cookie'
import { useNavigate } from 'react-router-dom';
import Request from '../../../functions/common/Request';
import styled from 'styled-components';
import ZoomPlus from "../../../assets/img/Map/ZoomPlus.svg";

const PhotoList = styled.div`
  display: flex;
  width: 80%;
  margin-top: 3vh;
`
const PhotoBox = styled.div`
  width: 8%;
  margin-right: 3%;
  position: relative;
`
const DeleteButton = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  border: 1px black solid;
  width: 20%;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 20%;
  cursor: pointer;
`
const StyledForm = styled.form`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 5vh;
  flex-flow: row wrap;
`
const InputText = styled.input`
  width: 60%;
  height: 5vh;
  border: none;
  outline: none;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.3);
  border-radius: 7px;
  margin: 0 5%;
`
const SubmitButton = styled.button`
  height: 5vh;
  width: 5%;
  background: #9DF4C9;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
  border-radius: 7px;
  border: none;
  cursor: pointer;
  outline: none;
`
const ImageUpload = styled.img`
  height: 100%;
  cursor:pointer;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
  border-radius: 7px;
  margin-bottom: 3vh;
`

export default function UpdateComment({ data, setUpdate }) {
  const [cookies, setCookie, removeCookie] = useCookies(["name"]);
  const [photoList, setPhotoList] = useState(data.photoList);
  const [imageUrl, setImageUrl] = useState([]);
  const navigate = useNavigate();
  const request = new Request(cookies, localStorage, navigate);

  const deleteFile = (data) => {
    setPhotoList(photoList.filter((el) => el !== data));
  }
  const fileInput = (event) => {
    if (photoList.length == 0) {
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onloadend = () => {
        setImageUrl([reader.result]);
      }
    }
    else {
      alert('사진은 두 개까지만');
      event.target.value = null;
    }
  }
  const updateComment = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    if (photoList != null) {
      formData.append('photoList', photoList[0]);
    }
    for (let i = 0; i < event.target.image_update.files.length; i++) {
      formData.append('imageList', event.target.image_update.files[i]);
    }
    formData.append('content', event.target.text.value);
    if (photoList?.length + event.target.image_update.files.length > 1) {
      alert('사진은 두 개까지만');
    }
    else {
      const response = await request.put(`/community/post_comments/${data.id}/update`, formData, { "Content-Type": "multipart/form-data" })
      window.location.reload()
    }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
      <StyledForm onSubmit={updateComment}>
        <input type="file" accept='image/*' id="image_update" onChange={fileInput} style={{ display: 'none' }}></input>
        <label htmlFor="image_update" style={{ display: 'block', height: '5vh' }}><ImageUpload src={ZoomPlus} /></label>
        <InputText type="text" id="text" defaultValue={data.content} />
        <SubmitButton type='submit'>수정</SubmitButton>
        <PhotoList id="filelist">
          {
            imageUrl.map((data, index) => (
              <PhotoBox key={index}>
                <img src={data} style={{ width: '100%', height: '100%' }} />
              </PhotoBox>
            ))
          }
          {
            photoList?.map((data, index) => (
              <PhotoBox key={index}>
                <img src={data} style={{ width: '100%', height: '100%' }} />
                <DeleteButton onClick={() => {
                  deleteFile(data)
                }}>X</DeleteButton>
              </PhotoBox>
            ))
          }
        </PhotoList>
      </StyledForm>
      <SubmitButton onClick={() => { setUpdate(false) }}>뒤로가기</SubmitButton>
    </div>
  )
}
