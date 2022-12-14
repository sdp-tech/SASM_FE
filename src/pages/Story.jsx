import * as React from "react";
import styled from "styled-components";
import Navibar from "../components/common/Navibar";
import { useNavigate } from "react-router";
import StoryListPage from "../components/Story/StoryListPage";

export default function StoryList() {
  return (
    <Sections>
      <StoryListPage />
    </Sections>
  );
}

const Sections = styled.div`
box-sizing: border-box;
display: grid;
position: relative;
height: calc(100vh - 64px);
grid-template-rows: 1fr;
grid-template-areas:
  "story";
`;
