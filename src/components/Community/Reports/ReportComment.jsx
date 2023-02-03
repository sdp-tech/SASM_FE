import React, { useEffect, useRef } from 'react'
import { useCookies } from 'react-cookie'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import Request from '../../../functions/common/Request'
import { REPORT_LIST } from './ReportPost'


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


export default function ReportComment({ report, setReport, id }) {
  const node = useRef();
  const [cookies, setCookie, removeCookie] = useCookies(["name"]);
  const navigate = useNavigate();
  const request = new Request(cookies, localStorage, navigate);

  const reportItem = async (category) => {
    const formData = new FormData()
    formData.append('comment', id)
    formData.append('category', category)
    const response = await request.post(`/community/post_comment_reports/create/`, formData, { "Content-Type": "multipart/form-data" })
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
        <ReportTitle>댓글 신고</ReportTitle>
        <ReportMenu>
          {REPORT_LIST.map((data, index) => (
            <ReportList key={index} onClick={() => { reportItem(data.name) }} id={data.id}>{data.name}</ReportList>
          ))}
        </ReportMenu>
      </ReportBox>
    </ReportBg>
  )
}
