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
    <Section>
      <SearchBarSection>
        <SearchFilterBar>
          <SearchBar />
        </SearchFilterBar>
      </SearchBarSection>
      <StoryListSection>
        <StoryList />
      </StoryListSection>
    </Section>
  );
};
const Section = styled.div`
  box-sizing: border-box;
  position: relative;
  height: 100%;
  width: 100%;
  grid-area: story;
  display: flex;
  flex-direction: column;
`;
const SearchBarSection = styled.div`
  box-sizing: border-box;
  position: relative;
  height: 8%;
  width: 100%;
  display: flex;
  margin-top: 0.1%;
  flex-direction: column;
  grid-area: story;
  align-items: center;
  justify-content: center;
  // border: 1px solid red;
`;
const StoryListSection = styled.div`
  box-sizing: border-box;
  position: relative;
  height: 90%;
  width: 100%;
  margin-top: 1%;
  display: flex;
  flex-direction: column;
  grid-area: story;
  scrollbar-height: thin;
  // border: 1px solid yellow;
`;

const SearchFilterBar = styled.div`
  box-sizing: border-box;
  width: 35%;
  height: 70%;
  border: 3px solid #99a0b0;
`;
export default StoryListPage;
