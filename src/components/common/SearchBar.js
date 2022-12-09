import React from "react";
import styled from "styled-components";
import searchIcon from "../../assets/img/search_white.svg";

const Wrapper = styled.form`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-wrap: nowrap;
  background-color:#44ADF7;
  border-radius: 100px;
  box-shadow: 4px 4px 4px rgba(0,0,0,0.2);
`;

const SearchForm = styled.input`
  height: 100%;
  border-box: box-sizing;
  outline: none;
  flex-grow: 1;
  padding: 0 0 0 10%;
  border:none;
  background-color:#44ADF7;
  border-radius: 100px;
  color: white;
  ::placeholder,
  ::-webkit-input-placeholder {
    text-align: center;
    color: white;
  }
  :-ms-input-placeholder {
    text-align: center;
    color: white;
  }
`;

const IconWrapper = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 2%;
  cursor: pointer;
  margin : 0 2% 0 0;
`;

export default function SearchBar({
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
