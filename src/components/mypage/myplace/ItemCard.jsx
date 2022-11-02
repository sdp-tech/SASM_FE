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

const StoreNameBox = styled.div`
  box-sizing: border-box;
  display: flex;
  width: 100%;
  color: #000000;
  flex-direction: row;
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

export default function ItemCard(props) {
  const [like, setLike] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies(["name"]);
  const [loading, setLoading] = useState(true);

  // 좋아요 클릭 이벤트
  const toggleLike = async (id) => {
    // const token = cookies.name; // 쿠키에서 id 를 꺼내기
    const token = localStorage.getItem("accessTK"); //localStorage에서 accesstoken꺼내기

    try {
      const response = await axios.post(
        process.env.SASM_API_URL + "/places/place_like/",
        { id: id },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      console.log("response", response);
    } catch (err) {
      const refreshtoken = cookies.name; // 쿠키에서 id 를 꺼내기
      // 토큰이 만료된 경우
      if (
        err.response.data.message == "Given token not valid for any token type"
      ) {
        //만료된 토큰 : "Given token not valid for any token type"
        //없는 토큰 : "자격 인증데이터(authentication credentials)가 제공되지 않았습니다."

        localStorage.removeItem("accessTK"); //기존 access token 삭제
        //refresh 토큰을 통해 access 토큰 재발급
        const response = await axios.post(
          process.env.SASM_API_URL + "/users/token/refresh/",
          {
            refresh: refreshtoken,
          },
          {
            headers: {
              Authorization: "No Auth",
            },
          }
        );

        console.log("!!", response);

        localStorage.setItem("accessTK", response.data.access); //새로운 access token 따로 저장
      } else {
        console.log("Error >>", err);
      }
    }

    //색상 채우기
    setLike(!like);
  };

  return (
    <div>
      <Card
        sx={{
          minHeight: "250px",
          minWidth: "350px",
          maxHeight: "250px",
          maxWidth: "350px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <CardMedia
          component="img"
          sx={{
            // 16: 9,
            minHeight: "200px",
            minWidth: "350px",
            maxHeight: "200px",
            maxWidth: "350px",
            display: "flex",
          }}
          image={props.rep_pic}
          alt="placeImage"
        />

        <CardContent
          sx={{
            minHeight: "100px",
            minWidth: "310px",
            maxHeight: "100px",
            maxWidth: "310px",
            display: "flex",
            flexFlow: "column",
            position: "relative",
          }}
        >
          <StoreNameBox>
            <Typography
              component={"span"}
              gutterBottom
              variant="h5"
              fontSize="21px"
              fontFamily={"kopub"}
              fontWeight="500"
            >
              {props.place_name}
            </Typography>
            <LikeButton>
              <HeartButton like={!like} onClick={() => toggleLike(props.id)} />
            </LikeButton>
          </StoreNameBox>
        </CardContent>
      </Card>
    </div>
  );
}
