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
  margin-top: 20px;
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
function DetailCard({
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
}) {
  const [like, setLike] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies(["name"]);
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  // const token = cookies.name; // 쿠키에서 id 를 꺼내기
  const token = localStorage.getItem("accessTK"); //localStorage에서 accesstoken꺼내기

  // 좋아요 클릭 이벤트
  const toggleLike = async () => {
    // alert(`${props.id}`);
    if (!token) {
      alert("로그인이 필요합니다.");
    } else {
      try {
        const response = await axios.post(
          process.env.SASM_API_URL + "/places/place_like/",
          { id: id },
          { headers: { Authorization: `Bearer ${token}` } }
        );

        console.log("response", response);

        // setState({
        //   loading: true,
        //   ItemList: response.detailInfo.results,
        // });
      } catch (err) {
        const refreshtoken = cookies.name; // 쿠키에서 id 를 꺼내기
        // 토큰이 만료된 경우
        if (
          err.response.data.message ==
          "Given token not valid for any token type"
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
    }
  };

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
          <img
            style={{ height: "150px", width: "30%" }}
            src={Photo0}
            className="image--itemcard"
            alt="image1"
            width="600px"
            height="400px"
          />
          <img
            style={{ height: "150px", width: "30%" }}
            src={Photo1}
            className="image--itemcard"
            alt="image2"
            width="600px"
            height="400px"
          />
          <img
            style={{ height: "150px", width: "30%" }}
            src={Photo2}
            className="image--itemcard"
            alt="image3"
            width="600px"
            height="400px"
          />
        </PhotoBox>
        {/* images */}
        <ShortCurBox>
          {/* ShortCur */}
          <p>{ShortCur}</p>
        </ShortCurBox>
      </TextBox>
    </StyledCard>
  );
}

export default DetailCard;
