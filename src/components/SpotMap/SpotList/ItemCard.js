import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";

import archiveIcon from "../../../assets/img/Like.png";
import SpotDetail from "../SpotDetail";
import HeartButton from "../../common/Heart";

// import { getCookie } from "../../common/Cookie";
import { useCookies } from "react-cookie";
import axios from "axios";
import Loading from "../../common/Loading";
import { useNavigate } from "react-router-dom";
import Request from "../../../functions/common/Request";

const StyledCard = styled.div`
  position: relative;
  padding: 1em;
  border-bottom: 1px solid #99a0b0;
  border-right: 1px solid #99a0b0;
  &:last-child {
    border-bottom: none;
  }
  display: flex;
  flex-direction: row;
  max-height: 200px;
  overflow: hidden;
`;

const ImgBox = styled.div`
  min-width: 180px;
  min-height: 180px;
  max-width: 180px;
  max-height: 180px;
`;
const TextBox = styled.div`
  font-size: 1em;
  color: black;
  min-width: 280px;
  // border: 1px solid red;
  margin: 0.7em;
`;
const TitleBox = styled.div`
  font-size: 1.3em;
  font-weight: 700;
  color: black;
  padding: 0 0 2px 5px;
  border-bottom: 1px solid #000000;
  display: flex;
  flexdirection: column;
  width: 100%;
  justify-content: space-between;
`;
const ContentBox = styled.div`
  font-size: 1em;
  font-weight: 500;
  color: black;
  padding: 0 0 2px 5px;
`;
const FirstBox = styled.div`
  font-size: 1em;
  font-weight: 500;
  color: black;
  // border: 1px solid red;
  // max-height: 60px;
`;
const SecondBox = styled.div`
  font-size: 1em;
  font-weight: 500;
  color: black;
  // border: 1px solid yellow;
`;
const Content = styled.p`
  font-size: 0.9em;
  font-weight: 500;
  color: black;
  // margin: -4px;
  // border: 1px solid green;
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
  height: "30px",
  width: "30px",
});

const DetailBox = styled.div`
  // boxsizing: border-box;
  position: absolute;
  z-index: 6;
  height: 100vh;
`;

export default function ItemCard(props) {
  const [like, setLike] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies(["name"]);
  const [detailInfo, setDetailInfo] = useState([]);
  const [modalOpen, setModalOpen] = useState(props.modalOpen);
  const [loading, setLoading] = useState(true);
  const node = useRef();
  const navigate = useNavigate();
  const request = new Request(cookies, localStorage, navigate);
  const setTemp = (data) => {
    props.setTemp(data);
  }
  // 상세보기 모달 닫기 이벤트
  const modalClose = () => {
    setModalOpen(!modalOpen);
  };

  // const token = cookies.name; // 쿠키에서 id 를 꺼내기
  const token = localStorage.getItem("accessTK"); //localStorage에서 accesstoken꺼내기

  // 좋아요 클릭 이벤트
  const toggleLike = async () => {
    // alert(`${props.id}`);
    if (!token) {
      alert("로그인이 필요합니다.");
    } else {
      const response = await request.post("/places/place_like/", { id: props.id }, null);
      // console.log("response", response);

      //색상 채우기
      setLike(!like);
    }
  };

  // 상세보기 클릭 이벤트
  const handleClick = async () => {
    // alert(`${props.id}`);
    setLoading(true);
    const id = props.id;
    const response = await request.get("/places/place_detail/", { id: id }, null);
    // console.log("response??", response.data);
    setDetailInfo(response.data.data);
    setModalOpen(true);
    setTemp({
      center: {
        lat: response.data.data.latitude,
        lng: response.data.data.longitude,
      },
      zoom:13,
    });
    document.getElementById(id).style.color='red';
    setLoading(false);
  };

  const MarkerReset = () => {
    for(let i=0; i<document.getElementsByClassName("iw_inner").length; i++) {
      document.getElementsByClassName("iw_inner")[i].style.color='black';
    }
  }

  useEffect(() => {
    if(modalOpen) handleClick();
    const clickOutside = (e) => {
      MarkerReset();
      // 모달이 열려 있고 모달의 바깥쪽을 눌렀을 때 창 닫기
      if (modalOpen && node.current && !node.current.contains(e.target)) {
        setModalOpen(false);
      }
    };

    document.addEventListener("mousedown", clickOutside);

    return () => {
      // Cleanup the event listener
      document.removeEventListener("mousedown", clickOutside);
    };
  }, [modalOpen]);

  return (
    <div ref={node}>
      <StyledCard key={Date.now()}>
        <ImgBox style={{ cursor: "pointer" }} onClick={handleClick}>
          <img
            src={props.ImageURL}
            className="image--itemcard"
            alt="placeImage"
            width="180px"
            height="200px"
          />
        </ImgBox>
        <TextBox>
          <TitleBox>
            <div style={{ cursor: "pointer" }} onClick={handleClick}>
              {props.StoreName}
            </div>
            <LikeButton>
              {props.place_like === "ok" ? (
                <HeartButton like={!like} onClick={toggleLike} />
              ) : (
                <HeartButton like={like} onClick={toggleLike} />
              )}
            </LikeButton>
          </TitleBox>

          <ContentBox>
            <FirstBox>
              <p
                style={{
                  fontSize: "0.9em",
                  fontWeight: "500",
                  color: "black",
                }}
              >
                {props.StoreType}
              </p>
              <p
                style={{
                  fontSize: "0.9em",
                  fontWeight: "500",
                  color: "black",
                  marginTop: "-1em",
                }}
              >
                {props.place_review}
              </p>
            </FirstBox>
            <SecondBox>
              <p
                style={{
                  fontSize: "0.9em",
                  fontWeight: "500",
                  color: "black",
                  marginTop: "-0.2em",
                }}
              >
                주소 : {props.Address}
              </p>
              <p
                style={{
                  fontSize: "0.9em",
                  fontWeight: "500",
                  color: "black",
                  marginTop: "-1em",
                }}
              >
                오늘 영업시간 : {props.open_hours}
              </p>
            </SecondBox>
            {/* <Content>영업시간 : {props.OpeningHours}</Content> */}
            {/* <Content>화 : {props.tues_hours}</Content>
        <Content>수 : {props.wed_hours}</Content> */}
          </ContentBox>
        </TextBox>
      </StyledCard>
      <DetailBox>
        {modalOpen && (
          <SpotDetail
            modalClose={modalClose}
            id={props.id}
            detailInfo={detailInfo}
          ></SpotDetail>
        )}
      </DetailBox>
    </div>
  );
}
