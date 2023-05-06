import React, { useState, useEffect, useRef } from "react";
import { RenderAfterNavermapsLoaded, NaverMap, Marker } from "react-naver-maps";
import styled from "styled-components";
import axios from "axios";
import { useCookies } from "react-cookie";
import Loading from "../common/Loading";
import SpotDetail from "./SpotDetail";
import { useNavigate, useLocation } from "react-router-dom";
import Request from "../../functions/common/Request";
import Restart from "../../assets/img/Map/Restart.svg";
import MoveToCenter from "../../assets/img/Map/MoveToCenter.svg";
import ZoomPlus from "../../assets/img/Map/ZoomPlus.svg";
import ZoomMinus from "../../assets/img/Map/ZoomMinus.svg";
import MarkerbgDefault from "../../assets/img/Map/MarkerbgDefault.svg";
import MarkerbgActive from "../../assets/img/Map/MarkerbgActive.svg";
import MarkerbgSelect from "../../assets/img/Map/MarkerbgSelect.svg";
import { MatchCategory } from "../common/Category";
import qs from 'qs';

const MapSection = styled.div`
  box-sizing: border-box;
  position: relative;
  grid-area: map;
  outline: none;
`;
const DetailBox = styled.div`
  // boxsizing: border-box;
  position: absolute;
`;
const SearchHereButton = styled.button`
  display: flex;
  align-items: center;
  padding: 0 20px;
  border: none;
  background: #44adf7;
  height: 36px;
  border-radius: 15px;
  color: #ffffff;
  position: absolute;
  top: 1%;
  left: 50%;
  transform: translateX(-50%);
  z-index: 3;
  cursor: pointer;
`;
const MoveToCenterButton = styled.button`
  background: #ffffff;
  display: flex;
  width: 40px;
  height: 40px;
  justify-content: center;
  cursor: pointer;
  align-items: center;
  z-index: 3;
  border: none;
  border-radius: 10px;
  box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.25);
  margin-bottom: 10px;
`;

const ZoomSlider = styled.input`
  writing-mode: bt-lr; /* IE */
  -webkit-appearance: slider-vertical; /* Chromium */
`;
const ZoomSliderWrapper = styled.div`
  width: 100%;
  display: flex;
  z-index: 3;
  flex-direction: column;
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.25);
  margin-right: 30px;
`;
const ControllerWrapper = styled.div`
  position: absolute;
  display: flex;
  width: 40px;
  z-index: 3;
  flex-direction: column;
  right: 3vw;
  bottom: 5vh;
  @media screen and (max-width: 768px) {
    right: 3vw;
    bottom: 5vh;
  }
`;

