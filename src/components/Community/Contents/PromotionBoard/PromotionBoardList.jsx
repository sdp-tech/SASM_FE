import React, { useState } from 'react'
import styled from 'styled-components'
import SearchBar from '../../../common/SearchBar'
import SearchBlack from "../../../../assets/img/search_black.svg"
import { Link } from 'react-router-dom'

const SearchFilterBar = styled.div`
  width: 60%;
  margin: 5vh auto;
`
const ListWrapper = styled.div`
  display: flex;
  text-align: center;
  padding: 2% 0;
  & + & {
    border-bottom: 1px rgba(0,0,0,0.5) solid;
  }
`
const Place = styled.div`
  width: 20%;
`
const Title = styled.div`
  width: 40%;
`
const Writer = styled.div`
  width: 20%;
`
const CreatedAt = styled.div`
  width: 20%;
`
const UploadButton = styled.div`
  width: 10%;
  position: absolute;
  right: 0;
  display: flex;
`
const StyledLink = styled(Link)`
  width: 40%;
  color: #000000;
  text-decoration: none;
  cursor: pointer;
`
export default function PromotionBoardList({ list, handleMode }) {
  // const [search, setSearch] = useState('');
  // const [tempSearch, setTempSearch] = useState('');
  // const onChangeSearch = (e) => {
  //   e.preventDefault();
  //   setTempSearch(e.target.value);
  // };
  // const handleSearchToggle = async (e) => {
  //   if (e) {
  //     e.preventDefault();
  //   }
  //   if (tempSearch === null || tempSearch === "") {
  //     //검색어 없을 경우 전체 리스트 반환
  //     setSearch('');
  //   } else {
  //     //검색어 있는 경우
  //     setSearch(tempSearch);
  //   }
  // };
  return (
    <div>
      {/* <SearchFilterBar>
        <SearchBar
          search={tempSearch}
          onChangeSearch={onChangeSearch}
          handleSearchToggle={handleSearchToggle}
          placeholder="어떤 장소가 궁금하신가요"
          searchIcon={SearchBlack}
          background="#FFFFFF"
          color="#000000"
        />
      </SearchFilterBar> */}
      {/* <Pagination></Pagination> */}
      <ListWrapper style={{ borderTop: '1px rgba(0,0,0,0.5) solid', borderBottom: '1px rgba(0,0,0,0.5) solid' }}>
        <Place>장소명</Place>
        <Title>제목</Title>
        <Writer>작성자</Writer>
        <CreatedAt>등록일</CreatedAt>
      </ListWrapper>
      {

        list.map((data, index) => (
          <ListWrapper key={index}>
            <Place>{data.id}</Place>
            <StyledLink to={`/community/${data.id}`}>
              {data.title}
            </StyledLink>
            <Writer>{data.nickname}</Writer>
            <CreatedAt>{data.updated.slice(0, 10)}</CreatedAt>
          </ListWrapper>
        ))
      }
      <UploadButton
        onClick={handleMode}
      >
        글쓰기
      </UploadButton>
    </div>
  )
}
