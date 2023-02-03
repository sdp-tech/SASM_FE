import React, { useEffect, useState, useRef } from 'react'
import { useCookies } from 'react-cookie'
import { useNavigate, useParams } from 'react-router-dom';
import Request from '../../../../functions/common/Request';
import styled from 'styled-components';
import ReportPost from '../../Reports/ReportPost';
import WriteComment from '../../Comments/WriteComment';
import Comment from '../../Comments/Comment';

const Section = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`

const Title = styled.div`
  width: 100%;
  border-top: 1px rgba(0,0,0,0.5) solid;
  border-bottom: 1px rgba(0,0,0,0.5) solid;
  padding: 2%;
  font-size: 1.5rem;
`
const Info = styled.div`
  width: 100%;
  font-size: 1rem;
  padding: 2%;
  border-bottom: 1px rgba(0,0,0,0.5) solid;
`
const Content = styled.div`
  width: 100%;
  font-size: 1rem;
  padding: 2%;
  height: 40vh;
`
const ImageWrapper = styled.div`

`
const Image = styled.img`
  height: 100px;
`
const HashtagWrapper = styled.div`
`
const ButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  position: absolute;
  bottom: 0;
  right: 0;
`
const Button = styled.button`
  width: 15%;
`
const CommentsWrapper = styled.div`
  width: 100%;
`
export default function PromotionBoardDetail({ detail, review }) {
  const [cookies, setCookie, removeCookie] = useCookies(["name"]);
  const [report, setReport] = useState(false);
  const navigate = useNavigate();
  const node = useRef();
  const request = new Request(cookies, localStorage, navigate);
  const params = useParams();
  const id = params.id;
  const email = localStorage.getItem('email');
  let isWriter = false;
  useEffect(() => {
    const clickOutside = (e) => {
      if (report && node.current && !node.current.contains(e.target)) {
        setReport(false);
      }
    };
    document.addEventListener("mousedown", clickOutside);
    return () => {
      document.removeEventListener("mousedown", clickOutside);
    };
  }, [report]);
  if (detail.email == email) {
    isWriter = true;
  }
  const deleteItem = async () => {
    const response = await request.delete(`/community/posts/${id}/delete/`);
    navigate('/community');
  }
  const updateItem = async () => {
    const formData = new FormData();
    const response = await request.put(`/community/posts/${id}/update`);
  }
  const reportItem = async () => {
    const response = await request.put(`/community/posts/${id}/update`);
  }
  const likeItem = async () => {
    const response = await request.post(`/community/posts/${id}/like/`);
  }

  return (
    <>
      <Section>
        {report && <ReportPost id={id} report={report} setReport={setReport} />}
        <Title>
          {detail.title}
          <div onClick={likeItem}>좋아요</div>
        </Title>
        <Info>
          <span style={{ margin: '0 5% 0 0' }}>
            작성자 | {detail.nickname}
          </span>
          작성일 | {detail.updated.slice(0, 10)}
        </Info>
        <Content>
          {detail.content}
          <ImageWrapper>
            {detail.photoList.map((data, index) => (
              <Image key={index} src={data}></Image>
            ))}
          </ImageWrapper>
        </Content>
        <HashtagWrapper>
          {detail.hashtagList.map((data, index) => (
            <span key={index}>#{data}</span>
          ))}
        </HashtagWrapper>
        <ButtonWrapper>
          <Button onClick={() => { setReport(true) }}>신고하기</Button>
          {
            isWriter && <Button onClick={deleteItem}>삭제하기</Button>
          }
          {
            isWriter && <Button onClick={updateItem}>수정하기</Button>
          }
        </ButtonWrapper>
        <WriteComment id={id} isParent={true}></WriteComment>
        <CommentsWrapper>{review.map((data, index) => (
          <Comment key={index} id={id} data={data} />
        ))}
        </CommentsWrapper>
      </Section>
    </>
  )
}
