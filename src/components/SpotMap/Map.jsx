import React, { useState, useEffect, useRef } from "react";
import { RenderAfterNavermapsLoaded, NaverMap, Marker } from "react-naver-maps";
import styled from "styled-components";
import axios from "axios";
import { useCookies } from "react-cookie";
import Loading from "../common/Loading";
import SpotDetail from "./SpotDetail";

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
const DetailBox = styled.div`
  // boxsizing: border-box;
  position: absolute;
  z-index: 6;
  height: 100vh;
`;

const Markers = (props) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [detailInfo, setDetailInfo] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cookies, setCookie, removeCookie] = useCookies(["name"]);
  const node = useRef();
  const navermaps = props.navermaps;
  const left = props.left;
  const right = props.right;
  const title = props.title;
  const id = props.id;
  const key = props.index;
  // const token = cookies.name; // 쿠키에서 id 를 꺼내기
  const token = localStorage.getItem("accessTK"); //localStorage에서 accesstoken꺼내기

  useEffect(() => {
    const clickOutside = (e) => {
      // 모달이 열려 있고 모달의 바깥쪽을 눌렀을 때 창 닫기
      if (modalOpen && node.current && !node.current.contains(e.target)) {
        setModalOpen(false);
      }
    };

    document.addEventListener("mousedown", clickOutside);

    return () => {
      // Cleanup the event listener
      document.removeEventListener("mousedown", clickOutside);
    };
  }, [modalOpen]);

  // 상세보기 클릭 이벤트
  const handleClick = async () => {
    // alert(`${props.id}`);
    setLoading(true);
    const id = props.id;
    let headerValue;
    if (token === undefined) {
      headerValue = `No Auth`;
    } else {
      headerValue = `Bearer ${token}`;
    }
    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/places/place_detail/",
        {
          params: {
            id: id,
          },

          headers: {
            Authorization: headerValue,
          },
        }
      );
      // console.log("response!!!", response.data);
      setDetailInfo(response.data.data);
      setModalOpen(true);

      setLoading(false);
    } catch (err) {
      console.log("Error >>", err);
    }
  };

  // 상세보기 모달 닫기 이벤트
  const modalClose = () => {
    setModalOpen(!modalOpen);
  };

  // HTML 마커
  const contentString = [
    '<div style="display:flex; jusitfy-content:center; align-items:center; flex-direction:column; cursor: pointer;" class="iw_inner">',
    `   <h4 style="background: white; border-radius: 10px; padding: 3px;">${title}</h4>`,
    '   <p style="margin-top: -20px;"> ',
    '       <img src="./img/MarkerIcon.png" width="25" height="25" alt="marker" class="thumb" />',
    // "       02-120 | 공공,사회기관 > 특별,광역시청<br>",
    // '       <a href="http://www.seoul.go.kr" target="_blank">www.seoul.go.kr/</a>',
    "   </p>",
    "</div>",
  ].join("");

  return (
    <div ref={node}>
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
        // onClick={() => {
        //   alert(`여기는 ${id}입니다`);
        // }}
        onClick={handleClick}
      />
      <DetailBox>
        {modalOpen && (
          <SpotDetail
            modalClose={modalClose}
            id={props.id}
            detailInfo={detailInfo}
          ></SpotDetail>
        )}
      </DetailBox>
    </div>
  );
};

const NaverMapAPI = (props) => {
  const Item = props.markerInfo;
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

        // // 현재 위치 서버에 전달하기
        // try {
        //   const response = await axios.post(
        //     "http://127.0.0.1:8000/places/place_list/",
        //     {
        //       left: position.coords.latitude,
        //       right: position.coords.longitude,
        //     }
        //   );
        //   console.log("response", response);
        // } catch (err) {
        //   console.log("Error >>", err);
        // }

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
          const id = itemdata[3];

          return (
            <Markers
              left={left}
              right={right}
              title={title}
              id={id}
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
          title={"현재 위치"}
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

  const markerInfo = Item.map((itemdata, index, source) => {
    return [
      itemdata.latitude,
      itemdata.longitude,
      itemdata.place_name,
      itemdata.id,
    ];
  });

  return (
    <MapSection>
      <RenderAfterNavermapsLoaded
        ncpClientId={"aef7a2wcmn"}
        error={<p>Maps Load Error</p>}
        loading={<p>Maps Loading...</p>}
      >
        <NaverMapAPI markerInfo={markerInfo} />
      </RenderAfterNavermapsLoaded>

      {/* <SearchAgainButton
      // onClick={handleBackToCenter}
      >
        지금 지도에서 검색
      </SearchAgainButton> */}
    </MapSection>
  );
}
