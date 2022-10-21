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
const CloseButton = styled.div`
  // border-radius: 4px;
  // color: white;
  cursor: pointer;
  position: fixed;
  top: 16.3%;
  left: 28.7%;
`;

export default function SpotDetail(props) {
  const { modalClose } = props;
  const data = props.detailInfo;
  const id = props.id;
  const [isSasmAdmin, setIsSasmAdmin] = useState(false);
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [cookies, setCookie, removeCookie] = useCookies(["name"]);
  // const token = cookies.name;
  const token = localStorage.getItem("accessTK"); //localStorage에서 accesstoken꺼내기

  useEffect(() => {
    checkSasmAdmin(token, setLoading).then((result) => setIsSasmAdmin(result));
  }, [page]);
  return (
    <>
      <List
        style={{ overflow: "auto" }}
        sx={{
          // gridArea: "spotlist",
          padding: "0",
          boxSizing: "border-box",
          position: "fixed",
          top: "16.3%",
          left: "28.7%",
          width: "100%",
          // height: "100%",
          height: "82.2%",
          overflow: "hidden",
          maxWidth: "24%",
          bgcolor: "#DEE5F3",
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
      </List>

      <CloseButton>
        <button onClick={modalClose}>X</button>
      </CloseButton>
    </>
  );
}
