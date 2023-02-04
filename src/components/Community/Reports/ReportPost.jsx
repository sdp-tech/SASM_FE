import React, { useEffect, useRef } from 'react'
import { useCookies } from 'react-cookie'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import Request from '../../../functions/common/Request'


const ReportBg = styled.div`
  width: 100%;
  height: calc(100vh - 64px);
  position: fixed;
  top: 64px;
  left: 0;
  background-color: rgba(255,255,255,0.6);
  z-index: 5;
  display: flex;
  justify-content: center;
  align-items: center;
`
const ReportBox = styled.div`
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

export const REPORT_LIST = [
  { id: 0, name: "게시판 성격에 부적절함" },
  { id: 1, name: "음란물/불건전한 만남 및 대화" },
  { id: 2, name: "사칭/사기성 게시글" },
  { id: 3, name: "욕설/비하" },
  { id: 4, name: "낚시/도배성 게시글" },
  { id: 5, name: "상업적 광고 및 판매" },
];

export default function ReportPost({ report, setReport, id }) {
  const node = useRef();
  const [cookies, setCookie, removeCookie] = useCookies(["name"]);
  const navigate = useNavigate();
  const request = new Request(cookies, localStorage, navigate);

  const reportItem = async (category) => {
    const formData = new FormData()
    formData.append('post', id)
    formData.append('category', category)
    const response = await request.post(`/community/post_reports/create/`, formData, { "Content-Type": "multipart/form-data" })
  }
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
  return (
    <ReportBg>
      <ReportBox ref={node}>
        <ReportTitle>게시글 신고</ReportTitle>
        <ReportMenu>
          {REPORT_LIST.map((data, index) => (
            <ReportList key={index} onClick={() => { reportItem(data.name) }} id={data.id}>{data.name}</ReportList>
          ))}
        </ReportMenu>
      </ReportBox>
    </ReportBg>
  )
}
