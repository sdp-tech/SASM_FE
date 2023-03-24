import React, { useEffect, useState, useContext } from "react";
import styled from "styled-components";
import Navibar from "../components/common/Navibar";
import { LoginContext } from "../contexts/LoginContexts";
import Loading from "../components/common/Loading";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router";
import DataContainer from "../components/SpotMap/DataContainer";

export default function SpotMap() {
  const [login, setLogin] = useContext(LoginContext);
  const [loading, setLoading] = useState(true);
  const [cookies, setCookie, removeCookie] = useCookies(["name"]);
  const navigate = useNavigate();
  // const token = cookies.name; // 쿠키에서 id 를 꺼내기

  const [location, setLocation] = useState([]);
  // 에러 메세지 저장
  const [error, setError] = useState();
  // Geolocation의 `getCurrentPosition` 메소드에 대한 성공 callback 핸들러
  const handleSuccess = (pos) => {
    const { latitude, longitude } = pos.coords;
    // 현재위치 저장
    setLocation({ latitude, longitude });
    setLoading(false);
  };

  // Geolocation의 `getCurrentPosition` 메소드에 대한 실패 callback 핸들러
  const handleError = (error) => {
    setError(error.message);
  };
  useEffect(() => {
    const { geolocation } = navigator;
    setLoading(true);
    // 사용된 브라우저에서 지리적 위치(Geolocation)가 정의되지 않은 경우 오류로 처리합니다.
    if (!geolocation) {
      setError("Geolocation is not supported.");
      return;
    }
    // Geolocation API 호출
    geolocation.getCurrentPosition(handleSuccess, handleError);
  }, []);
  return (
    <Sections>
      {loading ? (
        <Loading />
      ) : (
        <>
          <DataContainer Location={location}/>
        </>
      )}
    </Sections>
  );
}

const Sections = styled.div`
  box-sizing: border-box;
  display: grid;
  position: relative;
  height: calc(100vh - 64px);
  @media screen and (max-width : 1024px){
  grid-template-rows: 0.4fr 0.6fr; 
  grid-template-columns: 1fr;
  grid-template-areas:
    "map";
    "spotlist";
  }
  grid-template-columns: 0.28fr 0.72fr;
  grid-template-rows: 1fr;
  grid-template-areas:
    "spotlist map";
`;
