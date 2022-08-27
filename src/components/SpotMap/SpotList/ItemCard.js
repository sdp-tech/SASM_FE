import React, { useState } from "react";
import styled from "styled-components";

import archiveIcon from "../../../assets/img/Like.png";
import SpotDetail from "../SpotDetail";
import HeartButton from "../../common/Heart";
import LikeImg from "../../../assets/img/LikeImg.png";
// import { getCookie } from "../../common/Cookie";
import { useCookies } from "react-cookie";
import axios from "axios";
const StyledCard = styled.div`
  position: relative;
  padding: 1em;
  border-bottom: 1px solid #99a0b0;
  border-right: 1px solid #99a0b0;
  &:last-child {
    border-bottom: none;
  }
  display: flex;
  flex-direction: row;
  max-height: 200px;
  overflow: hidden;
`;

const ImgBox = styled.div`
  width: 200px;
  height: 200px;
`;
const TextBox = styled.div`
  font-size: 1em;
  color: black;
  min-width: 280px;
  // border: 1px solid red;
  margin: 0.7em;
`;
const TitleBox = styled.div`
  font-size: 1.3em;
  font-weight: 700;
  color: black;
  padding: 0 0 2px 5px;
  border-bottom: 1px solid #000000;
  display: flex;
  flexdirection: column;
  width: 100%;
  justify-content: space-between;
`;
const ContentBox = styled.div`
  font-size: 1em;
  font-weight: 500;
  color: black;
  padding: 0 0 2px 5px;
`;
const FirstBox = styled.div`
  font-size: 1em;
  font-weight: 500;
  color: black;
  // border: 1px solid red;
  // max-height: 60px;
`;
const SecondBox = styled.div`
  font-size: 1em;
  font-weight: 500;
  color: black;
  // border: 1px solid yellow;
`;
const Content = styled.p`
  font-size: 0.9em;
  font-weight: 500;
  color: black;
  // margin: -4px;
  // border: 1px solid green;
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
  const [state, setState] = useState({
    isToggleOn: true,
  });
  const [content, setContent] = useState();
  const [like, setLike] = useState(false);
  const [on, setOn] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies(["name"]);

  const toggleLike = async () => {
    // alert(`${props.id}`);
    const token = cookies.name; // 쿠키에서 id 를 꺼내기
    // alert(token);

    // alert(`Bearer ${getCookie("myToken")}`);
    // 백에 전달
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/places/place_like/",
        { id: props.id },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      console.log("response", response);

      setState({
        loading: true,
        ItemList: response.data.results,
      });
    } catch (err) {
      console.log("Error >>", err);
    }

    //색상 채우기
    setLike(!like);
  };

  const handleClick = () => {
    alert(`${props.id}`);
    setContent(props.id);
    const id = props.id;
    setOn(true);
    axios
      .get(`http://127.0.0.1:8000/places/place_detail/${id}/`, {
        params: {
          id: id,
        },
      })
      .then(function (response) {
        console.log("response", response.data);
      })
      .catch(function (error) {
        console.log(error);
      })
      .then(function () {
        // always executed (try catch finally에서 finally부분)
      });

    // detail카드 띄우기 + 이를 위한 axios요청 필요

    const prevState = state;
    setState({
      isToggleOn: !prevState.isToggleOn,
    });
  };

  const myfunction = () => {
    console.log("CLICKED");
  };

  return (
    <div>
      <StyledCard key={Date.now()}>
        {/* {state.isToggleOn ? "ON" : "OFF"} */}
        {/* <button
        style={{
          position: "absolute",
          top: "0px",
          left: "120px",
          padding: "0px",
          margin: "0px",
          width: "100%",
          height: "100%",
          overflow: "hidden",
          maxWidth: 50,
          maxHeight: 40,
          bgcolor: "#F0F8FF"
        }}
      >
        <img
          src={archiveIcon}
          width="50"
          height="30"
          alt=""
          onClick={myfunction}
        />
      </button> */}
        <ImgBox>
          <img
            src={props.ImageURL}
            className="image--itemcard"
            alt="placeImage"
            width="180px"
            height="200px"
          />
        </ImgBox>
        <TextBox>
          <TitleBox>
            <div onClick={handleClick}>{props.StoreName}</div>
            <LikeButton>
              <HeartButton like={like} onClick={toggleLike} />
            </LikeButton>

            {/* <img like={like} onClick={likeClick} src={LikeImg} /> */}
          </TitleBox>

          <ContentBox>
            <FirstBox>
              <p
                style={{
                  fontSize: "0.9em",
                  fontWeight: "500",
                  color: "black",
                }}
              >
                {props.StoreType}
              </p>
              <p
                style={{
                  fontSize: "0.9em",
                  fontWeight: "500",
                  color: "black",
                  marginTop: "-1em",
                }}
              >
                {props.place_review}
              </p>
            </FirstBox>
            <SecondBox>
              <p
                style={{
                  fontSize: "0.9em",
                  fontWeight: "500",
                  color: "black",
                  marginTop: "-0.2em",
                }}
              >
                주소 : {props.Address}
              </p>
              <p
                style={{
                  fontSize: "0.9em",
                  fontWeight: "500",
                  color: "black",
                  marginTop: "-1em",
                }}
              >
                오늘 영업시간 : {props.open_hours}
              </p>
            </SecondBox>
            {/* <Content>영업시간 : {props.OpeningHours}</Content> */}
            {/* <Content>화 : {props.tues_hours}</Content>
        <Content>수 : {props.wed_hours}</Content> */}
          </ContentBox>
        </TextBox>
      </StyledCard>
      {content && (
        <SpotDetail>
          {props.id}
          {on}
          {/* content={props.id}
          toggle={on} */}
          {/* {{ content: props.id }} {{ toggle: on }} */}/
          {/* content={props.id} toggle={on} */}
        </SpotDetail>
      )}
    </div>
  );
}
