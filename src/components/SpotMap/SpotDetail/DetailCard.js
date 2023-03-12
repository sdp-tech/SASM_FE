import React, { useState } from "react";
import styled from "styled-components";
import HeartButton from "../../common/Heart";
import { useCookies } from "react-cookie";
import axios from "axios";
import List from "@mui/material/List";
import Collapse from "@mui/material/Collapse";
import toggleOpen from "../../../assets/img/toggleOpen.svg"
// import GoToMapImg from "../../../assets/img/GoToMapImg.png";
import GoToStoryImg from "../../../assets/img/GoToStoryImg.png";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Request from "../../../functions/common/Request";
import WriteReview from "./WriteReview";
import UserReview from "./UserReview";
import OpenTimeImg from "../../../assets/img/PlaceDetail/OpenTime.svg"
import PlaceImg from "../../../assets/img/PlaceDetail/PlaceMarker.svg"
import { Tabs, Tab } from "@mui/material";
import PropTypes from "prop-types";
import CloseDetail from "../../../assets/img/PlaceDetail/CloseDetail.svg"
import { fontWeight } from "@mui/system";

const CloseButton = styled.div`
  cursor: pointer;
  position: absolute;
  top: 3%;
  right: 0%;
  padding:3%;
  display:flex;
  background-color:#FFFFFF;
  border: 1px #999999 solid;
  border-radius: 10px 0 0 10px;
`;

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
  margin : 2% 3%;
`;
const InfoBox = styled.div`
  border-bottom: 1px #999999 solid;
  position: relative;
`
const ButtonBox = styled.div`
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0%;
  right: 0%;
`;
const ReviewBox = styled.div`
  height: auto;
  margin: 20px 0px;
  padding: 5px 10px;
  background: #E5E5E5;
  border-radius:10px;
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
  margin: 10px 0px;
`;

const ShortCurBox = styled.div`
  height: auto;
  padding: 5px 10px;
  border-radius: 10px;
  background: #E5E5E5;
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
  marginLeft: "15px"
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
const StatisticWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 10px 0;
`
const StatisticText = styled.p`
  line-height: 0.5;
  padding: 0px 10px;
`
const PercentageBar = styled.div`
  width:${props => 20 + props.width}%;
  height:100%;
  position:absolute;
  top:0%;
  background-color:#fff;
  z-index : -1;
