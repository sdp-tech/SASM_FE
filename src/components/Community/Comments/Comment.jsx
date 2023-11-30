import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Request from '../../../functions/common/Request';
import ReportComment from '../Reports/ReportComment';
import UpdateComment from './UpdateComment';
import WriteComment from './WriteComment';
import OtherUserData from '../../../functions/common/OtherUserData';

const CommentWrapper = styled.div`
  border-bottom: 1px black solid;
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  padding: 1% 0;
`
const Contents = styled.div(({ isParent }) => ({
  width: '100%',
  paddingLeft: isParent ? '0' : '5%',

}))
const Title = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 1.2rem;
`
const Content = styled.div`
  width: 100%;
  margin: 1vh 0;
`
const Photos = styled.div`
  width: 100%;
`
const ButtonWrapper = styled.div`
  display: flex; 
`
const Button = styled.button`
  border: none;
  outline: none;
  background-color: #FFFFFF;
  cursor: pointer;
  & + & {
    border-left: 1px black solid;
  }
  padding: 0.5vh 1vw;
`
const Writer = styled.span`
  cursor: pointer;
  &:hover {
    color: #1E90FF;
  }
`


export default function Comment({ data, id, format }) {
  //reply의 default는 대댓글을 작성하지 않는 false
  const [reply, setReply] = useState(false);
  //update의 default는 댓글을 수정하지 않느 false
  const [update, setUpdate] = useState(false);
  const [otherUser, setOtherUser] = useState({});
  const [open, setOpen] = useState(false);
  const [report, setReport] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const navigate = useNavigate();
  const email = localStorage.getItem('email');
  const request = Request(navigate);
  const rerender = () => {
    setRefresh(!refresh);
  }
  const handleReply = () => {
    setReply(!reply);
    setUpdate(false);
  }
  const handleUpdate = () => {
    setUpdate(!update);
    setReply(false);
  }
  const deleteComment = async () => {
    const response = await request.del(`/community/post_comments/${data.id}/delete`);
    window.location.reload();
  }
  const reportComment = async () => {
    setReport(true);
  }
  let isWriter = false;
  if (data.email == email) {
    isWriter = true;
  }
  const otherUserData = async (email) => {
    const response = await request.get('/mypage/user/', {
      email: email
    });
    setOtherUser(response.data.data);
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
  }
  useEffect(() => {
    open && otherUserData(data.email);
  },[refresh])
  return (
    <>
    {open && <OtherUserData open = {open} userData = {otherUser} handleClose = {handleClose} rerender={rerender}/>}
      {update ?
        <UpdateComment data={data} setUpdate={setUpdate} /> :
        <CommentWrapper>
          <Contents isParent={data.isParent}>
            <Title>
              <Writer onClick={() => {otherUserData(data.email)}}>{data.nickname}</Writer>
              <ButtonWrapper>
                {isWriter && <Button onClick={deleteComment}>삭제</Button>}
                {isWriter && <Button onClick={handleUpdate}>수정</Button>}
                {data.isParent && <Button onClick={handleReply}>댓글</Button>}
                {!isWriter && <Button onClick={reportComment}>신고</Button>}
              </ButtonWrapper>
            </Title>
            <Content>
              {data.content}
              <Photos>
                {data.photoList?.map((data, index) => (
                  <img src={data} key={index} style={{ width: '50px', height: '50px' }}></img>
                ))}
              </Photos>
            </Content>
            {data.updated.slice(0, 10)} {data.updated.slice(11, 19)}
            <span style={{color:'#999999', marginLeft:'10px'}}>
              {data.created.slice(0, 19) != data.updated.slice(0, 19) ? '수정됨' : null}
            </span>
          </Contents>
          {reply && <WriteComment id={id} isParent={false} parentId={data.id} format={format} />}
          {report && <ReportComment id={data.id} report={report} setReport={setReport}></ReportComment>}
        </CommentWrapper>}
    </>
  )
}
