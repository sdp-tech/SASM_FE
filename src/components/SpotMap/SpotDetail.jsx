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
import Request from "../../functions/common/Request.js";
import Loading from "../common/Loading.js";

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

export default function SpotDetail({ modalClose, id, setTemp}) {
  const [isSasmAdmin, setIsSasmAdmin] = useState(false);
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [detailData, setDetailData] = useState([]);
  const [reviewData, setReviewData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dataLoading, setDataLoading] = useState(true);
  const [cookies, setCookie, removeCookie] = useCookies(["name"]);
  const token = localStorage.getItem("accessTK"); //localStorage에서 accesstoken꺼내기
  useEffect(() => {
    checkSasmAdmin(token, setLoading, cookies, localStorage, navigate).then((result) => setIsSasmAdmin(result));
  }, []);
  const request = new Request(cookies, localStorage, navigate);
  const getItem = async () => {
    setDataLoading(true);
    const response_detail = await request.get("/places/place_detail/", { id: id });
    const response_review = await request.get("/places/place_review/", { id: id });
    setReviewData(response_review.data.data);
    setDetailData(response_detail.data.data);
    setDataLoading(false);
    setTemp({
      lat: response_detail.data.data.latitude,
      lng: response_detail.data.data.longitude,
    });
  }
  useEffect(()=>{
    getItem();
  }, [])
  return (
    <>
      {dataLoading ? <></>: <StyledList
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
      </StyledList>}
    </>
  );
}
