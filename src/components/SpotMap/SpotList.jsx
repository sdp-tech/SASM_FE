import React from "react";
import styled from "styled-components";

import ItemCard from "./SpotList/ItemCard.js";
import nothingIcon from "../../assets/img/nothing.svg";

const SpotListSection = styled.div`
  position: relative;
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
  box-sizing: border-box;
  align-items: center;
  font-size:0.75em;
  color: #44ADF7;
  margin: 0 0 0 2.5%;
  &::after {
    content:" ";
    width:64%;
    margin : 0 0 0 1%;
    border: 1px #44ADF7 solid;
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

export default function SpotList(props){
  const setTemp = (data) => {
    props.setTemp(data);
  }
  const item = props.mapList;
  let modalOpen = false;
  if(item.length==1) modalOpen=true;
  return (
        <SpotListSection>
          {/* 데이터 없을때 장소가 없습니다 띄우기 */}
          <RecommendTitle><b>이런 장소</b>는 어떠세요?</RecommendTitle>
          <SpotsWrapper id="wrapper">
            {item.length === 0 ? (
              <NothingSearched>
                <img src={nothingIcon} style={{ marginBottom: "10px" }} />
                해당하는 장소가 없습니다
              </NothingSearched>
            ) : (
              item.map((itemdata, index) => {
                return (
                  <ItemCard
                    setTemp={setTemp}
                    index={index}
                    key={index}
                    id={itemdata.id}
                    ImageURL={itemdata.rep_pic}
                    StoreName={itemdata.place_name}
                    StoreType={itemdata.category}
                    open_hours={itemdata.open_hours}
                    Address={itemdata.address}
                    place_review={itemdata.place_review}
                    place_like={itemdata.place_like}
                    modalOpen={modalOpen}
                  />
                );
              })
            )}
          </SpotsWrapper>
        </SpotListSection>
  );
};
