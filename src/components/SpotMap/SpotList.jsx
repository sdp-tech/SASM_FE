import { useState, useEffect, useCallback } from "react";
import styled from "styled-components";

import ItemCard from "./SpotList/ItemCard.js";
import SearchBar from "../common/SearchBar.js";
import nothingIcon from "../../assets/img/nothing.svg";
import Pagination from "../common/Pagination";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Loading from "../common/Loading";
import checkSasmAdmin from "../Admin/Common";
import AdminButton from "../Admin/components/AdminButton";
import Request from "../../functions/common/Request";

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
  min-height: 30%;
  border-left: 1px solid #99a0b0;
  border-right: 1px solid #99a0b0;
  border-bottom: 1px solid #99a0b0;
  box-sizing: border-box;
  display: flex;
`;
const CategoryTitle = styled.div`
  width: 30%;
  min-height: 30%;
  margin: 4.3% 3% 0 3%;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
`;
const CategoryCheckBox = styled.div`
  width: 100%;
  min-height: 30%;
  // margin: 7% 3% 0 3%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const CategoryLabel = styled.div`
  width: 100%;
  min-width: 100%;
  min-height: 5%;
  height: 14%;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 2%;
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

const SpotList = (props) => {
  const item = props.mapList;
  return (
    <>
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
    </>
  );
};
export default SpotList;
