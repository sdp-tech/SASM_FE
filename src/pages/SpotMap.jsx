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

  const [state, setState] = useState({
    loading: false,
    ItemList: [],
    MapList: [],
  });

  const [location, setLocation] = useState();
  // 에러 메세지 저장
  const [error, setError] = useState();
  console.log("ggg", location);

  // Geolocation의 `getCurrentPosition` 메소드에 대한 성공 callback 핸들러
  const handleSuccess = (pos) => {
    const { latitude, longitude } = pos.coords;

    setLocation({
      latitude,
      longitude,
    });
    // sendCurrentLocation(latitude, longitude);
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

  //서버에 현재 위치 전달
  // const sendCurrentLocation = async (latitude, longitude) => {
  //   let headerValue;
  //   if (token === undefined) {
  //     headerValue = `No Auth`;
  //   } else {
  //     headerValue = `Bearer ${token}`;
  //   }

  //   try {
  //     const response = await axios.post(
  //       "http://127.0.0.1:8000/places/place_list/",

  //       {
  //         //현재 위치 정보 전달
  //         left: latitude,
  //         right: longitude,
  //       },

  //       {
  //         headers: {
  //           Authorization: headerValue,
  //         },
  //       }
  //     );
  //     // console.log("data", response);
  //   } catch (err) {
  //     console.log("Error >>", err);
  //   }
  // };

  //초기 데이터 가져오기
  const getItem = async () => {
    let headerValue;
    if (token === undefined) {
      headerValue = `No Auth`;
    } else {
      headerValue = `Bearer ${token}`;
    }

    setLoading(true);

    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/places/place_search/",
        {},
        {
          headers: {
            Authorization: headerValue,
          },
        }
      );
      // console.log("data?", response);

      setState({
        loading: true,
        ItemList: response.data,
        MapList: response.data.results,
      });
      setLoading(false);
    } catch (err) {
      console.log("Error >>", err);
    }
  };

  // useEffect(() => {
  //   getItem();
  // }, []);

  return (
    <Sections>
      <Navibar />
      {loading ? (
        <Loading />
      ) : (
        <SpotList Itemcard={state.ItemList} location={location} />
      )}
      <Map mapList={state.MapList} />
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
