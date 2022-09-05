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
`;

const IconWrapper = styled.div`
  // background-color: pink;

  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 2%;
  cursor: pointer;
  border-left: 1px solid #99a0b0;
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
      {handleFilterToggle ? (
        <IconWrapper type="submit" onClick={handleFilterToggle}>
          <img src={filteringIcon}></img>
        </IconWrapper>
      ) : (
        ""
      )}
    </Wrapper>
  );
}
