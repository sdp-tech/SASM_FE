import React, { useState } from "react";
import styled from "styled-components";

import archiveIcon from "../../../assets/SpotMap/archiveIcon.png";

function ItemCard(props) {
  const [state, setState] = useState({
    isToggleOn: true
  });

  const handleClick = () => {
    const prevState = state;
    setState({
      isToggleOn: !prevState.isToggleOn
    });
  };

  const myfunction = () => {
    console.log("CLICKED");
  };

  return (
    <StyledCard onClick={handleClick} key={Date.now()}>
      {state.isToggleOn ? "ON" : "OFF"}
      <button
        style={{
          position: "relative",
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
      </button>
      <img
        src={props.ImageURL}
        className="image--itemcard"
        alt=""
        width="300"
        height="250"
      />
      <Content>{props.StoreName}</Content>
      <Content>{props.StoreType}</Content>
      <Content>영업시간 : {props.OpeningHours}</Content>
      <Content>주소 : {props.Address}</Content>
    </StyledCard>
  );
}

const StyledCard = styled.div`
  border: 1.5px solid black;
  padding: 1em;

  :hover {
    background: #ebf5fb;
  }
`;

const Content = styled.p`
  font-size: 1em;
  color: black;
`;

export default ItemCard;
