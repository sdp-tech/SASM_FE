import React, { useEffect, useRef } from 'react'
import { useState } from 'react'
import { useCookies } from 'react-cookie';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import Request from '../../functions/common/Request';
import Loading from '../common/Loading'
import styled from 'styled-components';
import ReportPost from './Reports/ReportPost';
import HeartButton from '../common/Heart';
import WriteComment from './Comments/WriteComment';
import Comment from './Comments/Comment';
import CommunityUpdate from './CommunityUpdate';
import Pagination from "../common/Pagination";
import qs from 'qs';

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
  display: flex;
  align-items: center;
  justify-content: space-between;
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
  margin-top: 5%;
  height: 5%;
`
const Button = styled.button`
  width: 10%;
  outline:none;
  border:none;
  cursor: pointer;
  background-color: #FFFFFF;
  & + & {
    border-left: 1px #000000 solid;
  }
`
const CommentsWrapper = styled.div`
  width: 100%;
`

export default function CommunityDetail({ board, id, format }) {
  const [loading, setLoading] = useState(true);
  const [detail, setDetail] = useState({});
  const [review, setReview] = useState({
    total:0,
    data:'',
  });
  const [cookies, setCookie, removeCookie] = useCookies(["name"]);
  //mode false -> detail / true -> update
  const [mode, setMode] = useState(false);
  const [like, setLike] = useState(false);
  const [report, setReport] = useState(false);
  const location = useLocation();
  const queryString = qs.parse(location.search, {
    ignoreQueryPrefix: true
  });
  const node = useRef();
  const email = localStorage.getItem('email');
  const navigate = useNavigate()
  const request = new Request(cookies, localStorage, navigate);
  const getDetail = async () => {
    const response_detail = await request.get(`/community/posts/${id}`);
    setDetail(response_detail.data);
    setLike(response_detail.data.likes);
    setLoading(false);
  }
  const getReview = async () => {
    const response_review = await request.get(`/community/post_comments/`, {
      post: id,
      page: queryString.page,
    })
    setReview({total:response_review.data.data.count, data:response_review.data.data.results});
  }

  useEffect(() => {
    getDetail();
  }, [like]);
  useEffect(()=>{
    getReview();
  }, [queryString.page])
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
    if (window.confirm('삭제하시겠습니까?')) {
      const response = await request.delete(`/community/posts/${id}/delete/`);
      navigate(`/community/${board}?page=1`);
      alert('삭제되었습니다.');
    }
  }
  const likeItem = async () => {
    const response = await request.post(`/community/posts/${id}/like/`);
    setLike(!like);
  }
  useEffect(()=>{
    console.log(review);
  }, [review])
  return (
    <>
      {
        loading ?
          <Loading />
          :
          <>
            {mode ?
              <CommunityUpdate setMode={setMode} detail={detail} id={id} format={format}></CommunityUpdate> :
              <Section>
                {report && <ReportPost id={id} report={report} setReport={setReport} />}
                <Title>
                  {detail.title}
                  <HeartButton like={like} onClick={likeItem} />
                </Title>
                <Info>
                  <span style={{ margin: '0 5% 0 0' }}>
                    작성자 | {detail.nickname}
                  </span>
                  작성일 | {detail.updated.slice(0, 10)}
                </Info>
                <Content>
                  {detail.board == '2' ?
                    <>
                      {
                        detail.content.split('\n').map((line, index) => {
                          return (<span key={index}>{line}<br /></span>)
                        })
                      }
                    </> :
                    <>{detail.content}</>
                  }
                  {
                    format.supportsPostPhotos &&
                    <ImageWrapper>
                      {
                        detail.photoList && <>
                          {detail.photoList.map((data, index) => (
                            <Image key={index} src={data}></Image>
                          ))}</>
                      }
                    </ImageWrapper>
                  }
                </Content>
                {
                  format.supportsHashtags &&
                  <HashtagWrapper>
                    {detail.hashtagList.map((data, index) => (
                      <span key={index}>#{data}</span>
                    ))}
                  </HashtagWrapper>
                }
                <ButtonWrapper>
                  <Button onClick={() => { setReport(true) }}>신고하기</Button>
                  {
                    isWriter && <Button onClick={deleteItem}>삭제하기</Button>
                  }
                  {
                    isWriter && <Button onClick={() => { setMode(true) }}>수정하기</Button>
                  }
                </ButtonWrapper>
                <WriteComment format={format} id={id} isParent={true}></WriteComment>
                <CommentsWrapper>
                  { review.data &&
                    review.data.map((data, index) => (
                      <Comment format={format} key={index} id={id} data={data} />
                    ))
                  }
                </CommentsWrapper>
                <Pagination page={queryString.page} total={review.total} limit={20}/>
              </Section>
            }
          </>
      }
    </>
  )
}
