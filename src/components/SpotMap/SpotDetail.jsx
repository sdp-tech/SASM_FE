import * as React from "react";
import { useState, useEffect } from "react";
import { List } from "@mui/material";
import DetailCard from "./SpotDetail/DetailCard.js";
import styled from "styled-components";
import AdminButton from "../../components/Admin/components/AdminButton";
import checkSasmAdmin from "../../components/Admin/Common";
import { useNavigate } from "react-router";
import { useParams } from "react-router-dom";
import { useCookies } from "react-cookie";

const StyledList = styled(List)`
  top: 64px;
  height: calc(100vh - 64px);
  left: 28%;
  max-width: 25%;
  @media screen and (max-width : 768px){
    left: 0%;
    top: calc((100vh - 64px) * 0.4 + 64px);
    height: calc(100vh - (100vh - 64px) * 0.4 - 64px);
    max-width: 100%;
  }
  z-index: 102;
`

export default function SpotDetail({ modalClose, id, detailData, reviewData }) {
  const [isSasmAdmin, setIsSasmAdmin] = useState(false);
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [cookies, setCookie, removeCookie] = useCookies(["name"]);
  // const token = cookies.name;
  const token = localStorage.getItem("accessTK"); //localStorage에서 accesstoken꺼내기
  useEffect(() => {
    checkSasmAdmin(token, setLoading, cookies, localStorage, navigate).then((result) => setIsSasmAdmin(result));
  }, [page]);
  return (
    <>
      <StyledList
        style={{
          overflow: "scroll",
          position: "fixed",
        }}
        sx={{
          padding: "0",
          boxSizing: "border-box",
          width: "100%",
          bgcolor: "#FFFFFF",
        }}
      >
        <DetailCard
          detailData={detailData}
          reviewData={reviewData}
          modalClose={modalClose}
        />
        {isSasmAdmin ? (
          <AdminButton
            style={{ margin: "auto", width: "20%" }}
            onClick={() => {
              navigate(`/admin/place/${id}`);
            }}
          >
            장소 수정
          </AdminButton>
        ) : (
          <></>
        )}
      </StyledList>
    </>
  );
}
