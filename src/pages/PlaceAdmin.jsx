import * as React from "react";
import styled from "styled-components";
import Navibar from "../components/common/Navibar";
import { useNavigate } from "react-router";
import { useParams } from "react-router-dom";
import PlaceFormPage from "../components/Admin/PlaceFormPage";


export default function PlaceAdmin() {
    const params = useParams();

    return (
        <div>
            <Navibar />
            {params.id ? <PlaceFormPage id={params.id} /> : <PlaceFormPage />}
        </div>
    );
}

// const Sections = styled.div`
//   box-sizing: border-box;
//   display: grid;
//   position: relative;
//   height: 100vh;
//   grid-template-rows: 0.15fr 0.85fr;
//   grid-template-areas:
//     "navibar"
//     "place";
// `;
