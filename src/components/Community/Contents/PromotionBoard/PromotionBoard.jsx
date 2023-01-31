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
import SearchBar from '../../../common/SearchBar'
import SearchBlack from '../../../../assets/img/search_black.svg'
import Pagination from '../../../common/Pagination'

const Contents = styled.div`
`
const SearchFilterBar = styled.div`
  position: relative;
  width: 60%;
  margin: 5vh auto;
`
const HashtagListWrapper = styled.div`
  position: absolute;
  width: 100%;
`
const HashtagList = styled.div`
  background-color: rgba(0,0,0,0.5);
  color: #FFFFFF;
  padding: 5%;
  display: flex;
  justify-content: space-between;
  cursor: pointer;
`
export default function PromotionBoard() {
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState(false);
  const navigate = useNavigate()
  const [cookies, setCookie, removeCookie] = useCookies(["name"]);
  const request = new Request(cookies, localStorage, navigate);
  const [list, setList] = useState([]);
  const [listHashtag, setListHashtag] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [search, setSearch] = useState('');
  const [tempSearch, setTempSearch] = useState('');
  const onChangeSearch = (e) => {
    if (e.target.value[0] == '#') {
      if (e.target.value.slice(1).length == 0) {
        setListHashtag([]);
      }
      else {
        getHashTag(e.target.value.slice(1));
      }
    }
    setTempSearch(e.target.value);
  };
  const handleSearchToggle = async (e) => {
    if (e) {
      e.preventDefault();
    }
    if (tempSearch === null || tempSearch === "") {
      //검색어 없을 경우 전체 리스트 반환
      setSearch('');
    }
    else if (tempSearch.includes('#')){
    }
    else {
      //검색어 있는 경우
      setSearch(tempSearch);
    }
  };
  const handleMode = () => {
    setMode(!mode);
  }
  const getHashTag = async (search) => {
    const response = await request.get("/community/post_hashtags", {
      board: 3,
      query: search,
    })
    setListHashtag(response.data.data.results);
  }
  const getItem = async () => {
    setLoading(true);
    const response = await request.get("/community/posts/", {
      board: 3,
      query: search,
      query_type: 'default',
      page: page,
    }, null);
    setList(response.data.data.results);
    setTotal(response.data.data.count);
    setLoading(false);
  }
  const getItemHashtag = async (search) => {
    setListHashtag([]);
    setLoading(true);
    const response = await request.get("/community/posts/", {
      board: 3,
      query: search,
      query_type: 'hashtag',
      page: page,
    }, null);
    setList(response.data.data.results);
    setTotal(response.data.data.count);
    setLoading(false);
  }
  useEffect(() => {
    getItem();
  }, [page, search])
  return (
    <div>
      {
        loading ?
          <Loading />
          :
          <Contents>
            {
              mode ?
                <PromotionBoardUpload handleMode={handleMode}></PromotionBoardUpload>
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
                    <HashtagListWrapper>
                      {listHashtag.map((data, index) => (
                        <HashtagList onClick={()=>{getItemHashtag(data.name)}} key={index}><span>{data.name}</span><span>게시물 {data.postCount}개</span></HashtagList>
                      ))}
                    </HashtagListWrapper>
                  </SearchFilterBar>
                  <PromotionBoardList list={list} handleMode={handleMode} />
                  <Pagination total={total} limit="5" page={page} setPage={setPage} />
                </>
            }
          </Contents>
      }
    </div>
  )
}