`
const MapButton = styled(Button)({
  background: "#44ADF7",
  height: "30px",
  borderRadius: '15px',
  padding: '5px 15px',
  color: "#FFFFFF",
  fontWeight: "700",
  fontSize: "1em"
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

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <div>{children}</div>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

export default function DetailCard({ reviewData, detailData, modalClose }) {
  const [value, setValue] = useState(0);
  const [target, setTarget] = useState(null);
  const [like, setLike] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies(["name"]);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const request = new Request(cookies, localStorage, navigate);
  const [reviewOpen, setReviewOpen] = useState(false);
  const email = localStorage.getItem('email');
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
      const response = await request.post("/places/place_like/", { id: detailData.id }, null);
      console.log("response", response);
      //색상 채우기
      setLike(!like);
    }
  };
  const handleTab = (event, value) => {
    setValue(value);
  }
  let targetData;
  for (let i = 0; i < reviewData.results.length; i++) {
    if (reviewData.results[i].id == target) {
      targetData = reviewData.results[i];
    }
  }
  let keywordList = [
    ['분위기가 좋다', '1'],
    ['혼자 가기 좋다', '2'],
    ['함께 가기 좋다', '3'],
    ['가족끼리 가기 좋다', '4'],
    ['청결하다', '5'],
    ['뷰가 좋다', '6'],
    ['지속가능성의 필요성을 느낄 수가 있다', '7']
  ]
  switch (detailData.category) {
    case '식당 및 카페':
      keywordList.push(['음식이 맛있다', '8'], ['양이 많다', '9'], ['직원분이 친절하시다', '10'])
      break;
    case '전시 및 체험공간':
      keywordList.push(['전시가 멋지다', '11'], ['아이와 함께 가기 좋다', '12'], ['부모님과 함께 가기 좋다', '13'])
      break;
    case '도시 재생 및 친환경 건축물':
      keywordList.push(['특색 있다', '14'])
      break;
    case '제로웨이스트 샵':
      keywordList.push(['물건 종류가 다양하다', '15'])
      break;
    case '녹색 공간':
      keywordList.push(['관리가 잘 되어 있다', '16'])
      break;
  }
  return (
    <StyledCard className="component component--item_card">
      <CloseButton>
        <img src={CloseDetail} onClick={modalClose} />
      </CloseButton>
      <ImgBox>
        <img
          src={detailData.rep_pic}
          className="image--itemcard"
          alt="main image"
          width="600px"
          height="400px"
        />
      </ImgBox>
      <TextBox>
        <InfoBox>
          <p style={{ fontSize: "1.5rem", fontWeight: "700", marginBottom: '-1%' }}>{detailData.place_name}</p>
          <p style={{ fontSize: "1.25rem", fontWeight: "400" }}>{detailData.category}</p>
          <ButtonBox>
            {/* 스토리가 있는 경우에만 버튼 띄우기 */}
            {detailData.story_id ? (
              <Link
                to={`/story/${detailData.story_id}`}
                style={{ textDecoration: "none" }}
              >
                <MapButton>Go To Story</MapButton>
              </Link>
            ) : (
              ""
            )}
            <LikeButton>
              {detailData.place_like === "ok" ? (
                <HeartButton like={!like} onClick={toggleLike} />
              ) : (
                <HeartButton like={like} onClick={toggleLike} />
              )}
            </LikeButton>
          </ButtonBox>
        </InfoBox>
        <Tabs value={value} onChange={handleTab}>
          <Tab sx={{ width: '50%', fontSize: '1.25rem' }} label="홈" />
          <Tab sx={{ width: '50%', fontSize: '1.25rem' }} label="리뷰" />
        </Tabs>
        <TabPanel value={value} index={0}>
          <>
            <ReviewBox>
              <p>{detailData.place_review}</p>
            </ReviewBox>
            <AddressBox>
              <div style={{ display: 'flex', width: '100%' }}>
                <img style={{ width: '25px' }} src={PlaceImg} />
                <p style={{ marginLeft: '3%' }}>{detailData.address}</p>
              </div>

              <ListButton onClick={handleClick}>
                <div style={{ display: 'flex', width: '100%' }}>
                  <img style={{ width: '25px' }} src={OpenTimeImg} />
                  <p style={{ marginLeft: '3%' }}>{detailData.open_hours}</p>
                </div>
                {open ? (
                  <>
                    <img src={toggleOpen} style={{ transform: "rotate(180deg)" }} />
                  </>
                ) : (
                  <>
                    <img src={toggleOpen} />
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
                    <p>월 : {detailData.mon_hours}</p>
                    <p>화 : {detailData.tues_hours}</p>
                    <p>수 : {detailData.wed_hours}</p>
                    <p>목 : {detailData.thurs_hours}</p>
                    <p>금 : {detailData.fri_hours}</p>
                    <p>토 : {detailData.sat_hours}</p>
                    <p>일 : {detailData.sun_hours}</p>
                  </div>
                </List>
              </Collapse>
            </AddressBox>
            <PhotoBox>
              {
                detailData.photos.map((data, index) => {
                  return (
                    <a href={data.image} key={`${detailData.id}_photo_${index}`} style={{ display: 'block', width: '150px', height: '150px', margin: '5px' }}>
                      <img
                        style={{ height: "100%", width: "100%" }}
                        src={data.image}
                        className="image--itemcard"
                        alt="image"
                        width="600px"
                        height="400px"
                      /></a>
                  )
                })
              }
            </PhotoBox>
            <ShortCurBox>
              <p>{detailData.short_cur}</p>
            </ShortCurBox></>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <>
            {
              detailData.category_statistics.map((data, index) => {
                return (
                  <StatisticWrapper key={`${detailData.id}_statistics_${index}`}>
                    <StatisticText>{data[0]}</StatisticText>
                    <PercentageBar width={data[1]} />
                    <StatisticText>{data[1]}%</StatisticText>
                  </StatisticWrapper>
                );
              })
            }
            <ReviewBox>
              {reviewOpen ? <WriteReview keywordList={keywordList} id={detailData.id} target={target} targetData={targetData}/> : <div onClick={handleReviewOpen}>리뷰를 작성해보세요.</div>}
            </ReviewBox>
            {
              reviewData.results.map((data)=>{
                const isWriter = (data.writer==email);
                return(
                  <UserReview reviewData={data} setReviewOpen={setReviewOpen} setTarget={setTarget} writer={isWriter}/>
                )
              })
            }
          </>
        </TabPanel>
      </TextBox>
    </StyledCard >
  );
}
