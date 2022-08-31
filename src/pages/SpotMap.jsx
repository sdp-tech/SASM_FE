import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import styled from "styled-components";

import Navibar from "../components/common/Navibar";
import SpotList from "../components/SpotMap/SpotList";
import Map from "../components/SpotMap/Map";
import SpotDetail from "../components/SpotMap/SpotDetail";
import { LoginContext } from "../contexts/LoginContexts";
import Loading from "../components/common/Loading";
import { useCookies } from "react-cookie";

export default function SpotMap() {
  const [login, setLogin] = useContext(LoginContext);
  // console.log("login!!", login);
  const [loading, setLoading] = useState(true);
  const [cookies, setCookie, removeCookie] = useCookies(["name"]);
  const token = cookies.name; // 쿠키에서 id 를 꺼내기

  // useEffect(() => {
  //   setLogin();
  // }, []);

  const [state, setState] = useState({
    loading: false,
    ItemList: [],
  });

  const loadItem = async () => {
    let headerValue;
    if (token === undefined) {
      headerValue = `No Auth`;
    } else {
      headerValue = `Bearer ${token}`;
    }

    setLoading(true);
    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/places/place_list",
        {
          headers: {
            Authorization: headerValue,
          },
        }
      );
      // console.log("data", response.data.results);

      setState({
        loading: true,
        ItemList: response.data.results,
      });
      setLoading(false);
    } catch (err) {
      console.log("Error >>", err);
    }
  };

  useEffect(() => {
    loadItem();
  }, []);

  return (
    <Sections>
      <Navibar />
      {loading ? <Loading /> : <SpotList Itemcard={state.ItemList} />}
      <Map mapList={state.ItemList} />
      {/* <SpotDetail /> */}

      {/* <SpotList Itemcard={state.ItemList} /> */}
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
