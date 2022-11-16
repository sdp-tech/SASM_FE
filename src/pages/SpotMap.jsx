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
import { useNavigate } from "react-router";
import Request from "../functions/common/Request";

export default function SpotMap() {
  const [login, setLogin] = useContext(LoginContext);
  // console.log("login!!", login);
  const [loading, setLoading] = useState(true);
  const [cookies, setCookie, removeCookie] = useCookies(["name"]);
  const navigate = useNavigate();
  // const token = cookies.name; // 쿠키에서 id 를 꺼내기
  const token = localStorage.getItem("accessTK"); //localStorage에서 accesstoken꺼내기
  const request = new Request(cookies, localStorage, navigate);

  const [state, setState] = useState({
    loading: false,
    ItemList: [],
    MapList: [],
  });

  const [location, setLocation] = useState([]);
  // 에러 메세지 저장
  const [error, setError] = useState();
  // Geolocation의 `getCurrentPosition` 메소드에 대한 성공 callback 핸들러
  const handleSuccess = (pos) => {
    const { latitude, longitude } = pos.coords;
    // 현재위치 저장
    setLocation({ latitude, longitude });
    // map 데이터 불러오기
    getItem();
  };

  // Geolocation의 `getCurrentPosition` 메소드에 대한 실패 callback 핸들러
  const handleError = (error) => {
    setError(error.message);
  };

  useEffect(() => {
    const { geolocation } = navigator;

    // 사용된 브라우저에서 지리적 위치(Geolocation)가 정의되지 않은 경우 오류로 처리합니다.
    if (!geolocation) {
      setError("Geolocation is not supported.");
      return;
    }

    // Geolocation API 호출
    geolocation.getCurrentPosition(handleSuccess, handleError);
  }, []);

  //초기 map 데이터 가져오기
  const getItem = async (location) => {
    setLoading(true);
    const response = await request.get("/places/place_search/", {
      left: "30", //현재 위치
      right: "30", //현재 위치
      page: "1",
    }, null);
    console.log("data?", response.data.data.results);
    setState({
      loading: true,
      MapList: response.data.data.results,
    });
    setLoading(false);

  };
  return (
    <Sections>
      <Navibar />

      {loading ? (
        <Loading />
      ) : (
        <>
          <SpotList Location={location} />
          <Map mapList={state.MapList} Location={location} />
        </>
      )}
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
