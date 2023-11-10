import * as React from "react";
import { useState, useEffect } from "react";
import { List } from "@mui/material";
import DetailCard from "./SpotDetail/DetailCard";
import styled from "styled-components";
import AdminButton from "../../components/Admin/components/AdminButton";
import checkSasmAdmin from "../../components/Admin/Common";
import { useNavigate } from "react-router";
import Request from "../../functions/common/Request.js";

const StyledList = styled(List)`
  font-family: pretendard;
  top: 70px;
  height: calc(100vh - 75px);
  left: 28.5%;
  border-radius: 10px;
  max-width: 25%;
  @media screen and (max-width : 1024px){
    left: 0%;
    top: calc((100vh - 64px) * 0.4 + 64px);
    height: calc(100vh - (100vh - 64px) * 0.4 - 64px);
    max-width: 100%;
  }
  z-index: 102;
  &::-webkit-scrollbar {
    display: none;
  }
`

export default function SpotDetail({ modalClose, id, setTemp, like, setLike, open_hour }) {
  const [isSasmAdmin, setIsSasmAdmin] = useState(false);
  const navigate = useNavigate();
  const [detailData, setDetailData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dataLoading, setDataLoading] = useState(true);
  const token = localStorage.getItem("accessTK"); //localStorage에서 accesstoken꺼내기
  const request = Request(navigate);

  const getDetail = async () => {
    setDataLoading(true);
    const response_detail = await request.get(`/places/place_detail/${id}/`);
    setDetailData(response_detail.data.data);
    setDataLoading(false);
    setTemp({
      lat: response_detail.data.data.latitude,
      lng: response_detail.data.data.longitude,
    });
  }

  useEffect(() => {
    checkSasmAdmin(token, setLoading, navigate).then((result) => setIsSasmAdmin(result));
    getDetail();
  }, [])
  return (
    <>
      {
        dataLoading ? <></> :
          <StyledList
            style={{ overflowY: "scroll", position: "fixed" }}
            sx={{ padding: "0", boxSizing: "border-box", width: "100%", bgcolor: "#FFFFFF" }}
          >
            <DetailCard detailData={detailData} modalClose={modalClose} like={like} setLike={setLike} open_hour={open_hour} />
            {
              isSasmAdmin &&
              <AdminButton style={{ margin: "auto", width: "20%", fontSize:"13px" }} onClick={() => { navigate(`/admin/place/${id}`); }}  >
                장소 수정
              </AdminButton>
            }
          </StyledList>
      }
    </>
  );
}
