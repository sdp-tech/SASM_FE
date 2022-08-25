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
`;

const Content = styled.p`
  font-size: 1em;
  color: black;
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
      <img
        src={props.ImageURL}
        className="image--itemcard"
        alt=""
        width="300"
        height="250"
      />
      <Content>{props.StoreName}</Content>
      <Content>{props.StoreType}</Content>
      {/* <Content>영업시간 : {props.OpeningHours}</Content> */}
      <Content>영업시간 :</Content>
      <Content>월 : {props.mon_hours}</Content>
      <Content>화 : {props.tues_hours}</Content>
      <Content>수 : {props.wed_hours}</Content>
      <Content>주소 : {props.Address}</Content>
    </StyledCard>
  );
}
