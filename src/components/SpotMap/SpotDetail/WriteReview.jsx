import React from 'react'
import InputWithLabel from '../../Auth/module/InputWithLabel'
import styled from 'styled-components';
import { useState } from 'react';
import Request from '../../../functions/common/Request';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const KeywordBox = styled.div`
    display:flex;
    flex-flow:row wrap;
    background-color:#ffffff;
    width:100%;
    margin:0 auto;
    margin-bottom:10px;
`

const FormWrapper = styled.div`
    padding:10px;
    border:1px black solid;
    display:flex;
    flex-flow : row wrap;
    text-align:center;
    position:relative;
`

const EachKeyWord = styled.div`
    margin:10px;
`

const PhotoBox = styled.div`
  width: 100px;
  height: 100px;
  position: relative;
`
const FileList = styled.div`
  display: flex;
  margin-top: 10px;
  justify-content: space-around;
  align-items: center;
  min-height: 120px;
`

export default function WriteReview({ targetData, keywordList, id, setValue }) {
  const [cookies, setCookie, removeCookie] = useCookies(["name"]);
  const navigate = useNavigate();
  const request = new Request(cookies, localStorage, navigate);
  const token = localStorage.getItem('accessTK');
  const [Keyword, setKeyword] = useState([]);
  const [photos, setPhotos] = useState([]);
  const [photoList, setPhotoList] = useState([]);
  useEffect(() => {
    if (targetData) {
      // 수정을 위해 기존에 업로드한 사진 저장
      setPhotoList(targetData.photos);
      // 수정을 위해 기존에 선택한 카테고리를 보여주기
      let targetCategory = [];
      for (let i = 0; i < targetData.categoryList?.length; i++) {
        targetCategory.push(`${targetData.categoryList[i]}`);
        document.getElementById(`keyword_input_${targetData.categoryList[i]}`).checked = true;
      }
      setKeyword(targetCategory);
    }
  }, [targetData]);
  const selectFile = (file) => {
    //각각의 파일을 FileReader로 읽어옴
    const fileReader = new FileReader();
    fileReader.onload = () => { setPhotos(prev => [...prev, fileReader.result]) };
    fileReader.readAsDataURL(file)
  }
  const inputFile = (event) => {
    //파일 입력시 개수 제한
    if (photoList?.length + event.target.files.length > 3) {
      alert('사진은 최대 3장까지 업로드 할 수 있습니다.');
      event.target.value = null;
    }
    else for (let i = 0; i < event.target.files.length; i++) {
      setPhotos([]);
      selectFile(event.target.files[i]);
    }
  }
  const handleCheck = (event, keyword) => {
    if (event.target.checked) {
      if (Keyword.length >= 3) {
        alert('3개까지만 선택 가능합니다');
        setKeyword(Keyword.filter((el) => el !== keyword[1]));
        event.target.checked = false;
      }
      else {
        setKeyword([...Keyword, keyword[1]]);
      }
    }
    else if (!event.target.checked) {
      setKeyword(Keyword.filter((el) => el !== keyword[1]));
    }
  }
  const deletePhoto = (data, state, setState) => {
    //각각의 photoList와 photos를 위해 state를 props로 전달
    setState(state.filter((el) => el !== data));
  }
  const uploadReview = async (event) => {
    if (!token) {
      alert('로그인이 필요합니다.');
      navigate('/auth');
    }
    else {
      event.preventDefault();
      const formData = new FormData();
      formData.append('place', id);
      formData.append('contents', event.target.text.value)
      for (let i = 0; i < event.target.file.files.length; i++) {
        formData.append('photos', event.target.file.files[i]);
      }
      for (let i = 0; i < photoList?.length; i++) {
        formData.append('photoList', photoList[i].imgfile);
      }
      formData.append('category', Array(Keyword).toString());
      if (targetData) {
        const response_update = await request.put(`/places/place_review/${targetData.id}/update`, formData, { "Content-Type": "multipart/form-data" });
      }
      else {
        const response_upload = await request.post("/places/place_review/create/", formData, { "Content-Type": "multipart/form-data" });
      }
      setValue(0);
    }
  }
  useEffect(() => { console.log(photos) }, [photos]);
  return (
    <FormWrapper>
      <form onSubmit={uploadReview}>
        <textarea placeholder={targetData ? targetData.contents : '리뷰를 작성해주세요'} id='text' style={{ width: '99%', border: 'none' }} cols='5' autoFocus required></textarea>
        <label style={{ display: 'block' }}>키워드를 선택해주세요. (최대 3개)</label>
        <KeywordBox>
          {
            keywordList.map((data, index) => {
              return (
                <EachKeyWord key={data[1]}>
                  <label style={{ color: Keyword.includes(data[1]) ? 'red' : 'black' }} htmlFor={`keyword_input_${data[1]}`} id={`keyword_text_${data[1]}`}>{data[0]}</label>
                  <input type="checkbox" id={`keyword_input_${data[1]}`} name="keyword" onChange={(event) => { handleCheck(event, data) }} style={{ display: 'none' }}></input>
                </EachKeyWord>
              )
            })
          }
        </KeywordBox>
        <input type="file" id="file" accept='image/*' onChange={inputFile} style={{ display: 'none' }} multiple></input>
        <label htmlFor="file" style={{ display: 'block' }}>사진 업로드</label>
        <FileList id="filelist">
          {
            photoList?.map((data, index) => {
              return (
                <PhotoBox key={index}>
                  <img src={data.imgfile} style={{ width: '90px', height: '90px', margin: '5px' }} onClick={() => { deletePhoto(data, photoList, setPhotoList) }} />
                </PhotoBox>
              )
            })
          }
          {
            photos.map((data, index) => {
              return (
                <PhotoBox key={index}>
                  <img src={data} style={{ width: '90px', height: '90px', margin: '5px' }} onClick={() => { deletePhoto(data, photos, setPhotos) }} />
                </PhotoBox>
              )
            })
          }
        </FileList>
        <button type='submit' id="submit" style={{ position: 'absolute', right: '5px', bottom: '5px' }}>제출</button>
      </form>
    </FormWrapper>
  )
}
