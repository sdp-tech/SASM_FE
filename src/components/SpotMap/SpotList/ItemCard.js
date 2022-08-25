import React, { useState } from "react";
import styled from "styled-components";

import archiveIcon from "../../../assets/img/Like.png";

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

export default function ItemCard(props) {
  const [state, setState] = useState({
    isToggleOn: true,
  });

  const handleClick = () => {
    const prevState = state;
    setState({
      isToggleOn: !prevState.isToggleOn,
    });
  };

  const myfunction = () => {
    console.log("CLICKED");
  };

  return (
    <StyledCard onClick={handleClick} key={Date.now()}>
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
        <TitleBox>{props.StoreName}</TitleBox>
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
              영업시간 : 월 {props.mon_hours}
            </p>
          </SecondBox>
          {/* <Content>영업시간 : {props.OpeningHours}</Content> */}
          {/* <Content>화 : {props.tues_hours}</Content>
        <Content>수 : {props.wed_hours}</Content> */}
        </ContentBox>
      </TextBox>
    </StyledCard>
  );
}
