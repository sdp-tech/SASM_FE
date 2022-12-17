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
  left: 35.6%;
`

export default function SpotDetail(props) {
  const { modalClose } = props;
  const data = props.detailInfo;
  const reviewInfo = props.reviewInfo;
  const id = props.id;
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
        style={{ overflow: "auto",
        position: "fixed",
        top: `calc(64px)`,
        }}
        sx={{
          height:`calc(100vh - 64px)`,
          padding: "0",
          boxSizing: "border-box",
          width: "100%",
          overflow: "hidden",
          maxWidth: "25%",
          bgcolor: "#FFFFFF",
        }}
      >
        <DetailCard
          id={data?.id}
          MainImage={data?.rep_pic}
          StoreName={data?.place_name}
          Category={data?.category}
          PlaceReview={data?.place_review}
          ShortCur={data?.short_cur}
          Address={data?.address}
          Mon={data?.mon_hours}
          Tues={data?.tues_hours}
          Wed={data?.wed_hours}
          Thurs={data?.thurs_hours}
          Fri={data?.fri_hours}
          Sat={data?.sat_hours}
          Sun={data?.sun_hours}
          open_hours={data?.open_hours}
          Photo0={data?.photos?.[0].image}
          Photo1={data?.photos?.[1].image}
          Photo2={data?.photos?.[2].image}
          story_id={data?.story_id}
          place_like={data?.place_like}
          statistics={data?.category_statistics}
          reviewInfo={reviewInfo}
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
