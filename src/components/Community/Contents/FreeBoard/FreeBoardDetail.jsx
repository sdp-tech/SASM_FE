import React, { useEffect, useState, useRef } from 'react'
import { useCookies } from 'react-cookie'
import { useNavigate, useParams } from 'react-router-dom';
import Request from '../../../../functions/common/Request';
import styled from 'styled-components';

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
const ReportBg = styled.div`
  width: 100%;
  height: 100%;
  background-color: rgba(255,255,255,0.6);
  position: absolute;
  z-index: 5;
  display: flex;
  justify-content: center;
  align-items: center;
`
const Report = styled.div`
  width: 40%;
  height: 80%;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`
const ReportTitle = styled.div`
  font-size: 1.5rem;
`
const ReportMenu = styled.div`
  width: 100%;
  height: 90%;
  background: #E5E5E5;
  box-shadow: 0px 1px 12px rgba(0, 0, 0, 0.3);
  border-radius: 3px;
  & : last-child {
    border: none;
  }
`
const ReportList = styled.div`
  height: 16.6%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.3rem;
  border-bottom: 1px black solid;
  cursor: pointer;
`
export default function FreeBoardDetail({ detail }) {
  const [cookies, setCookie, removeCookie] = useCookies(["name"]);
  const [report, setReport] = useState(false);
  const navigate = useNavigate();
  const node = useRef();
  const request = new Request(cookies, localStorage, navigate);
  const params = useParams();
  const id = params.id;
  const email = localStorage.getItem('email');
  let isWriter = false;
  // 게시판 성격에 부적절함
  //   음란물 / 불건전한 만남 및 대화
  //   사칭 / 사기성 게시글
  //   욕설 / 비하
  //   낚시 / 도배성 게시글
  //   상업적 광고 및 판매
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

  return (
    <>
      <Section>
        {report &&
          <ReportBg>
            <Report ref={node}>
              <ReportTitle>게시글 신고</ReportTitle>
              <ReportMenu>
                <ReportList>게시판 성격에 부적절함</ReportList>
                <ReportList>음란물/불건전한 만남 및 대화</ReportList>
                <ReportList>사칭 / 사기성 게시글</ReportList>
                <ReportList>욕설 / 비하</ReportList>
                <ReportList>낚시 / 도배성 게시글</ReportList>
                <ReportList>상업적 광고 및 판매</ReportList>
              </ReportMenu>
            </Report>
          </ReportBg>}
        <Title>
          {detail.title}
        </Title>
        <Info>
          <span style={{ margin: '0 5% 0 0' }}>
            작성자 | {detail.nickname}
          </span>
          작성일 | {detail.updated.slice(0, 10)}
        </Info>
        <Content>
          {detail.content}
        </Content>
        <ButtonWrapper>
          <Button onClick={() => { setReport(true) }}>신고하기</Button>
          {
            isWriter && <Button onClick={deleteItem}>삭제하기</Button>
          }
          {
            isWriter && <Button onClick={updateItem}>수정하기</Button>
          }
        </ButtonWrapper>
      </Section>
    </>
  )
}
