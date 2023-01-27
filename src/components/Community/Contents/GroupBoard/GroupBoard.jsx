import React from 'react'
import styled from 'styled-components'
import { useNavigate, useParams } from 'react-router-dom'
import { useState } from 'react'
import { useEffect } from 'react'
import Request from '../../../../functions/common/Request'
import { useCookies } from 'react-cookie'
import Loading from '../../../common/Loading'
import GroupBoardList from './GroupBoardList'
import GroupBoardUpload from './GroupBoardUpload'

const Contents = styled.div`
`

export default function GroupBoard() {
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState(false);
  const navigate = useNavigate()
  const [cookies, setCookie, removeCookie] = useCookies(["name"]);
  const request = new Request(cookies, localStorage, navigate);
  const [list, setList] = useState([]);
  const [detail, setDetail] = useState([{}]);
  
  const handleMode = () => {
    setMode(!mode);
  }
 
  const getItem = async () => {
    setLoading(true);
    const response = await request.get("/community/posts/", {
      board: 4,
    }, null);
    setList(response.data.data);
    console.log(response.data.data);
    setLoading(false);
  }

  useEffect(() => {
    getItem()
  }, [])
  return (
    <div>
      {
        loading ?
          <Loading />
          :
          <Contents>
            {
              mode?
              <GroupBoardUpload handleMode={handleMode}></GroupBoardUpload>
              :
              <GroupBoardList list={list} handleMode={handleMode}></GroupBoardList>
            }
          </Contents>
      }
    </div>
  )
}