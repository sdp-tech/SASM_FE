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
import { Link, useNavigate } from "react-router-dom";
import Request from "../../../functions/common/Request";
import { MatchCategory, CATEGORY_LIST } from "../../common/Category";

const PlacenameBox = styled.div`
  box-sizing: border-box;
  display: flex;
  width: 100%;
  font-weight: 550;
  font-size: 0.8rem;
  align-items: center;
  color:#000000;
  margin-top: -2%;
  margin-bottom: 5%;
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
  const navigate = useNavigate();
  const request = new Request(cookies, localStorage, navigate);
  // 좋아요 클릭 이벤트
  const toggleLike = async (id) => {
    const response = await request.post("/places/place_like/", { id: id }, null);
    console.log("response", response);

    //색상 채우기
    setLike(!like);
  };

  return (
    <div>
      <Card
        sx={{
          minWidth: "320px",
          maxWidth: "320px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <CardMedia
          component="img"
          sx={{
            // 16: 9,
            minHeight: "180px",
            minWidth: "320px",
            maxHeight: "180px",
            maxWidth: "320px",
            display: "flex",
          }}
          image={props.rep_pic}
          alt="placeImage"
        />

        <CardContent
          sx={{
            height:"50px",
            minWidth: "300px",
            maxWidth: "300px",
            display: "flex",
            flexFlow: "column",
          }}
        >
          <Link to={`/map/${props.place_name}`} style={{ textDecoration: 'none' }}>
            <PlacenameBox>
              {props.place_name}
              <div style={{display:'flex', }}>
              <img src={require(`../../../assets/img/Category/Category${MatchCategory(props.category)}.svg`)} />
                <LikeButton>
                  <HeartButton like={!like} onClick={() => toggleLike(props.id)} />
                </LikeButton>
              </div>
            </PlacenameBox>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}

