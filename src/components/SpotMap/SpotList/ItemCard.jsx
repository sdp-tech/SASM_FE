import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import SpotDetail from "../SpotDetail";
import HeartButton from "../../common/Heart";
import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useNavigate, useLocation } from "react-router-dom";
import Request from "../../../functions/common/Request";
import MarkerbgActive from "../../../assets/img/Map/MarkerbgActive.svg";
import MarkerbgDefault from "../../../assets/img/Map/MarkerbgDefault.svg";
import MarkerbgSelect from "../../../assets/img/Map/MarkerbgSelect.svg";
import qs from "qs";

const StyledCard = styled.div`
  position: relative;
  max-width: 100%;
  margin: 0 0 0 2.5%;
  padding: 3%;
  border-bottom: 1px black solid;
  &:last-child {
    border-bottom: none;
  }
  display: flex;
  flex-direction: row;
  overflow: hidden;
`;

const ImgLink = styled(Link)`
  border: 1px black solid;
  min-width: 15vmin;
  min-height: 15vmin;
  max-width: 15vmin;
  max-height: 15vmin;
  cursor: pointer;
  @media screen and (max-width: 768px) {
    min-width: 25vmin;
    min-height: 25vmin;
    max-width: 25vmin;
    max-height: 25vmin;
  }
`;
const TextBox = styled.div`
  width: 100%;
  display: flex;
  flex-flow: row wrap;
  margin: 0 0 0 3%;
`;
const TitleBox = styled.div`
  font-size: 1.25rem;
  font-weight: 700;
  border-bottom: 1px solid #999999;
  width: 100%;
  position: relative;
  display: flex;
  justify-content: space-around;
  flex-flow: row wrap;
`;

const TitleLink = styled(Link)`
  width: 100%;
  cursor: "pointer";
  text-decoration : none;
  color: inherit;
`;

const ContentBox = styled.div`
  font-size: 0.75rem;
  min-height: 60%;
  font-weight: 400;
  color: black;
  display: flex;
  flex-flow: column wrap;
  justify-content: space-between;
`;
// 기존에 존재하는 버튼에 재스타일
const Button = styled.button`
  background-color: #ffffff;
  height: 50px;
  font-size: 20px;
  font-weight: 700;
  border-radius: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
`;
const LikeButton = styled(Button)({
  boxSizing: "border-box",
  border: "none",
  display: "flex",
  height: "20px",
  width: "20px",
});

const DetailBox = styled.div`
  // boxsizing: border-box;
  position: absolute;
`;

export default function ItemCard({ placeData, categoryNum, setTemp }) {
  const [like, setLike] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies(["name"]);
  const location = useLocation();
  const queryString = qs.parse(location.search, {
    ignoreQueryPrefix: true
  });
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const node = useRef();
  const navigate = useNavigate();
  const [bool, setBool] = useState(false);
  useEffect(() => {
    if (categoryNum != 0) {
      setBool(true);
    } else {
      setBool(false);
    }
  }, [categoryNum]);
  const request = new Request(cookies, localStorage, navigate);
  // 상세보기 모달 닫기 이벤트
  const modalClose = () => {
    setModalOpen(!modalOpen);
  };

  const token = localStorage.getItem("accessTK"); //localStorage에서 accesstoken꺼내기

  // 좋아요 클릭 이벤트
  const toggleLike = async () => {
    if (!token) {
      alert("로그인이 필요합니다.");
    }
    else {
      const response = await request.post("/places/place_like/", { id: placeData.id });
      //색상 채우기
      setLike(!like);
    }
  };
  // 마커 전부 초기화
  const MarkerReset = () => {
    const text = document.getElementById(`${placeData.id}text`);
    if (text) {
      text.style.transform = "none";
      if (!bool) {
        text.style.display = "none";
      }
    }
    if (!bool) {
      document.getElementById(`${placeData.id}bg`).style.backgroundImage = `url(${MarkerbgDefault})`;
    } else {
      document.getElementById(`${placeData.id}bg`).style.backgroundImage = `url(${MarkerbgActive})`;
    }
    document.getElementById(placeData.id).style.zIndex = "1";
  };
  // 상태에 맞는 마커 스타일 변경
  const MarkerChange = () => {
    const text = document.getElementById(`${placeData.id}text`);
    if (text) {
      text.style.transform = "translateY(100%)";
      if (!bool) {
        text.style.display = "block";
      }
    }
    document.getElementById(`${placeData.id}bg`).style.backgroundImage = `url(${MarkerbgSelect})`;
    document.getElementById(placeData.id).style.zIndex = "100";
  };

  // 상세보기 클릭 이벤트
  const handleClick = () => {
    MarkerChange();
    setModalOpen(true);
  };

  useEffect(() => {
    const clickOutside = (e) => {
      // 모달이 열려 있고 모달의 바깥쪽을 눌렀을 때 창 닫기
      if (modalOpen && node.current && !node.current.contains(e.target)) {
        setModalOpen(false);
        MarkerReset();
      }
    };
    document.addEventListener("mousedown", clickOutside);
    return () => {
      // Cleanup the event listener
      document.removeEventListener("mousedown", clickOutside);
    };
  });

  return (
    <div ref={node}>
      <StyledCard key={Date.now()}>
        <ImgLink to={`/map?page=${queryString.page}&place=${placeData.place_name}`} onClick={handleClick}>
          <img src={placeData.rep_pic} className="itemcard_image" alt="placeImage" width="100%" height="100%" />
        </ImgLink>
        <TextBox>
          <TitleBox>
            <TitleLink to={`/map?page=${queryString.page}&place=${placeData.place_name}`} onClick={handleClick}>
              {placeData.place_name}
            </TitleLink>
            <LikeButton style={{ position: "absolute", right: "5%", bottom: "2%" }}>
              {
                placeData.place_like === "ok" ? (
                  <HeartButton like={!like} onClick={toggleLike} />
                ) : (
                  <HeartButton like={like} onClick={toggleLike} />
                )
              }
            </LikeButton>
            <div style={{ width: "100%", fontWeight: "400", fontSize: "1rem" }}>
              {placeData.category}
            </div>
          </TitleBox>

          <ContentBox>
            <div style={{ color: "#999999" }}>{placeData.place_review}</div>
            <div>{placeData.address}</div>
            <div>{placeData.open_hours}</div>
          </ContentBox>
        </TextBox>
      </StyledCard>
      <DetailBox>
        {
          modalOpen && <SpotDetail like={like} setLike={setLike} setTemp={setTemp} modalClose={modalClose} id={placeData.id} />
        }
      </DetailBox>
    </div>
  );
}
