import React from "react";
import styled from "styled-components";

const Wrapper = styled.form`
  position: relative;
  display: flex;
  flex-wrap: nowrap;
  background-color:${props => props.background};
  border-radius: 100px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.3);
  align-items: center;
  padding: 1% 0;
  width: 100%;
`;

const SearchForm = styled.input`
  height: 100%;
  border-box: box-sizing;
  outline: none;
  border: none;
  flex-grow: 1;
  margin-left: 5%;
  background-color:${props => props.background};
  color: ${props => props.color};
  ::placeholder,
  ::-webkit-input-placeholder {
    font-size: ${props => props.fontsize};
    text-align: center;
    color: ${props => props.color};
  }
  :-ms-input-placeholder {
    font-size: ${props => props.fontsize};
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
  fontsize,
}) {
  return (
    <Wrapper onSubmit={handleSearchToggle} background={background}>
      <SearchForm
        placeholder={placeholder}
        value={search}
        onChange={onChangeSearch}
        background={background}
        color={color}
        fontsize={fontsize}
      />
      <IconWrapper type="submit" onClick={handleSearchToggle}>
        <img src={searchIcon} style={{transform:'scale(0.8)'}} />
      </IconWrapper>
    </Wrapper>
  );
}
