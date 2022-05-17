import React, { useEffect, useState } from "react";
import axios from "axios";

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
    <>      
      <Map/>
      <Navibar />
      <SpotDetail />
      <SpotList Itemcard={state.ItemList} />
    </>
  );
};
