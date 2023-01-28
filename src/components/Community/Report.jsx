import React, { useEffect, useRef } from 'react'
import styled from 'styled-components'


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

export default function Report({report, setReport}) {
  const node = useRef();
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
          <ReportList>게시판 성격에 부적절함</ReportList>
          <ReportList>음란물/불건전한 만남 및 대화</ReportList>
          <ReportList>사칭 / 사기성 게시글</ReportList>
          <ReportList>욕설 / 비하</ReportList>
          <ReportList>낚시 / 도배성 게시글</ReportList>
          <ReportList>상업적 광고 및 판매</ReportList>
        </ReportMenu>
      </ReportBox>
    </ReportBg>
  )
}