const Markers = ({ navermaps, left, right, title, id, category, categoryNum, setTemp }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const queryString = qs.parse(location.search, {
    ignoreQueryPrefix: true
  });
  const [cookies, setCookie, removeCookie] = useCookies(["name"]);
  const node = useRef();
  const [bool, setBool] = useState(false);
  useEffect(() => {
    if (categoryNum != 0) {
      setBool(true);
    } else {
      setBool(false);
    }
  }, [categoryNum]);
  const navigate = useNavigate();
  const request = new Request(cookies, localStorage, navigate);
  // 마커 전부 초기화
  const MarkerReset = () => {
    const text = document.getElementById(`${id}text`);
    if (text) {
      text.style.transform = "none";
      if (!bool) {
        text.style.display = "none";
      }
    }
    if (!bool) {
      document.getElementById(`${id}bg`).style.backgroundImage = `url(${MarkerbgDefault})`;
    } else {
      document.getElementById(`${id}bg`).style.backgroundImage = `url(${MarkerbgActive})`;
    }
    document.getElementById(id).style.zIndex = "1";
  };
  // 상태에 맞는 마커 스타일 변경
  const MarkerChange = () => {
    const text = document.getElementById(`${id}text`);
    if (text) {
      text.style.transform = "translateY(100%)";
      if (!bool) {
        text.style.display = "block";
      }
    }
    document.getElementById(`${id}bg`).style.backgroundImage = `url(${MarkerbgSelect})`;
    document.getElementById(id).style.zIndex = "100";
  };
  useEffect(() => {
    const clickOutside = (e) => {
      // 모달이 열려 있고 모달의 바깥쪽을 눌렀을 때 창 닫기
      if (modalOpen && node.current && !node.current.contains(e.target)) {
        setModalOpen(false);
        MarkerReset();
      }
    };
    document.addEventListener("mousedown", clickOutside);
    return () => {
      // Cleanup the event listener
      document.removeEventListener("mousedown", clickOutside);
    };
  });
  useEffect(() => {
      if(location.state?.name) {
        MarkerChange();
        setModalOpen(true);
      }
  },[]);
  // 상세보기 클릭 이벤트
  const handleClick = () => {
    MarkerChange();
    setModalOpen(true);
    navigate(`/map?page=${queryString.page}&place=${title}`);
  };

  // 상세보기 모달 닫기 이벤트
  const modalClose = () => {
    setModalOpen(!modalOpen);
  };

  //마커의 텍스트 사이즈 고정하기
  const htmlFontSize = getComputedStyle(document.documentElement).fontSize.slice(0, 2);
  const width = Number(htmlFontSize * title.length) + 10;
  // HTML 마커
  const contentString = [
    `<div style="display:flex; jusitfy-content:center; align-items:center; transform: translateY(-50%); position:relative; flex-direction:column; cursor: pointer;" class="iw_inner" id=${id} >`,
    `   <div style="margin-top:0px; display: flex; width:45px; height: 67.5px; align-items: flex-start; justify-content: center; padding: 10px; background-image: url(${bool ? MarkerbgActive : MarkerbgDefault}); background-repeat: no-repeat; background-position: top; background-size: contain;" id="${id}bg" > `,
    `       <img src=${require(`../../assets/img/Category/CategoryWhite${MatchCategory(category)}.svg`)} style="width: 25px; height: 25px; border: 1px red;" alt="marker" class="thumb" id="${id}img" />`,
    "   </div>",
    `   <div style="display: ${bool ? "block" : "none"}; background:#FFFFFF; border-radius:8px; border: 1px #ADEFC2 solid; padding:3px; width: ${width}px; text-align:center; position: absolute; bottom:-5px;" id="${id}text">`,
    `      <p style="margin:0; font-size: 1rem;" >${title}</p>`,
    `   </div>`,
    "</div>",
  ].join("");

  return (
    <div ref={node}>
      <Marker
        key={`marker_${id}`}
        position={new navermaps.LatLng(left, right)}
        title={title}
        icon={{
          content: contentString,
          size: new navermaps.Size(80, 800),
          anchor: new navermaps.Point(11, 30),
        }}
        onClick={handleClick}
      />
      <DetailBox>
        {modalOpen && (
          <SpotDetail
            modalClose={modalClose}
            id={id}
            setTemp={setTemp}
          ></SpotDetail>
        )}
      </DetailBox>
    </div>
  );
};

