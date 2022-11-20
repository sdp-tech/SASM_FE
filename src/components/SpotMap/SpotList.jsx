import { useState, useEffect, useCallback } from "react";
import styled from "styled-components";

import ItemCard from "./SpotList/ItemCard.js";
import nothingIcon from "../../assets/img/nothing.svg";

const SpotListSection = styled.div`
  // background-color: blue;
  position: relative;
  margin: 15px 0px 15px 15px;
  grid-area: spotlist;
  display: flex;
  flex-direction: column;
  overflow: hidden;
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
  width: 100%;
  min-height: 4%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-left: 1px solid #99a0b0;
  border-right: 1px solid #99a0b0;
  border-bottom: 1px solid #99a0b0;
  box-sizing: border-box;
`;
const SpotsWrapper = styled.div`
  // background-color: yellow;
  width: 100%;
  min-height: 30%;
  // height: 90%;
  overflow: auto;
  border-left: 1px solid #99a0b0;
  border-right: 1px solid #99a0b0;
  border-bottom: 1px solid #99a0b0;
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

export default function SpotList(props){
  const item = props.mapList;

  return (
        <SpotListSection>
          {/* 데이터 없을때 장소가 없습니다 띄우기 */}
          <RecommendTitle>이런 장소는 어떠세요?</RecommendTitle>
          <SpotsWrapper>
            {item.length === 0 ? (
              <NothingSearched>
                <img src={nothingIcon} style={{ marginBottom: "10px" }} />
                해당하는 장소가 없습니다
              </NothingSearched>
            ) : (
              item.map((itemdata, index) => {
                return (
                  <ItemCard
                    key={index}
                    id={itemdata.id}
                    ImageURL={itemdata.rep_pic}
                    StoreName={itemdata.place_name}
                    StoreType={itemdata.category}
                    open_hours={itemdata.open_hours}
                    Address={itemdata.address}
                    place_review={itemdata.place_review}
                    place_like={itemdata.place_like}
                  />
                );
              })
            )}
          </SpotsWrapper>
        </SpotListSection>
  );
};
