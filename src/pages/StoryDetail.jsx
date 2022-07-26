import * as React from "react";
import styled from "styled-components";
import Navibar from "../components/common/Navibar";
import { useNavigate } from "react-router";
import StoryDetail from "../components/Story/StoryDetailPage";

export default function StoryList() {
  return (
    <Sections>
      <Navibar />
      <StoryDetail />
    </Sections>
  );
}

const Sections = styled.div`
  box-sizing: border-box;
  display: grid;
  position: relative;
  height: 100vh;
  grid-template-rows: 0.15fr 0.85fr;
  grid-template-areas:
    "navibar"
    "story";
`;
