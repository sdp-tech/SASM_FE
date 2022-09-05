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

const PlacenameBox = styled.div`
  box-sizing: border-box;
  display: flex;
  width: 100%;
  color: #ffffff;
  font-weight: 700;
  font-size: 1.5em;
  justify-content: flex-end;
  align-items: center;
`;
const TitleNButtonBox = styled.div`
  box-sizing: border-box;
  display: flex;
  width: 100%;
  color: #ffffff;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
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
  alignItems: "center",
});

export default function ItemCard(props) {
  const [like, setLike] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies(["name"]);
  const [loading, setLoading] = useState(true);

  // 좋아요 클릭 이벤트
  const toggleLike = async (id) => {
    const token = cookies.name; // 쿠키에서 id 를 꺼내기

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/stories/story_like/",
        { id: id },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      console.log("response", response);
    } catch (err) {
      console.log("Error >>", err);
    }

    //색상 채우기
    setLike(!like);
  };

  return (
    <div>
      <Card
        sx={{
          minHeight: "300px",
          minWidth: "480px",
          maxHeight: "300px",
          maxWidth: "480px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <CardMedia
          component="img"
          sx={{
            // 16: 9,
            minHeight: "300px",
            minWidth: "480px",
            maxHeight: "300px",
            maxWidth: "480px",
            display: "flex",
          }}
          image={props.rep_pic}
          alt="placeImage"
        />

        <CardContent
          sx={{
            minHeight: "100px",
            minWidth: "450px",
            // maxHeight: "100px",
            maxWidth: "450px",
            display: "flex",
            flexFlow: "column",
            position: "absolute",
            zIndex: "5",
            marginTop: "200px",
            alignItems: "center",
          }}
        >
          <PlacenameBox>{props.place_name}</PlacenameBox>
          <TitleNButtonBox>
            <LikeButton>
              <HeartButton like={!like} onClick={() => toggleLike(props.id)} />
            </LikeButton>
            <Typography
              component={"span"}
              gutterBottom
              variant="h5"
              fontSize="1.1em"
              fontFamily={"kopub"}
              fontWeight="600"
            >
              {props.title}
            </Typography>
          </TitleNButtonBox>
        </CardContent>
      </Card>
    </div>
  );
}
