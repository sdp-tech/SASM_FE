import React from 'react'
import { useCookies } from 'react-cookie'
import { useNavigate } from 'react-router-dom';
import Request from '../../../functions/common/Request';

export default function WriteComment({id, isParent, parentId}) {
  const [cookies, setCookie, removeCookie] = useCookies(["name"]);
  const navigate = useNavigate();
  const request = new Request(cookies, localStorage, navigate);
  console.log(id, parentId);

  const uploadComment = async (event) => {
    const formData = new FormData()
    formData.append('post', `${id}`);
    if(isParent){
      formData.append('isParent', 'True');
    }
    else{
      formData.append('isParent', 'False');
      formData.append('parent', `${parentId}`);
    }
    formData.append('content', event.target.text.value);
    const response = await request.post('/community/post_comments/create/', formData, { "Content-Type": "multipart/form-data" });
  }

  return (
    <div>
      <form onSubmit={uploadComment}>
        <input type="text" id="text"></input>
        <button type='submit'>제출</button>
      </form>
    </div>
  )
}
