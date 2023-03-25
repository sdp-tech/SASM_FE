import React from "react";
import styled from "styled-components";
import ItemCard from "./SpotList/ItemCard";
import nothingIcon from "../../assets/img/nothing.svg";

const SpotListSection = styled.div`
  position: relative;
  grid-area: spotlist;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  padding: 0 1.5%;
  z-index: 101;
`;
const NothingSearched = styled.div`
  // background-color: yellow;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  top: 50%;
  left: 50%;
  transform: translate3d(-50%, -50%, 0);
`;
const RecommendTitle = styled.div`
  padding: 1%;
  display: flex;
  box-sizing: border-box;
  align-items: center;
  font-size:1rem;
  color: #44ADF7;
  &::after {
    content:"";
    height:1px;
    margin : 0 0 0 1%;
    background-color: #44ADF7;
    width: 55%;
  }
`;
const SpotsWrapper = styled.div`
  // background-color: yellow;
  width: 100%;
  min-height: 30%;
  // height: 90%;
  overflow: auto;
  box-sizing: border-box;
  &::-webkit-scrollbar {
    width: 12px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #c4c4c4;
    border-radius: 10px;
    background-clip: padding-box;
    border: 2px solid transparent;
  }
`;

export default function SpotList({ setTemp, placeData, categoryNum }) {
  return (
    <SpotListSection>
      {/* 데이터 없을때 장소가 없습니다 띄우기 */}
      <RecommendTitle><b>이런 장소</b>는 어떠세요?</RecommendTitle>
      <SpotsWrapper id="wrapper">
        {
          placeData.length === 0 ?
            <NothingSearched>
              <img src={nothingIcon} style={{ marginBottom: "10px" }} />
              해당하는 장소가 없습니다
            </NothingSearched>
            :
            placeData.map((itemdata) => {
              return (
                <ItemCard categoryNum={categoryNum} setTemp={setTemp} key={`itemcard_${itemdata.id}`} placeData={itemdata} />
              );
            })
        }
      </SpotsWrapper>
    </SpotListSection>
  );
};
