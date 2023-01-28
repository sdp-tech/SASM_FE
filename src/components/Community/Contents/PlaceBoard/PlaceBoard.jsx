import React from 'react'
import styled from 'styled-components'
import { useNavigate, useParams } from 'react-router-dom'
import { useState } from 'react'
import { useEffect } from 'react'
import Request from '../../../../functions/common/Request'
import { useCookies } from 'react-cookie'
import Loading from '../../../common/Loading'
import SearchBar from "../../../common/SearchBar"
import SearchBlack from "../../../../assets/img/search_black.svg"
import Pagination from "../../../common/Pagination"
import PlaceBoardUpload from './PlaceBoardUpload'
import PlaceBoardList from './PlaceBoardList'
const Contents = styled.div`
`

const SearchFilterBar = styled.div`
  width: 60%;
  margin: 5vh auto;
`
export default function PlaceBoard() {
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState(false);
  const navigate = useNavigate()
  const [cookies, setCookie, removeCookie] = useCookies(["name"]);
  const request = new Request(cookies, localStorage, navigate);
  const [list, setList] = useState([]);
  const [search, setSearch] = useState('');
  const [tempSearch, setTempSearch] = useState('');
  const onChangeSearch = (e) => {
    e.preventDefault();
    setTempSearch(e.target.value);
  };
  const handleSearchToggle = async (e) => {
    if (e) {
      e.preventDefault();
    }
    if (tempSearch === null || tempSearch === "") {
      //검색어 없을 경우 전체 리스트 반환
      setSearch('');
    } else {
      //검색어 있는 경우
      setSearch(tempSearch);
    }
    console.log(tempSearch);
  };
  const handleMode = () => {
    setMode(!mode);
  }

  const getItem = async () => {
    setLoading(true);
    const response = await request.get("/community/posts/", {
      board: 2,
      query: search,
      //page: page,
    }, null);
    setList(response.data.data);
    console.log(response.data.data);
    //setTotal(response.data.data.conunt);
    setLoading(false);
  }

  useEffect(() => {
    getItem()
  }, [search])
  return (
    <div>
      {
        loading ?
          <Loading />
          :
          <Contents>
            {
              mode ?
                <PlaceBoardUpload handleMode={handleMode}></PlaceBoardUpload>
                :
                <>
                  <SearchFilterBar>
                    <SearchBar
                      search={tempSearch}
                      onChangeSearch={onChangeSearch}
                      handleSearchToggle={handleSearchToggle}
                      placeholder="검색어를 입력하세요"
                      searchIcon={SearchBlack}
                      background="#FFFFFF"
                      color="#000000"
                    />
                  </SearchFilterBar>
                  <PlaceBoardList list={list} handleMode={handleMode} />
                  {/* <Pagination total={total} limit="5" page={page} setPage={setPage}/> */}
                </>
            }
          </Contents>
      }
    </div>
  )
}
