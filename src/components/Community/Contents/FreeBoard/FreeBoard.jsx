import React from 'react'
import styled from 'styled-components'
import { useNavigate, useParams } from 'react-router-dom'
import { useState } from 'react'
import { useEffect } from 'react'
import Request from '../../../../functions/common/Request'
import { useCookies } from 'react-cookie'
import Loading from '../../../common/Loading'
import FreeBoardList from './FreeBoardList'
import FreeBoardDetail from './FreeBoardDetail'
import FreeBoardUpload from './FreeBoardUpload'

const Section = styled.div`
  position: relative;
`
const Board = styled.div`
  font-size: 2rem;
  padding: 0 5%;
  border: 1px blue solid;
  display: flex;
  justify-content: space-between;
  align-items: center;
`
const Contents = styled.div`
  margin-top: 5vh;
  border: 1px red solid;
`
const BackButton = styled.div`
  font-size: 1rem;
`


export default function FreeBoard() {
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState('default')
  const [target, setTarget] = useState(null);
  const params = useParams()
  const navigate = useNavigate()
  const [cookies, setCookie, removeCookie] = useCookies(["name"]);
  const request = new Request(cookies, localStorage, navigate);
  const [list, setList] = useState([]);
  const [detail, setDetail] = useState([{}]);
  useEffect(() => {
  })

  const getItem = async () => {
    setLoading(true);
    const response = await request.get("/stories/story_search/", {
      page: 1,
    }, null);
    setList(response.data.data.results);
    setLoading(false);
  }

  const getDetail = async () => {
    setLoading(true);
    const response = await request.get("/stories/story_detail/", { id: target }, null);
    setDetail(response.data.data[0]);
    setLoading(false);
  }

  useEffect(() => {
    getItem()
    console.log(list)
  }, [])
  useEffect(() => {
    getDetail(target);
  }, [target])
  return (
    <>
      {
        loading ?
          <Loading />
          :
          <Section>
            <Board>자유게시판
              {
                {
                  'detail':<BackButton onClick={()=>{setMode('default')}}>뒤로가기</BackButton>,
                  'upload':<BackButton onClick={()=>{setMode('default')}}>뒤로가기</BackButton>
                }[mode]
              }
            </Board>
            <Contents>
              {
                {
                  'default': <FreeBoardList list={list} setMode={setMode} setTarget={setTarget} />,
                  'detail': <FreeBoardDetail detail={detail} />,
                  'upload': <FreeBoardUpload/>
                }[mode]
              }
            </Contents>

          </Section>
      }
    </>
  )
}
