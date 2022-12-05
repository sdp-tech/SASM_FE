import React, { useState } from "react";
import styled from "styled-components";
import HeartButton from "../../common/Heart";
import { useCookies } from "react-cookie";
import axios from "axios";
import List from "@mui/material/List";
import Collapse from "@mui/material/Collapse";
import openButton from "../../../assets/img/openButton.png";
// import GoToMapImg from "../../../assets/img/GoToMapImg.png";
import GoToStoryImg from "../../../assets/img/GoToStoryImg.png";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Request from "../../../functions/common/Request";
import WriteReview from "./WriteReview";
import UserReview from "./UserReview";

const StyledCard = styled.section`
  width: 100%;
`;
const ImgBox = styled.div`
  width: 100%;
  height: 260px;
  display: flex;
  justify-content: center;
  align-items: center;
  // border: 1px solid red;
  overflow: hidden;
`;
const TextBox = styled.div`
  font-size: 1em;
  color: black;
  min-width: 280px;
  // border: 1px solid yellow;
  margin: 0.7em 1.4em 0.7em 1.4em;
  // margin: 5em;
`;
const LikeBox = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  height: 60px;
  width: 100%;
  margin-top: -45px;
`;
const CategoryBox = styled.div`
  box-sizing: border-box;
  font-size: 1.3em;
  font-weight: 400;
  color: black;
  border-bottom: 1.3px solid #000000;
  // border: 1px solid red;
  display: flex;
  width: 90%;
  height: auto;
  justify-content: space-between;
`;

const ReviewBox = styled.div`
  height: auto;
  margin: 20px 0px;
  padding: 0.017px;
  background: #cbced7;
  font-size: 1em;
`;
const AddressBox = styled.div`
  height: auto;
  width: 90%;
  margin-left: 4.5%;
`;

const PhotoBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  // height: 00px;
`;

const ShortCurBox = styled.div`
  height: auto;
  background: #ffffff;
`;

const Title = styled.p`
  color: #7c1d30;
  font-size: 2em;
  margin-top: -2px;
  min-width: 300px;
`;
// 기존에 존재하는 버튼에 재스타일
const Button = styled.button`
  height: 50px;
  background: none;
  border: none;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
`;
const LikeButton = styled(Button)({
  boxSizing: "border-box",
  border: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  height: "30px",
  width: "30px",
  marginTop: "30px",
});
const ListButton = styled(Button)({
  boxSizing: "border-box",
  border: "none",
  display: "flex",
  fontSize: "1em",
  width: "100%",
  marginLeft: "-1.5%",
  marginTop: "-3%",
});
const ButtonDiv = styled.div`
  box-sizing: border-box;
  height: 50px;
  width: 200px;
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  // margin: 7px;
`;
const StatisticBox = styled.div`
  border:1px black solid;
`
const MapButton = styled(Button)({
  border: 0,
  borderRadius: "15px",
  // boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
  boxShadow:
    "0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23)" /* 그림자 */,
  color: "#5480E5",
  display: "flex",
  width: "110px",

  // justifyContent: "flex-end",
});
const ButtonImg = styled.div`
  box-sizing: border-box;
  height: 15px;
  width: 15px;
  display: flex;
  margin: 2px 2px 2px 2px;
`;
const ButtonText = styled.div`
  box-sizing: border-box;
  display: flex;
  margin: 2px 4px 2px 3px;
  min-width: 80px;
  font-weight: 600;
`;

