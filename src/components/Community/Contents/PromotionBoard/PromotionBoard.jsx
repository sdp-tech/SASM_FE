import React from 'react'
import styled from 'styled-components'
import { useNavigate, useParams } from 'react-router-dom'
import { useState } from 'react'
import { useEffect } from 'react'
import Request from '../../../../functions/common/Request'
import { useCookies } from 'react-cookie'
import Loading from '../../../common/Loading'
import PromotionBoardList from './PromotionBoardList'
import PromotionBoardUpload from './PromotionBoardUpload'

const Contents = styled.div`
`

export default function PromotionBoard() {
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
      board: 3,
    }, null);
    setList(response.data.data.results);
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
              <PromotionBoardUpload handleMode={handleMode}></PromotionBoardUpload>
              :
              <PromotionBoardList list={list} handleMode={handleMode}></PromotionBoardList>
            }
          </Contents>
      }
    </div>
  )
}