import React, { useState } from "react";
import styled from "styled-components";
import HeartButton from "../../common/Heart";
import { useCookies } from "react-cookie";
import List from "@mui/material/List";
import Collapse from "@mui/material/Collapse";
import toggleOpen from "../../../assets/img/toggleOpen.svg"
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Request from "../../../functions/common/Request";
import OpenTimeImg from "../../../assets/img/PlaceDetail/OpenTime.svg"
import PlaceImg from "../../../assets/img/PlaceDetail/PlaceMarker.svg"
import { Tabs, Tab } from "@mui/material";
import PropTypes from "prop-types";
import CloseDetail from "../../../assets/img/PlaceDetail/CloseDetail.svg"
import Reviews from "./Reviews";

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

export default function DetailCard({ detailData, modalClose, like, setLike }) {
  const [value, setValue] = useState(0);
  const [cookies, setCookie, removeCookie] = useCookies(["name"]);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const request = new Request(cookies, localStorage, navigate);
  const handleClick = () => {
    setOpen(!open);
  };
  const token = localStorage.getItem("accessTK"); //localStorage에서 accesstoken꺼내기
  // 좋아요 클릭 이벤트
  const toggleLike = async () => {
    if (!token) {
      alert("로그인이 필요합니다.");
    } else {
      const response = await request.post("/places/place_like/", { id: detailData.id }, null);
      //색상 채우기
      setLike(!like);
    }
  };
  const handleTab = (event, value) => {
    setValue(value);
  }

  return (
    <StyledCard className="component component--item_card">
      <CloseButton>
        <img src={CloseDetail} onClick={modalClose} alt="close button" />
      </CloseButton>
      <ImgBox>
        <img src={detailData.rep_pic} className="image--itemcard" alt="main image" width="600px" height="400px" />
      </ImgBox>
      <TextBox>
        <InfoBox>
          <p style={{ fontSize: "1.5rem", fontWeight: "700", marginBottom: '-1%' }}>{detailData.place_name}</p>
          <p style={{ fontSize: "1.25rem", fontWeight: "400" }}>{detailData.category}</p>
          <ButtonBox>
            {/* 스토리가 있는 경우에만 버튼 띄우기 */}
            {detailData.story_id ? (
              <Link to={`/story/${detailData.story_id}`} style={{ textDecoration: "none" }} >
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
              <img src={toggleOpen} style={open ? { transform: 'rotate(180deg)' } : {}} />
            </ListButton>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <div
                  style={{ fontSize: "0.8rem", fontWeight: "500" }}
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
                    <img src={data.image} alt={`place images`} width="100%" height="100%" />
                  </a>
                )
              })
            }
          </PhotoBox>
          <ShortCurBox>
            <p>{detailData.short_cur}</p>
          </ShortCurBox>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Reviews setValue={setValue} id={detailData.id} category={detailData.category} />
        </TabPanel>
      </TextBox>
    </StyledCard >
  );
}