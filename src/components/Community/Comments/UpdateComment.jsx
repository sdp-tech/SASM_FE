import React, { useState } from 'react'
import { useCookies } from 'react-cookie'
import { useNavigate } from 'react-router-dom';
import Request from '../../../functions/common/Request';
import styled from 'styled-components';

const PhotoList = styled.div`
  display: flex;
`

const PhotoBox = styled.div`
  width: 100px;
  height: 100px;
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
`

export default function UpdateComment({ data }) {
  console.log(data);
  const [cookies, setCookie, removeCookie] = useCookies(["name"]);
  const [photoList, setPhotoList] = useState(data.photoList);
  const navigate = useNavigate();
  const request = new Request(cookies, localStorage, navigate);

  const handleFileInput = (data) => {
    console.log(data);
    setPhotoList(photoList.filter((el) => el !== data));
    console.log(photoList);
  }
  const updateComment = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    if (photoList != null) {
      for (let i = 0; i < photoList.length; i++) {
        formData.append('photoList', photoList[i]);
      }
    }
    for (let i = 0; i < event.target.image_update.files.length; i++) {
      formData.append('imageList', event.target.image_update.files[i]);
    }
    formData.append('content', event.target.text.value);

    for (let key of formData.keys()) {
      console.log(key, ":", formData.get(key));
    }
    const response = await request.put(`/community/post_comments/${data.id}/update`, formData, { "Content-Type": "multipart/form-data" })
    window.location.reload()
  }

  return (
    <div>
      <form onSubmit={updateComment}>
        <input type="text" id="text"></input>
        <button type='submit'>수정</button>
        <input type="file" accept='image/*' id="image_update" multiple style={{}}></input>
        <label htmlFor="image_update" style={{ display: 'block' }}>사진 업로드?</label>
        <PhotoList id="filelist">
          {photoList?.map((data, index) => (
            <PhotoBox>
              <img src={data} style={{ width: '100px', height: '100px' }}/>
              <DeleteButton onClick={() => {
                handleFileInput(data)
              }}>X</DeleteButton>
            </PhotoBox>
          ))}
        </PhotoList>
      </form>
    </div>
  )
}
