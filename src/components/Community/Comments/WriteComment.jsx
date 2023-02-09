import React from 'react'
import { useCookies } from 'react-cookie'
import { useNavigate } from 'react-router-dom';
import Request from '../../../functions/common/Request';

export default function WriteComment({ id, isParent, parentId, format }) {
  const [cookies, setCookie, removeCookie] = useCookies(["name"]);
  const navigate = useNavigate();
  const request = new Request(cookies, localStorage, navigate);
  console.log(format);
  const fileInput = (event) => {
    document.getElementById('filelist').innerHTML = null;
    if (event.target.files.length > 3) {
      alert('사진은 최대 3장까지 업로드 할 수 있습니다.');
      event.target.value = null;
    }
    else for (let i = 0; i < event.target.files.length; i++) {
      document.getElementById('filelist').innerHTML += `<p style='margin:0px; '>${event.target.files[i].name}</p>`;
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
      for (let i = 0; i < event.target.image_write.files.length; i++) {
        formData.append('imageList', event.target.image_write.files[i])
      }
    }
    formData.append('content', event.target.text.value);
    const response = await request.post('/community/post_comments/create/', formData, { "Content-Type": "multipart/form-data" });
    window.location.reload();
  }

  return (
    <div>
      <form onSubmit={uploadComment}>
        <input type="text" id="text"></input>
        <button type='submit'>제출</button>
        {format.supportsPostCommentPhotos &&
          <>
            <input type="file" accept='image/*' id="image_write" onChange={fileInput} multiple style={{ display: 'none' }}></input>
            <label htmlFor="image_write" style={{ display: 'block' }}>사진 업로드</label>
            <div id="filelist">
            </div>
          </>
        }
      </form>
    </div>
  )
}
