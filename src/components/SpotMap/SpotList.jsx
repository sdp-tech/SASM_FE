import * as React from "react";
import { List } from "@mui/material";
import styled from "styled-components";

import ItemCard from "./SpotList/ItemCard.js";
import SearchBar from "./SpotList/SearchBar.js";

const SpotListSection = styled.div`
// background-color: blue;

  margin: 15px 0px 15px 15px;
  position: relative;
  grid-area: spotlist;
`

const SearchFilterBar = styled.div`
// background-color: red;
 
  position: absolute;
  width: 100%;
  height: 10%;
  border: 4px solid black;

  border: 1px solid #99A0B0;
  box-sizing: border-box;
`

const SpotsWrapper = styled.div`
  // background-color: yellow;

  position: absolute;
  width: 100%;
  height: 90%;
  top: 10%;
  overflow: auto;
  border-left: 1px solid #99A0B0;
  border-right: 1px solid #99A0B0;
  border-bottom: 1px solid #99A0B0;
  box-sizing: border-box;

  &::-webkit-scrollbar {
    width: 12px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #C4C4C4;
    border-radius: 10px;
    background-clip: padding-box;
    border: 2px solid transparent;
  }
`

export default function SpotList(props) {
  const Item = props.Itemcard;

  return (
    <SpotListSection>
      <SearchFilterBar>
        <SearchBar /> 
      </SearchFilterBar>
      <SpotsWrapper>
        {Item &&
          Item.map((itemdata, index) => (
            <ItemCard
              key={index}
              ImageURL={itemdata.ImageURL}
              StoreName={itemdata.StoreName}
              StoreType={itemdata.StoreType}
              OpeningHours={itemdata.OpeningHours}
              Address={itemdata.Address}
              />
          ))}
      </SpotsWrapper>

    </SpotListSection>
  );
}


