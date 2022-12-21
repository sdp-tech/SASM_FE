import React, { useState } from "react";
import styled from "styled-components";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { CardMedia } from "@mui/material";
import HeartButton from "../../common/Heart";
import { useCookies } from "react-cookie";
import axios from "axios";
import Loading from "../../common/Loading";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Request from "../../../functions/common/Request";
// import { device } from "../../device.js";

const TitleBox = styled.div`
  box-sizing: border-box;
  display: flex;
  width: 100%;
  color: #6c6c6c;
  margin-top: 7%;
  @media screen and (max-width: 768px) {
    width:100%;
  }
  font-size: 1rem;
`;

const StoreNameBox = styled.div`
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  width: 100%;
  color: #000000;
  @media screen and (max-width: 768px) {
    width:100%;
    margin: 0;
  }
  font-size: 1.25rem;
`;

const CategoryBox = styled.div`
  box-sizing: border-box;
  display: flex;
  margin-top: 2.5%;
  width: 100%;
  color: #000000;
  @media screen and (max-width: 768px) {
    width:100%;
  }
  font-size:0.8rem;
`;
const OptionBox = styled.div`
  box-sizing: border-box;
  display: flex;
  width: 100%;
  color: #999999;
  padding-left: 2%;
  border-left: 2px solid #000000;
  @media screen and (max-width: 768px) {
    width:100%;
  }
  font-size: 0.8rem;
`;

const ContentBox = styled.div`
  box-sizing: border-box;
  display: flex;
  margin-top: 1rem;
  width: 100%;
  overflow: hidden;
  min-height: 86px;
  max-height: 86px;
  color: #797979;
  @media screen and (max-width: 768px) {
    width:100%;
  }
  font-size: 0.8rem;
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
  margin: "2% 3% 2% 0"
});
const StyledCard = styled(Card)`
  display: flex;
  min-height: 15vw;
  min-width: 30vw;
  max-height: 15vw;
  max-width: 30vw;
  flex-direction: row;
  @media screen and (max-width: 768px) {
    flex-direction: column;
    min-height: 500px;
    min-width: 250px;
    max-height: 500px;
    max-width: 250px;
  }
`

export default function ItemCard(props) {
  const [like, setLike] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies(["name"]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const request = new Request(cookies, localStorage, navigate);

  // 좋아요 클릭 이벤트
  const toggleLike = async () => {
    // const token = cookies.name; // 쿠키에서 id 를 꺼내기
    const token = localStorage.getItem("accessTK"); //localStorage에서 accesstoken꺼내기

    if (!token) {
      alert("로그인이 필요합니다.");
    } else {
      const response = await request.post("/stories/story_like/", { id: props.id }, null);
      console.log("response", response);

      //색상 채우기
      setLike(!like);
    }
  };

  return (
    <div>
      <StyledCard
        sx={{
          alignItems: "center",
          boxShadow: "none",
        }}
      >
        <Link to={`/story/${props.id}`} style={{ textDecoration: "none" }}>
          <CardMedia
            component="img"
            sx={{
              16: 9,
              minHeight: "15vw",
              minWidth: "15vw",
              maxHeight: "15vw",
              maxWidth: "15vw",
              display: "flex",
              borderRadius: "10%",
            }}
            image={props.rep_pic}
            alt="placeImage"
          />
        </Link>
        <CardContent
          sx={{
            // flexGrow: 1,
            minHeight: "15vw",
            minWidth: "15vw",
            maxHeight: "15vw",
            maxWidth: "15vw",
            display: "flex",
            flexFlow: "column",
            position: "relative",
          }}
        >
          {/* 제목, 식당이름, 장소 카테고리, 장소 옵션들, 미리보기(preivew) */}
          <StoreNameBox>
            <Typography
              component={"span"}
              variant="p"
              fontFamily={"Pretendard"}
              fontWeight="700"
              margin="auto 0"
            >
              {props.place_name}
            </Typography>
            <LikeButton>
              {props.story_like === "ok" ? (
                <HeartButton like={!like} onClick={toggleLike} />
              ) : (
                <HeartButton like={like} onClick={toggleLike} />
              )}
            </LikeButton>
          </StoreNameBox>
          <Link to={`/story/${props.id}`} style={{ textDecoration: "none" }}>
            <TitleBox>
              <Typography
                component={"span"}
                fontFamily={"Pretendard"}
                fontWeight="400"
                variant="p"
              >
                {props.title}
              </Typography>
            </TitleBox>
          </Link>
          <CategoryBox>
            <Typography
              component={"span"}
              fontFamily={"Predendard"}
              fontWeight="600"
              variant="p"
            >
              {props.category}
            </Typography>
          </CategoryBox>

          <OptionBox>
            <Typography
              component={"span"}
              fontFamily={"Pretendard"}
              fontWeight="600"
              variant="p"
            >
              {props.semi_category}
            </Typography>
          </OptionBox>

          <ContentBox>
            <Typography
              component={"span"}
              fontFamily={"Pretendard"}
              fontWeight="600"
              variant="p"
            >
              {props.preview}
            </Typography>
          </ContentBox>
        </CardContent>
      </StyledCard>
    </div>
  );
}
