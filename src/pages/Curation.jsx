import * as React from "react";
import styled from "styled-components";
import CurationListPage from "../components/Curation/CurationListPage";
export default function Curation() {
  return (
    <Sections>
      <CurationListPage />
    </Sections>
  )
}

const Sections = styled.div`
box-sizing: border-box;
display: grid;
position: relative;
height: calc(100vh - 64px);
grid-template-rows: 1fr;
grid-template-areas:
  "curation";
`;
