import React from 'react'
import styled from 'styled-components'
import SearchBar from '../../../common/SearchBar'
import SearchBlack from "../../../../assets/img/search_black.svg"

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
  border: 1px red solid;
  width: 10%;
  position: absolute;
  right: 0;
  display: flex;
`

export default function FreeBoardList({list, setMode, setTarget}) {
  return (
    <>
      <SearchFilterBar>
        <SearchBar
          // search={tempSearch}
          // onChangeSearch={onChangeSearch}
          // handleFilterToggle={handleFilterToggle}
          // handleSearchToggle={handleSearchToggle}
          placeholder="어떤 장소가 궁금하신가요"
          searchIcon={SearchBlack}
          background="#FFFFFF"
          color="#000000"
        />
      </SearchFilterBar>
      {/* <Pagination></Pagination> */}
      <ListWrapper style={{ borderTop: '1px rgba(0,0,0,0.5) solid', borderBottom: '1px rgba(0,0,0,0.5) solid' }}>
        <Place>장소명</Place>
        <Title>제목</Title>
        <Writer>작성자</Writer>
        <CreatedAt>등록일</CreatedAt>
      </ListWrapper>
      {
        list.map((data, index) => (
          <ListWrapper onClick={() => {
            setMode('detail')
            setTarget(data.id)
          }}
            key={index}
          >
            <Place>{data.id}</Place>
            <Title>{data.title}</Title>
            <Writer>{data.category}</Writer>
          </ListWrapper>
        ))
      }
      <UploadButton
        onClick={() => {
          setMode('upload');
        }}
      >
        글쓰기
      </UploadButton>
    </>
  )
}
