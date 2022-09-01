import React, { useState, useEffect } from "react";
import { RenderAfterNavermapsLoaded, NaverMap, Marker } from "react-naver-maps";
import styled from "styled-components";
import axios from "axios";

const MapSection = styled.div`
  box-sizing: border-box;
  margin: 1%;
  position: relative;
  // background-color: yellow;
  grid-area: map;
  outline: none;
`;
const SearchAgainButton = styled.button`
  position: absolute;

  top: 3vh;
  left: 50%;
  transform: translate3d(-50%, 0, 0);
  background: #c4c4c4;
  border-radius: 14px;
  border: none;
  padding: 6px 22px;
  z-index: 4;
  cursor: pointer;
`;

const Markers = (props) => {
  const navermaps = props.navermaps;
  const left = props.left;
  const right = props.right;
  const title = props.title;
  const key = props.index;
  // HTML 마커
  const contentString = [
    '<div class="iw_inner">',
    `   <h5>${title} </h5>`,
    "   <p> ",
    '       <img src="./img/MarkerIcon.png" width="25" height="25" alt="marker" class="thumb" />',
    // "       02-120 | 공공,사회기관 > 특별,광역시청<br>",
    // '       <a href="http://www.seoul.go.kr" target="_blank">www.seoul.go.kr/</a>',
    "   </p>",
    "</div>",
  ].join("");

  return (
    <>
      <Marker
        key={key}
        position={new navermaps.LatLng(left, right)}
        title={title}
        icon={{
          content: contentString,
          size: new navermaps.Size(80, 800),
          anchor: new navermaps.Point(11, 30),
          // anchor: new navermaps.Point(11, 33),

          // url: "./img/red_dot.png",
          // size: new navermaps.Size(20, 20),
          // origin: new navermaps.Point(190, 190),
          // anchor: new navermaps.Point(10, 10),
        }}
        // animation={2}
        onClick={() => {
          alert(`여기는 ${title}입니다`);
        }}
      />
    </>
  );
};

const NaverMapAPI = (props) => {
  const Item = props.abc;
  const navermaps = window.naver.maps;

  // 일단은 기본 default 맵을 서울 시청 좌표로 상태 유지
  const [state, setState] = useState({
    center: {
      lat: 37.551229,
      lng: 126.988205,
    },
    zoom: 13,
  });

  // Geoloation 사용해서 현재 위치 정보 받아와서 상태값에 업데이트 해주기
  const updateCurLocation = async () => {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        setState({
          center: {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          },
        });

        // 현재 위치 서버에 전달하기
        try {
          const response = await axios.post(
            "http://127.0.0.1:8000/places/place_list",
            {
              left: position.coords.latitude,
              right: position.coords.longitude,
            }
          );
          console.log("response", response);
        } catch (err) {
          console.log("Error >>", err);
        }

        // console.log("현재 위치", {
        //   left: position.coords.latitude,
        //   right: position.coords.longitude,
        // });
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

  return (
    <>
      <NaverMap
        mapDivId={"SASM_map"}
        style={{
          width: "100%",
          height: "100%",
          outline: "none",
        }}
        center={state.center}
        defaultZoom={state.zoom}
        onZoomChanged={(zoom) => {
          console.log(zoom);
        }}
      >
        {/* markers */}
        {Item.map((itemdata, index) => {
          const left = itemdata[0];
          const right = itemdata[1];
          const title = itemdata[2];

          return (
            <Markers
              left={left}
              right={right}
              title={title}
              navermaps={navermaps}
              key={index}
            />
          );
        })}
        {/* <Marker
          key={1}
          position={new navermaps.LatLng(37.577235833483, 126.896210076434)}
          // animation={2}
          onClick={() => {
            alert("여기는 서울타워입니다?");
          }}
          icon={{
            url: "./img/red_dot.png",
            size: new navermaps.Size(20, 20),
            origin: new navermaps.Point(190, 190),
            anchor: new navermaps.Point(10, 10),
          }}
        /> */}
        {/* <Marker
          key={2}
          position={new navermaps.LatLng(37.5520579, 126.9394652)}
          // animation={2}
          onClick={() => {
            alert("여기는 서강대입니다?");
          }}
        /> */}
        <Marker
          key={3}
          position={state.center}
          clickable={false}
          icon={{
            url: "./img/red_dot.png",
            size: new navermaps.Size(20, 20),
            origin: new navermaps.Point(190, 190),
            anchor: new navermaps.Point(10, 10),
          }}
          // animation={2}
          onClick={() => {
            alert("여기는 현재 위치입니다.");
          }}
        />
      </NaverMap>
    </>
  );
};

export default function Map(props) {
  const Item = props.mapList;

  const abc = Item.map((itemdata, index, source) => {
    return [
      itemdata.left_coordinate,
      itemdata.right_coordinate,
      itemdata.place_name,
    ];
  });

  return (
    <MapSection>
      <RenderAfterNavermapsLoaded
        ncpClientId={"aef7a2wcmn"}
        error={<p>Maps Load Error</p>}
        loading={<p>Maps Loading...</p>}
      >
        <NaverMapAPI abc={abc} />
      </RenderAfterNavermapsLoaded>

      <SearchAgainButton
      // onClick={handleBackToCenter}
      >
        지금 지도에서 검색
      </SearchAgainButton>
    </MapSection>
  );
}
