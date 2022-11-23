import React, { useState, useEffect, useRef } from "react";
import { RenderAfterNavermapsLoaded, NaverMap, Marker } from "react-naver-maps";
import styled from "styled-components";
import axios from "axios";
import { useCookies } from "react-cookie";
import Loading from "../common/Loading";
import SpotDetail from "./SpotDetail";
import { useNavigate } from "react-router-dom";
import Request from "../../functions/common/Request";

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
  const navigate = useNavigate();
  const request = new Request(cookies, localStorage, navigate);
  const setState = (data) => {
    props.setState(data);
  }
  useEffect(() => {
    const clickOutside = (e) => {
      // 모달이 열려 있고 모달의 바깥쪽을 눌렀을 때 창 닫기
      if (modalOpen && node.current && !node.current.contains(e.target)) {
        setModalOpen(false);
        document.getElementById(id).style.color='black';
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
    document.getElementById(id).style.color='red';
    const response = await request.get("/places/place_detail/", { id: id }, null);
    // console.log("response!!!", response.data);
    setDetailInfo(response.data.data);
    setModalOpen(true);
    setState({
      center: {
        lat: response.data.data.latitude,
        lng: response.data.data.longitude,
      },
      zoom:17,
    });
    setLoading(false);
  };

  // 상세보기 모달 닫기 이벤트
  const modalClose = () => {
    setModalOpen(!modalOpen);
  };

  // HTML 마커
  const contentString = [
    `<div style="display:flex; jusitfy-content:center; align-items:center; flex-direction:column; cursor: pointer;" class="iw_inner" id=${id} >`,
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
  const [coor, setCoor] = useState(null);
  const temp = props.temp;
  const setTemp=(data)=>{
    props.setTemp(data);
  }
  const setSearchHere = (data) => {
    props.setSearchHere(data);
  }
  // Geoloation 사용해서 현재 위치 정보 받아와서 상태값에 업데이트 해주기
  const updateCurLocation = async () => {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        setTemp({
          center: {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          },
          zoom:13,
        });
        setState({
          center: {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          },
          zoom:13,
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
      center:{
        lat:data._lat,
        lng:data._lng,
      }
    })
  }

  return (
    <>
      <button style={{position:'absolute', left:'50%', zIndex:'3'}} onClick={()=>{
        props.setPage(1);
        setSearchHere(coor);
      }}>현 지도에서 검색</button>
      <button style={{position:'absolute', right:'0', zIndex:'3', padding:'5px'}} onClick={handleBackToCenter}>현 위치</button>
      <NaverMap
        mapDivId={"SASM_map"}
        style={{
          width: "100%",
          height: "100%",
          outline: "none",
        }}
        center={temp.center}
        defaultZoom={temp.zoom}
        onZoomChanged={(zoom) => {
          console.log(zoom);
        }}
        onCenterChanged={(center)=>{
          handleCenterChanged(center);
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
              setState={setTemp}
              left={left}
              right={right}
              title={title}
              id={id}
              navermaps={navermaps}
              key={index}
            />
          );
        })}
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
  const temp = props.temp;
  const setTemp=(data)=>{
    props.setTemp(data);
  }
  const setSearchHere = (data)=> {
    props.setSearchHere(data);
  }
  const setPage =(page) => {
    props.setPage(page);
  }
  return (
    <MapSection>
      <RenderAfterNavermapsLoaded
        ncpClientId={"aef7a2wcmn"}
        error={<p>Maps Load Error</p>}
        loading={<p>Maps Loading...</p>}
      >
        <NaverMapAPI markerInfo={markerInfo} temp={temp} setTemp={setTemp} setSearchHere={setSearchHere} setPage={setPage}/>
      </RenderAfterNavermapsLoaded>

      {/* <SearchAgainButton
      // onClick={handleBackToCenter}
      >
        지금 지도에서 검색
      </SearchAgainButton> */}
    </MapSection>
  );
}