const NaverMapAPI = ({ markerData, temp, setTemp, setSearchHere, setPage, categoryNum }) => {
  const navigate = useNavigate();
  const navermaps = window.naver.maps;
  const [zoom, setZoom] = useState(14);
  //Coor -> 현 위치에서 검색을 설정하기 위한 현재 위치
  const [coor, setCoor] = useState(null);
  //User의 현재 위치
  const [state, setState] = useState({
    lat: 37.551229,
    lng: 126.988205,
  });
  // Geoloation 사용해서 현재 위치 정보 받아와서 상태값에 업데이트 해주기
  const updateCurLocation = async () => {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        //현재 위치 고정
        setTemp({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
        //User의 현재 위치
        setState({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      (error) => {
        console.log(error);
      },
      {
        enableHighAccuracy: true,
        maximumAge: 0,
        timeout: Infinity,
      }
    );
  };

  // 초기에 한번 현재 위치 정보 받아서 해당 현재 위치로 이동시켜주기
  useEffect(() => {
    updateCurLocation();
  }, []);

  // 버튼 클릭 시 지도 현재 위치 중심으로 이동
  const handleBackToCenter = () => {
    updateCurLocation();
  };
  const handleCenterChanged = (data) => {
    setCoor({
      lat: data._lat,
      lng: data._lng,
    });
  };
  return (
    <>
      <SearchHereButton
        onClick={() => {
          setSearchHere(coor);
          navigate("/map?page=1");
        }}
      >
        <img style={{ marginRight: "5px" }} src={Restart} />
        지금 지도에서 검색
      </SearchHereButton>
      <ControllerWrapper>
        <MoveToCenterButton>
          <img src={MoveToCenter} onClick={handleBackToCenter} />
        </MoveToCenterButton>
        <ZoomSliderWrapper>
          <label
            htmlFor="zoomRange"
            style={{ display: "flex", justifyContent: "center" }}
            onClick={() => { setZoom(zoom + 1) }}
          >
            <img src={ZoomPlus} style={{ transform: "scale(0.6)" }} />
          </label>
          <ZoomSlider
            orient="vertical"
            type="range"
            min="11"
            max="19"
            id="zoomRange"
            value={zoom}
            onChange={(event) => { setZoom(Number(event.target.value)); }}
          />
          <label
            htmlFor="zoomRange"
            style={{ display: "flex", justifyContent: "center" }}
            onClick={() => { setZoom(zoom - 1) }}
          >
            <img src={ZoomMinus} style={{ transform: "scale(0.6)" }} />
          </label>
        </ZoomSliderWrapper>
      </ControllerWrapper>
      <NaverMap
        mapDivId={"SASM_map"}
        style={{
          width: "100%",
          height: "100%",
          outline: "none",
        }}
        center={temp}
        zoom={zoom}
        minZoom={11}
        maxZoom={19}
        onZoomChanged={(zoom) => { setZoom(zoom) }}
        zoomControl={false}
        onCenterChanged={(center) => { handleCenterChanged(center) }}
      >
        {/* markers */}
        {markerData.map((itemdata) => {
          const left = itemdata[0];
          const right = itemdata[1];
          const title = itemdata[2];
          const id = itemdata[3];
          const category = itemdata[4];
          return (
            <>
              <Markers
                categoryNum={categoryNum}
                setTemp={setTemp}
                left={left}
                right={right}
                title={title}
                id={id}
                category={category}
                navermaps={navermaps}
                key={`marker_${id}`}
              />
            </>
          );
        })}
        <Marker
          key={0}
          position={state}
          clickable={false}
          title={"현재 위치"}
          icon={{
            url: "/img/red_dot.png",
            size: new navermaps.Size(20, 20),
            origin: new navermaps.Point(190, 190),
            anchor: new navermaps.Point(10, 10),
          }}
        />
      </NaverMap>
    </>
  );
};

export default function Map({ placeData, temp, setTemp, setSearchHere, setPage, categoryNum }) {
  const markerData = placeData.map((itemdata, index, source) => {
    return [
      itemdata.latitude,
      itemdata.longitude,
      itemdata.place_name,
      itemdata.id,
      itemdata.category,
    ];
  });

  return (
    <MapSection>
      <RenderAfterNavermapsLoaded
        ncpClientId={"aef7a2wcmn"}
        error={<p>Maps Load Error</p>}
        loading={<p>Maps Loading…</p>}
      >
        <NaverMapAPI
          categoryNum={categoryNum}
          markerData={markerData}
          temp={temp}
          setTemp={setTemp}
          setSearchHere={setSearchHere}
          setPage={setPage}
        />
      </RenderAfterNavermapsLoaded>
    </MapSection>
  );
}