export default function DetailCard({
  key,
  id,
  MainImage,
  StoreName,
  Category,
  PlaceReview,
  ShortCur,
  Address,
  Mon,
  Tues,
  Wed,
  Thurs,
  Fri,
  Sat,
  Sun,
  open_hours,
  Photo0,
  Photo1,
  Photo2,
  story_id,
  place_like,
  reviewInfo,
  statistics
}) {
  const [mode, setMode] = useState('write');
  const [target, setTarget] = useState(null);
  const [like, setLike] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies(["name"]);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const request = new Request(cookies, localStorage, navigate);
  const [reviewOpen, setReviewOpen] = useState(false);
  const handleClick = () => {
    setOpen(!open);
  };
  const handleReviewOpen = () => {
    setReviewOpen(!reviewOpen);
  }
  // const token = cookies.name; // 쿠키에서 id 를 꺼내기
  const token = localStorage.getItem("accessTK"); //localStorage에서 accesstoken꺼내기
  // 좋아요 클릭 이벤트
  const toggleLike = async () => {
    // alert(`${props.id}`);
    if (!token) {
      alert("로그인이 필요합니다.");
    } else {
      const response = await request.post("/places/place_like/", { id: id }, null);
      console.log("response", response);
      //색상 채우기
      setLike(!like);
    }
  };
  let keywords = [
    ['분위기가 좋다', '1'],
    ['혼자 가기 좋다', '2'],
    ['함께 가기 좋다', '3'],
    ['가족끼리 가기 좋다', '4'],
    ['청결하다', '5'],
    ['뷰가 좋다', '6'],
    ['지속가능성의 필요성을 느낄 수가 있다', '7']
  ]
  switch (Category) {
    case '식당 및 카페':
      keywords.push(['음식이 맛있다', '8'], ['양이 많다', '9'], ['직원분이 친절하시다', '10'])
      break;
    case '전시 및 체험공간':
      keywords.push(['전시가 멋지다', '11'], ['아이와 함께 가기 좋다', '12'], ['부모님과 함께 가기 좋다', '13'])
      break;
    case '도시 재생 및 친환경 건축물':
      keywords.push(['특색 있다', '14'])
      break;
    case '제로웨이스트 샵':
      keywords.push(['물건 종류가 다양하다', '15'])
      break;
    case '녹색 공간':
      keywords.push(['관리가 잘 되어 있다', '16'])
      break;
  }
  return (
    <StyledCard className="component component--item_card" key={key}>
      <ImgBox>
        <img
          src={MainImage}
          className="image--itemcard"
          alt="main image"
          width="600px"
          height="400px"
        />
      </ImgBox>
      <TextBox>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            minWidth: "240px",
            justifyContent: "space-between",
          }}
        >
          <Title>{StoreName}</Title>
          <ButtonDiv>
            {/* 스토리가 있는 경우에만 버튼 띄우기 */}
            {story_id ? (
              <Link
                to={`/story/${story_id}`}
                style={{ textDecoration: "none" }}
              >
                <MapButton>
                  <ButtonImg>
                    <img src={GoToStoryImg} />
                  </ButtonImg>
                  <ButtonText>Go To Story</ButtonText>
                </MapButton>
              </Link>
            ) : (
              ""
            )}
          </ButtonDiv>
        </div>
        <LikeBox>
          <CategoryBox>
            <p>{Category}</p>
          </CategoryBox>
          <LikeButton>
            {place_like === "ok" ? (
              <HeartButton like={!like} onClick={toggleLike} />
            ) : (
              <HeartButton like={like} onClick={toggleLike} />
            )}
          </LikeButton>
        </LikeBox>
        <ReviewBox>
          {/* PlaceReview */}
          <p>{PlaceReview}</p>
        </ReviewBox>
        <AddressBox>
          {/* address */}
          <p
            style={{
              fontSize: "1em",
              fontWeight: "500",
              color: "black",
              // marginTop: "-1em",
            }}
          >
            {Address}
          </p>
          {/* openingHours */}

          <ListButton onClick={handleClick}>
            <p>영업시간 : {open_hours}</p>
            {/* {open ? "∧" : "∨"} */}
            {open ? (
              <>
                <img src={openButton} style={{ transform: "rotate(180deg)" }} />
              </>
            ) : (
              <>
                <img src={openButton} />
              </>
            )}
          </ListButton>

          <Collapse in={open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <div
                style={{
                  fontSize: "1em",
                  fontWeight: "500",
                  color: "black",
                  height: "100%",
                }}
              >
                <p>월 : {Mon}</p>
                <p>화 : {Tues}</p>
                <p>수 : {Wed}</p>
                <p>목 : {Thurs}</p>
                <p>금 : {Fri}</p>
                <p>토 : {Sat}</p>
                <p>일 : {Sun}</p>
              </div>
            </List>
          </Collapse>
        </AddressBox>
        <PhotoBox>
          <a href={Photo0} style={{ display: 'block', width: '150px', height: '150px' }}>
            <img
              style={{ height: "100%", width: "100%" }}
              src={Photo0}
              className="image--itemcard"
              alt="image1"
              width="600px"
              height="400px"
            /></a>
          <a href={Photo1} style={{ display: 'block', width: '150px', height: '150px' }}>
            <img
              style={{ height: "100%", width: "100%" }}
              src={Photo1}
              className="image--itemcard"
              alt="image2"
              width="600px"
              height="400px"
            /></a>
          <a href={Photo2} style={{ display: 'block', width: '150px', height: '150px' }}>
            <img
              style={{ height: "100%", width: "100%" }}
              src={Photo2}
              className="image--itemcard"
              alt="image3"
              width="600px"
              height="400px"
            /></a>
        </PhotoBox>
        {/* images */}
        <ShortCurBox>
          {/* ShortCur */}
          <p>{ShortCur}</p>
        </ShortCurBox>
        <StatisticBox>
        </StatisticBox>
        <ReviewBox>
          {reviewOpen ? <WriteReview keywords={keywords} id={id} mode={mode} target={target}></WriteReview> : <div onClick={handleReviewOpen}>리뷰를 작성해보세요.</div>}
        </ReviewBox>
        <UserReview reviewInfo={reviewInfo.results} setMode={setMode} setReviewOpen={setReviewOpen} setTarget={setTarget}></UserReview>
      </TextBox>
    </StyledCard >
  );
}
