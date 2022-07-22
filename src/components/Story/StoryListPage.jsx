import * as React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router";
import StoryList from "./components/StoryList";
import SearchBar from "./components/SearchBar";

const StoryListPage = () => {
  const viewPage = () => {
    window.location.href = "/detail"; //replace는 뒤로가기 불가능, href는 가능
  };
  const navigate = useNavigate();

  return (
    <>
      <SearchBarSection>
        <SearchFilterBar>
          <SearchBar />
        </SearchFilterBar>
      </SearchBarSection>
      <StoryListSection>
        <StoryList />
      </StoryListSection>
    </>
  );
};

const SearchBarSection = styled.div`
  position: relative;
  // margin: 15px 0px 15px 15px;
  // margin: 20px;
  height: 105px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  grid-area: story;
  align-items: center;
  justify-content: center;
`;
const StoryListSection = styled.div`
  position: relative;
  // margin: 15px 0px 15px 15px;
  margin-top: 105px;
  display: flex;
  flex-direction: column;
  // overflow: hidden;
  grid-area: story;
  // border: 1px solid green;
`;

const SearchFilterBar = styled.div`
  width: 600px;
  height: 50px;
  // min-height: 5%;
  border: 1px solid #99a0b0;
  box-sizing: border-box;
`;
export default StoryListPage;
