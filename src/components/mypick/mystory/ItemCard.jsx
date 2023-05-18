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
import { useMediaQuery } from "react-responsive";

const PlacenameBox = styled.div`
  box-sizing: border-box;
  display: flex;
  width: 100%;
  font-weight: 550;
  font-size: 1.2rem;
  align-items: center;
  color:#000000;
  margin-top: -2%;
  margin-bottom: 5%;
  justify-content: space-between;
`;

const Placename = styled(Link)`
  width: 100%;
  color: inherit;
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
  const isMobile = useMediaQuery({query: "(max-width:768px)"});
  const width = isMobile?"80vw":"32vw";
  const height = isMobile?"45vw":"18vw";
  const [like, setLike] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies(["name"]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const request = new Request(cookies, localStorage, navigate);
  // 좋아요 클릭 이벤트
  const toggleLike = async () => {
    const response = await request.post("/stories/story_like/", { id: props.story_id }, null);
    console.log("response", response);

    //색상 채우기
    setLike(!like);
  };

  return (
    <div>
      <Card
        sx={{
          minWidth: width,
          maxWidth: width,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <CardMedia
          component="img"
          sx={{
            // 16: 9,
            minHeight: height,
            minWidth: width,
            maxHeight: height,
            maxWidth: width,
            display: "flex",
          }}
          image={props.rep_pic}
          alt="placeImage"
        />

        <CardContent
          sx={{
            minWidth: width,
            maxWidth: width,
            display: "flex",
            flexFlow: "column",
          }}
        >
          <PlacenameBox>
            <Placename to={`/story/${props.story_id}`} style={{ textDecoration: 'none' }}>
              {props.place_name}
            </Placename>
          <div style={{display:'flex', marginRight:'10px'}}>
          <img src={require(`../../../assets/img/Category/Category${MatchCategory(props.category)}.svg`)} />
            <LikeButton>
              <HeartButton like={!like} onClick={() => toggleLike(props.id)} />
            </LikeButton>
          </div>
        </PlacenameBox>
          <div style={{borderBottom:"2px #44ADF7 solid" ,paddingBottom:'10px'}}>
            {props.title}
          </div>
          <div style={{paddingTop:'10px', fontSize:"0.8rem"}}>
            {props.preview}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

