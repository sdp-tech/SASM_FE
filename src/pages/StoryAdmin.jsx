import * as React from "react";
import styled from "styled-components";
import Navibar from "../components/common/Navibar";
import { useNavigate } from "react-router";
import { useParams } from "react-router-dom";
import StoryFormPage from "../components/Admin/StoryFormPage";


export default function StoryAdmin() {
    const params = useParams();

    return (
        <Sections>
            {params.id ? <StoryFormPage id={params.id} /> : <StoryFormPage />}
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
