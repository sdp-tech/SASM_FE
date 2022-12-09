import React from "react";
import styled from "styled-components";
import searchIcon from "../../assets/img/search.svg";
import filteringIcon from "../../assets/img/filtering.svg";

const Wrapper = styled.form`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-wrap: nowrap;
`;

const SearchForm = styled.input`
  height: 100%;
  border-box: box-sizing;
  outline: none;
  flex-grow: 1;
  padding: 0 0 0 2%;
  border: none;
  border-top-left-radius: 56px;
  border-bottom-left-radius: 56px;
  text-align: center;
`;

const IconWrapper = styled.div`
  // background-color: pink;

  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 2%;
  cursor: pointer;
`;

const FilterIcon = styled.div``;
export default function SearchBar({
  handleFilterToggle,
  handleSearchToggle,
  onSearch,
  search,
  onChangeSearch,
  placeholder,
}) {
  return (
    <Wrapper onSubmit={handleSearchToggle}>
      <SearchForm
        placeholder={placeholder}
        value={search}
        onChange={onChangeSearch}
      />
      <IconWrapper type="submit" onClick={handleSearchToggle}>
        <img src={searchIcon}></img>
      </IconWrapper>
      
    </Wrapper>
  );
}
