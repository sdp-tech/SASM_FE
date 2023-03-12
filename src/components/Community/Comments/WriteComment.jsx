import React, { useState } from 'react'
import { useCookies } from 'react-cookie'
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Request from '../../../functions/common/Request';
import ZoomPlus from "../../../assets/img/Map/ZoomPlus.svg";

const StlyedForm = styled.form`
  width: 100%;
  display: flex;
  justify-content: center;
  flex-flow: row wrap;
  border-top: 1px #000000 solid;
  border-bottom: 1px #000000 solid;
  padding: 5vh 0;
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
  outline: none;
  cursor: pointer;
`
const ImageUpload = styled.img`
  height: 100%;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
  border-radius: 7px;
  cursor: pointer;
`
const ImageList = styled.div`
  display: flex;
  width: 80%;
  margin-top: 3vh;
  flex-flow: row wrap;
`

export default function WriteComment({ id, isParent, parentId, format }) {
  const [cookies, setCookie, removeCookie] = useCookies(["name"]);
  const [imageUrl, setImageUrl] = useState();
  const navigate = useNavigate();
  const request = new Request(cookies, localStorage, navigate);
  console.log(format);
  const fileInput = (event) => {
    const reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onloadend = () => {
      setImageUrl(reader.result);
    }
  }
  const uploadComment = async (event) => {
    event.preventDefault();
    const formData = new FormData()
    formData.append('post', id);
    if (isParent) {
      formData.append('isParent', 'True');
    }
    else {
      formData.append('isParent', 'False');
      formData.append('parent', parentId);
    }
    if (format.supportsPostCommentPhotos) {
      if (event.target.image_write.files.length > 0) {
        // 업로드 가능한 댓글 사진 개수는 최대 1개
        formData.append('imageList', event.target.image_write.files[0]);
      }
    }
    formData.append('content', event.target.text.value);
    const response = await request.post('/community/post_comments/create/', formData, { "Content-Type": "multipart/form-data" });
    window.location.reload();
  }

  return (
    <StlyedForm onSubmit={uploadComment}>
      {format.supportsPostCommentPhotos &&
        <>
          <input type="file" accept='image/*' id="image_write" onChange={fileInput} style={{ display: 'none' }}></input>
          <label htmlFor="image_write" style={{ display: 'block' }}><ImageUpload src={ZoomPlus} /></label>
        </>
      }
      <InputText type="text" id="text" />
      <SubmitButton type='submit'>제출</SubmitButton>
      <ImageList id="filelist">
        <img src={imageUrl} style={{ height: '100%', maxHeight: '200px' }} />
      </ImageList>
    </StlyedForm>
  )
}
