import * as React from "react";
import { List } from "@mui/material";
import styled from "styled-components";

import ItemCard from "./SpotList/ItemCard.js";
import SearchBar from "./SpotList/SearchBar.js";

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

const SpotListSection = styled.div`
  // box-sizing: border-box;
  // padding: 10px;
  position: relative;
  // background-color: blue;
  grid-area: spotlist;
  // overflow: hidden;
`

const SearchFilterBar = styled.div`
  position: absolute;
  // background-color: red;
  width: 100%;
  height: 10%;
  border: 4px solid black;
  box-sizing: border-box;
`

const SpotsWrapper = styled.div`
  position: absolute;
  // background-color: yellow;
  width: 100%;
  height: 90%;
  top: 10%;
  overflow: auto;
  box-sizing: border-box;
`
