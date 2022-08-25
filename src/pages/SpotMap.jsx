import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import styled from "styled-components";

import Navibar from "../components/common/Navibar";
import SpotList from "../components/SpotMap/SpotList";
import Map from "../components/SpotMap/Map";
import SpotDetail from "../components/SpotMap/SpotDetail";
import { LoginContext } from "../contexts/LoginContexts";

export default function SpotMap() {
  const [login, setLogin] = useContext(LoginContext);
  console.log("login!!", login);
  // useEffect(() => {
  //   setLogin();
  // }, []);

  const [state, setState] = useState({
    loading: false,
    ItemList: [],
  });

  const loadItem = async () => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/places/place_list"
      );

      setState({
        loading: true,
        ItemList: response.data.results,
      });
    } catch (err) {
      console.log("Error >>", err);
    }
    // await axios
    //   // .get("./SearchJson.json")
    //   .get("http://127.0.0.1:8000/places/place_list")
    //   .then(({ data }) => {
    //     console.log("data", data.results);
    //     setState({
    //       loading: true,
    //       ItemList: data.results,
    //     });
    //   })
    //   .catch((e) => {
    //     console.error(e);
    //     setState({
    //       loading: false,
    //     });
    //   });
  };

  useEffect(() => {
    loadItem();
  }, []);

  return (
    <Sections>
      <Navibar />
      <SpotList Itemcard={state.ItemList} />
      <Map />

      {/* <SpotList Itemcard={state.ItemList} /> */}
      {/* <SpotDetail /> */}
    </Sections>
  );
}

const Sections = styled.div`
  box-sizing: border-box;
  display: grid;
  position: relative;
  height: 100vh;
  grid-template-rows: 0.15fr 0.85fr;
  grid-template-columns: 0.28fr 0.72fr;
  grid-template-areas:
    "navibar navibar"
    "spotlist map";
  // gap: 1% 0.5%;
`;
