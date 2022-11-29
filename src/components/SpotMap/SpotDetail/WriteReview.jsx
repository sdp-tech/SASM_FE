import React from 'react'
import InputWithLabel from '../../Auth/module/InputWithLabel'
import styled from 'styled-components';
import { useState } from 'react';

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

export default function WriteReview(props) {
    const nickname = localStorage.getItem('nickname');
    const token = localStorage.getItem('accessTK');
    const _date = new Date().getDate();
    const _year = new Date().getFullYear();
    const _month = new Date().getMonth()+1;
    const fulldate = _year + '.' + _month + '.' + _date;
    const [Keyword, setKeyword] = useState([]);
    const fileInput = (event) => {
        document.getElementById('submit').style.display = 'block';
        document.getElementById('filelist').innerHTML = null;
        if (event.target.files.length > 3) {
            alert('사진은 최대 3장까지 업로드 할 수 있습니다.');
            event.target.files = null;
        }
        else for (let i = 0; i < event.target.files.length; i++) {
            document.getElementById('filelist').innerHTML += `<p style='margin:0px; '>${event.target.files[i].name}</p>`;
        }

    }
    const handleCheck = (event, keyword) => {
        if (event.target.checked) {
            if (Keyword.length > 2) {
                alert('3개까지만 선택 가능합니다');
                setKeyword(Keyword.filter((el) => el !== keyword));
                event.target.checked = false;
            }
            else {
                setKeyword([...Keyword, keyword]);
                document.getElementById(keyword).style.color='red';
                
            }
        }
        else if (!event.target.checked) {
            setKeyword(Keyword.filter((el) => el !== keyword));
            document.getElementById(keyword).style.color='black';
        }
    }
    const reviewUpload = (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('date', `${fulldate}`);
        formData.append('nickname', `${nickname}`)
        formData.append('review', `${event.target.text.value}`)
        for(let i = 0; i<event.target.file.files.length; i++) {
            formData.append('file', event.target.file.files[i]);
        }
        formData.append('keyword', `${Keyword}`);
        for(let item of formData) {
            console.log(item);
        }
    }
    let keyword = [];
    for (let i = 0; i < props.keywords.length; i++) {
        keyword.push(
        <EachKeyWord key={i}>
            <label id={props.keywords[i]} htmlFor={i}>{props.keywords[i]}</label>
            <input type="checkbox" id={i} name="keyword" key={i} onChange={(event) => {
                handleCheck(event, props.keywords[i])}} style={{display:'none'}}></input>
            </EachKeyWord>)
    }
    return (
        <FormWrapper>
            <form onSubmit={reviewUpload}>
                <textarea placeholder='리뷰를 작성해보세요' id='text' style={{width:'99%', border:'none'}} cols='5' autoFocus required></textarea>
                <label style={{display:'block'}}>키워드를 선택해주세요. (최대 3개)</label>
                <KeywordBox>{keyword}</KeywordBox>

                <input type="file" id="file" accept='image/*' onChange={fileInput} style={{ display: 'none' }} multiple></input>
                <label htmlFor="file" style={{display:'block'}}>사진 업로드</label>

                <div id="filelist"></div>
                <button type='submit' id="submit" style={{position:'absolute', right:'5px', bottom:'5px'}}>제출</button>
            </form>
        </FormWrapper>
    )
}
