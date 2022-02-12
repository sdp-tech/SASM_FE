import React from "react";
import styled from "styled-components";

const StyledCard = styled.section`
  padding: 1em;
`;

const Content = styled.p`
  font-size: 1em;
  color: black;
`;

function DetailCard({
  key,
  ImageURL,
  StoreName,
  StoreType,
  OpeningHours,
  Address
}) {
  return (
    <StyledCard className="component component--item_card" key={key}>
      <img
        src={ImageURL}
        className="image--itemcard"
        alt=""
        width="300"
        height="250"
      />
      <Content>{StoreName}</Content>
      <Content>칙피스</Content>
      <Content>{StoreType}</Content>
      <Content>비건식당</Content>
      <Content>한줄평</Content>
      <Content>영업시간 : {OpeningHours}</Content>
      <Content>주소 : {Address}</Content>
      <Content>신사역 8번 출구에서 465m</Content>
    </StyledCard>
  );
}

export default DetailCard;
