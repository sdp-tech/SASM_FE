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

const TitleBox = styled.div`
  box-sizing: border-box;
  display: flex;
  width: 90%;
  color: #6c6c6c;
  margin-top: 4%;
`;

const StoreNameBox = styled.div`
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  width: 90%;
  color: #000000;
  border-bottom: 0.7px solid #000000;
`;

const CategoryBox = styled.div`
  box-sizing: border-box;
  display: flex;
  width: 90%;
  color: #000000;
  margin-top: 4%;
`;
const OptionBox = styled.div`
  box-sizing: border-box;
  display: flex;
  width: 90%;
  color: #999999;
  padding-left: 2%;
  border-left: 2px solid #000000;
`;

const ContentBox = styled.div`
  box-sizing: border-box;
  display: flex;
  margin-top: 22px;
  width: 90%;
  overflow: hidden;
  min-height: 86px;
  max-height: 86px;
  color: #797979;
  border: 2px solid #000000;
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

export default function ItemCard(props) {
  const [like, setLike] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies(["name"]);
  const [loading, setLoading] = useState(true);

  // 좋아요 클릭 이벤트
  const toggleLike = async () => {
    const token = cookies.name; // 쿠키에서 id 를 꺼내기
    if (!token) {
      alert("로그인이 필요합니다.");
    } else {
      try {
        const response = await axios.post(
          "http://127.0.0.1:8000/stories/story_like/",
          { id: props.id },
          { headers: { Authorization: `Bearer ${token}` } }
        );

        console.log("response", response);
      } catch (err) {
        console.log("Error >>", err);
      }

      //색상 채우기
      setLike(!like);
    }
  };

  return (
    <div>
      <Card
        sx={{
          minHeight: "300px",
          minWidth: "600px",
          maxHeight: "300px",
          maxWidth: "600px",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Link to={`/story/${props.id}`} style={{ textDecoration: "none" }}>
          <CardMedia
            component="img"
            sx={{
              16: 9,
              minHeight: "300px",
              minWidth: "300px",
              maxHeight: "300px",
              maxWidth: "300px",
              display: "flex",
            }}
            image={props.rep_pic}
            alt="placeImage"
          />
        </Link>
        <CardContent
          sx={{
            // flexGrow: 1,
            minHeight: "300px",
            minWidth: "300px",
            maxHeight: "300px",
            maxWidth: "300px",
            display: "flex",
            flexFlow: "column",
            position: "relative",
          }}
        >
          {/* 제목, 식당이름, 장소 카테고리, 장소 옵션들, 미리보기(preivew) */}
          <Link to={`/story/${props.id}`} style={{ textDecoration: "none" }}>
            <TitleBox>
              <Typography
                component={"span"}
                gutterBottom
                variant="h5"
                fontSize="21px"
                fontFamily={"kopub"}
                fontWeight="400"
              >
                {props.title}
              </Typography>
            </TitleBox>
          </Link>
          <StoreNameBox>
            <Typography
              component={"span"}
              gutterBottom
              variant="h5"
              fontSize="21px"
              fontFamily={"kopub"}
              fontWeight="600"
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

          <CategoryBox>
            <Typography
              component={"span"}
              fontSize="14px"
              fontFamily={"kopub"}
              fontWeight="600"
            >
              {props.category}
            </Typography>
          </CategoryBox>

          <OptionBox>
            <Typography
              component={"span"}
              fontSize="14px"
              fontFamily={"kopub"}
              fontWeight="600"
            >
              {props.semi_category}
            </Typography>
          </OptionBox>

          <ContentBox>
            <Typography
              component={"span"}
              fontSize="14px"
              fontFamily={"kopub"}
              fontWeight="600"
            >
              {props.preview}
            </Typography>
          </ContentBox>
        </CardContent>
      </Card>
    </div>
  );
}
