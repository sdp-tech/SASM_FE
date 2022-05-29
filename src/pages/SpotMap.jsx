import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";

import Navibar from "../components/common/Navibar";
import SpotList from "../components/SpotMap/SpotList";
import Map from "../components/SpotMap/Map";
import SpotDetail from "../components/SpotMap/SpotDetail";

export default function SpotMap() {
  const [state, setState] = useState({
    loading: false,
    ItemList: []
  });

  const loadItem = async () => {
    await axios 
      .get("./SearchJson.json")
      .then(({ data }) => {
        setState({
          loading: true,
          ItemList: data.Item
        });
      })
      .catch((e) => {
        console.error(e);
        setState({
          loading: false
        });
      });
  };

  useEffect(()=>{
    loadItem();
  }, []);

  return (
    <Sections>
      <Navibar/>
      <SpotList Itemcard={state.ItemList}/>
      <Map/>

      {/* <SpotList Itemcard={state.ItemList} /> */}
      {/* <SpotDetail /> */}
    </Sections>
  );
};

const Sections = styled.div`
  box-sizing: border-box;
  display: grid;
  position: relative;
  height: 100vh;
  grid-template-rows: 0.15fr 0.85fr;
  grid-template-columns: 0.28fr 0.72fr;
  grid-template-areas: 
    "navibar navibar"
    "spotlist map"
  ;
  // gap: 1% 0.5%;
`;