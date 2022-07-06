import * as React from 'react';
import styled from "styled-components";
import searchIcon from '../../../assets/img/search.svg'
import filteringIcon from '../../../assets/img/filtering.svg'

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-wrap: nowrap;
`

const SearchForm = styled.input`
  height: 100%;
  border-box: box-sizing;
  outline: none;
  flex-grow: 1;
  padding: 0 0 0 2%;
  border: none;
`

const IconWrapper = styled.div`
  // background-color: pink;

  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 2%;
  cursor: pointer;
  border-left: 1px solid #99A0B0;
`
const FilterIcon = styled.div`

`
export default function SearchBar() {

  return (
    <Wrapper>
      <SearchForm
        placeholder='지속가능한 공간을 검색해보세요'
      />
      <IconWrapper>
        <img src={searchIcon}></img>
      </IconWrapper>
      <IconWrapper>
        <img src={filteringIcon}></img>
      </IconWrapper>
    </Wrapper>
  ) 
};