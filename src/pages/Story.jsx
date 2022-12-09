import * as React from "react";
import styled from "styled-components";
import Navibar from "../components/common/Navibar";
import { useNavigate } from "react-router";
import StoryListPage from "../components/Story/StoryListPage";

export default function StoryList() {
  return (
    <Sections>
      <Navibar />
      <StoryListPage />
    </Sections>
  );
}

const Sections = styled.div`
  box-sizing: border-box;
  display: grid;
  position: relative;
  height: 100vh;
  grid-template-rows: 0.0625fr 0.9375fr;
  grid-template-areas:
    "navibar"
    "story";
  // background-color: black;
`;
