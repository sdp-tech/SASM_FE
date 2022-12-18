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
  max-width: 100%;
  margin : 0 0 0 2.5%;
  padding: 3%;
  border-bottom: 1px black solid;
  &:last-child {
    border-bottom: none;
  }
  display: flex;
  flex-direction: row;
  overflow: hidden;
`;

const ImgBox = styled.div`
  border:1px black solid;
  min-width:15vmin;
  min-height:15vmin;
  max-width:15vmin;
  max-height:15vmin;
`;
const TextBox = styled.div`
  width: 100%;
  color: black;
  display: flex;
  flex-flow : row wrap;
  margin: 0 0 0 3%;
`;
const TitleBox = styled.div`
  font-size: 1.25rem;
  font-weight: 700;
  border-bottom: 1px solid #999999;
  width: 100%;
  position: relative;
  display: flex;
  justify-content:space-around;
  flex-flow : row wrap;
`;
const ContentBox = styled.div`
  font-size: 0.75rem;
  height:60%;
  font-weight: 400;
  color: black;
  display: flex;
  flex-flow : column wrap;
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
  const [reviewInfo, setReviewInfo] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
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
    const response_review = await request.get("/places/place_review/", {
      id: id,
    }, null);
    setDetailInfo(response.data.data);
    setReviewInfo(response_review.data.data);
    setModalOpen(true);
    setTemp({
      center: {
        lat: response.data.data.latitude,
        lng: response.data.data.longitude,
      },
      zoom: 13,
    });
    document.getElementById(id).style.color = 'red';
    setLoading(false);
  };

  useEffect(() => {
    if (props.modalOpen) handleClick();
  }, []);

  const MarkerReset = () => {
    for (let i = 0; i < document.getElementsByClassName("iw_inner").length; i++) {
      document.getElementsByClassName("iw_inner")[i].style.color = 'black';
    }
  }

  useEffect(() => {
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
            width="100%"
            height="100%"
          />
        </ImgBox>
        <TextBox>
          <TitleBox>
            <div style={{width:'100%', cursor: "pointer"}} onClick={handleClick}>
              {props.StoreName}
            </div>
            <LikeButton style={{ position: 'absolute', right: '5%', bottom: '2%' }}>
              {props.place_like === "ok" ? (
                <HeartButton like={!like} onClick={toggleLike} />
              ) : (
                <HeartButton like={like} onClick={toggleLike} />
              )}
            </LikeButton>
            <div style={{width:'100%',fontWeight: "400", fontSize:"1rem" }}>
              {props.StoreType}
            </div>
          </TitleBox>

          <ContentBox>
            <div style={{color:"#999999"}}>
              {props.place_review}
            </div>
            <div>
              {props.Address}
            </div>
            <div>
              {props.open_hours}
            </div>
          </ContentBox>
        </TextBox>
      </StyledCard>
      <DetailBox>
        {modalOpen && (
          <SpotDetail
            modalClose={modalClose}
            id={props.id}
            detailInfo={detailInfo}
            reviewInfo={reviewInfo}
          ></SpotDetail>
        )}
      </DetailBox>
    </div>
  );
}
