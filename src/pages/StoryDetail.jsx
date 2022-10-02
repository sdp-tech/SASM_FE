import { useState, useEffect } from "react";
import styled from "styled-components";
import Navibar from "../components/common/Navibar";
import { useNavigate } from "react-router";
import { useParams } from "react-router-dom";
import { useCookies } from "react-cookie";
import StoryDetail from "../components/Story/StoryDetailPage";
import checkSasmAdmin from "../components/Admin/Common";
import AdminButton from "../components/Admin/components/AdminButton"

export default function StoryList() {
  const [cookies, setCookie, removeCookie] = useCookies(["name"]);
  const [isSasmAdmin, setIsSasmAdmin] = useState(false);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const params = useParams();
  const token = cookies.name; // 쿠키에서 id 를 꺼내기

  useEffect(() => {
    checkSasmAdmin(token, setLoading).then(result => setIsSasmAdmin(result));
  }, [page]);

  return (
    <>
      <Sections>
        <Navibar />
        <StoryDetail />
      </Sections>
      <FooterSection>
        {isSasmAdmin ?
          <AdminButton onClick={() => {
            navigate(`/admin/story/${params.id}`)
          }}>스토리 수정</AdminButton> : <></>}
      </FooterSection>
    </>
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
  // background: black;
`;
const FooterSection = styled.div`
  position: relative;
  display: flex;
  flex-direction: roow;
  padding-bottom: 0.25rem;
  // overflow: hidden;
  // grid-area: story;
  height: 100%;
  justify-content: center;
  align-items: center;
  // background: black;
  `;