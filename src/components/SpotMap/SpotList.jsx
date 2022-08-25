import React, { useState } from "react";
import styled from "styled-components";

import ItemCard from "./SpotList/ItemCard.js";
import SearchBar from "./SpotList/SearchBar.js";
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
const SearchFilterBar = styled.div`
  // background-color: red;
  width: 100%;
  min-height: 5%;
  border: 1px solid #99a0b0;
  box-sizing: border-box;
`;
const FilterOptions = styled.div`
  width: 100%;
  min-height: 25%;
  border-left: 1px solid #99a0b0;
  border-right: 1px solid #99a0b0;
  border-bottom: 1px solid #99a0b0;
  box-sizing: border-box;
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

const SpotList = (props) => {
  const Item = props.Itemcard;
  console.log("Item", Item);
  const [searchedItems, setSearchedItems] = useState([...Item]);

  const [filterToggle, setFilterToggle] = useState(false);
  const [searchToggle, setSearchToggle] = useState(false);

  const handleFilterToggle = () => {
    setFilterToggle(!filterToggle);
  };
  const handleSearchToggle = () => {
    setSearchToggle(true);
  };

  return (
    <SpotListSection>
      <SearchFilterBar>
        <SearchBar
          handleFilterToggle={handleFilterToggle}
          handleSearchToggle={handleSearchToggle}
        />
      </SearchFilterBar>

      {filterToggle ? <FilterOptions></FilterOptions> : null}

      {searchToggle ? (
        <SpotsWrapper>
          {searchedItems.length === 0 ? (
            <NothingSearched>
              <img src={nothingIcon} style={{ marginBottom: "10px" }} />
              해당하는 장소가 없습니다!
            </NothingSearched>
          ) : (
            searchedItems.map((itemdata, index) => (
              // 필요 정보 : 이미지,?, 카테고리, ?, 위치, 영업시간
              <ItemCard
                key={index}
                ImageURL={itemdata.rep_pic}
                StoreName={itemdata.StoreName}
                StoreType={itemdata.StoreType}
                OpeningHours={itemdata.OpeningHours}
                Address={itemdata.Address}
              />
            ))
          )}
        </SpotsWrapper>
      ) : (
        <></>
      )}

      <RecommendTitle>이런 장소는 어떠세요?</RecommendTitle>
      <SpotsWrapper>
        {Item &&
          Item.map((itemdata, index) => {
            // 필요 정보 : 이미지,?, 카테고리, ?, 위치, 영업시간
            console.log("gg", itemdata);

            return (
              <ItemCard
                key={index}
                ImageURL={itemdata.rep_pic}
                StoreName={itemdata.place_name}
                StoreType={itemdata.category}
                // OpeningHours={itemdata.OpeningHours}
                mon_hours={itemdata.mon_hours}
                tues_hours={itemdata.tues_hours}
                wed_hours={itemdata.tues_hours}
                // OpeningHours={itemdata.mon_hours + itemdata.tues_hours}
                Address={itemdata.address}
              />
            );
          })}
      </SpotsWrapper>
    </SpotListSection>
  );
};
export default SpotList;
