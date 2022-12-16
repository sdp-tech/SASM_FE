import React from "react";
import styled from "styled-components";

const Wrapper = styled.form`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-wrap: nowrap;
  background-color:${props => props.background};
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
  background-color:${props => props.background};
  border-radius: 100px;
  color: ${props => props.color};
  ::placeholder,
  ::-webkit-input-placeholder {
    text-align: center;
    color: ${props => props.color};
  }
  :-ms-input-placeholder {
    text-align: center;
    color: ${props => props.color};
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
  searchIcon,
  background,
  color,
}) {
  return (
    <Wrapper onSubmit={handleSearchToggle} background={background}>
      <SearchForm
        placeholder={placeholder}
        value={search}
        onChange={onChangeSearch}
        background={background}
        color={color}
      />
      <IconWrapper type="submit" onClick={handleSearchToggle}>
        <img src={searchIcon}></img>
      </IconWrapper>
    </Wrapper>
  );
}
