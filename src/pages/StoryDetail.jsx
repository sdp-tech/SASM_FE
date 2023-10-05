import { useState, useEffect } from "react";
import styled from "styled-components";
import Navibar from "../components/common/Navibar";
import { useNavigate } from "react-router";
import { useParams } from "react-router-dom";
import { useCookies } from "react-cookie";
import StoryDetail from "../components/Story/StoryDetailPage";
import checkSasmAdmin from "../components/Admin/Common";
import AdminButton from "../components/Admin/components/AdminButton";

export default function StoryList() {
  const [cookies, setCookie, removeCookie] = useCookies(["name"]);
  const [isSasmAdmin, setIsSasmAdmin] = useState(false);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const params = useParams();
  // const token = cookies.name; // 쿠키에서 id 를 꺼내기
  const token = localStorage.getItem("accessTK"); //localStorage에서 accesstoken꺼내기

  useEffect(() => {
    checkSasmAdmin(token, setLoading, cookies, localStorage, navigate).then((result) => setIsSasmAdmin(result));
  }, [page]);

  return (
    <>
      <Sections>
        <StoryDetail />
      </Sections>
    </>
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
  // background: black;
`;
