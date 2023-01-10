import React, { useState, useEffect, useRef } from "react";
import { RenderAfterNavermapsLoaded, NaverMap, Marker } from "react-naver-maps";
import styled from "styled-components";
import axios from "axios";
import { useCookies } from "react-cookie";
import Loading from "../common/Loading";
import SpotDetail from "./SpotDetail";
import { useNavigate } from "react-router-dom";
import Request from "../../functions/common/Request";
import Restart from "../../assets/img/Map/Restart.svg";
import MoveToCenter from "../../assets/img/Map/MoveToCenter.svg";
import MarkerActive from "../../assets/img/Map/MarkerActive.svg";
import MarkerDefault from "../../assets/img/Map/MarkerDefault.svg";
import ZoomPlus from "../../assets/img/Map/ZoomPlus.svg";
import ZoomMinus from "../../assets/img/Map/ZoomMinus.svg";

const MapSection = styled.div`
  box-sizing: border-box;
  position: relative;
  grid-area: map;
  outline: none;
`;
const DetailBox = styled.div`
  // boxsizing: border-box;
  position: absolute;
  z-index: 6;
  height: 100vh;
`;
const SearchHereButton = styled.button`
  display: flex;
  align-items: center;
  padding: 0 20px;
  border: none;
  background: #44ADF7;
  height: 36px;
  border-radius: 15px;
  color: #FFFFFF;
  position: absolute;
  top: 1%;
  left: 50%;
  transform: translateX(-50%);
  z-index: 3;
`
const MoveToCenterButton = styled.button`
  background: #FFFFFF;
  display: flex;
  width: 40px;
  height: 40px;
  justify-content: center;
  cursor: pointer;
  align-items: center;
  z-index: 3;
  border: none;
  border-radius: 10px;
  box-shadow: 4px 4px 10px rgba(0,0,0,0.25);
  margin-bottom: 10px;
`

const ZoomSlider = styled.input`
  writing-mode: bt-lr; /* IE */
  -webkit-appearance: slider-vertical; /* Chromium */
`
const ZoomSliderWrapper = styled.div`
  width: 100%;
  display: flex;
  z-index: 3;
  flex-direction: column;
  background-color: #FFFFFF;
  border-radius: 10px;
  box-shadow: 4px 4px 10px rgba(0,0,0,0.25);
  margin-right: 30px;
`
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
`


const Markers = (props) => {
  const htmlFontSize = getComputedStyle(document.documentElement).fontSize.slice(0, 2);
  const [modalOpen, setModalOpen] = useState(false);
  const [detailInfo, setDetailInfo] = useState([]);
  const [reviewInfo, setReviewInfo] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cookies, setCookie, removeCookie] = useCookies(["name"]);
  const node = useRef();
  const navermaps = props.navermaps;
  const left = props.left;
  const right = props.right;
  const title = props.title;
  const id = props.id;
  const category = props.category;
  const key = props.index;
  const categoryNum = props.categoryNum;
  const [bool, setBool] = useState(false);
  useEffect(() => {
    if (categoryNum != 0) {
      setBool(true);
    }
    else {
      setBool(false);
    }
  }, [categoryNum]);
  const width = Math.max(htmlFontSize * title.length, htmlFontSize * 0.75 * category.length);
  // const token = cookies.name; // 쿠키에서 id 를 꺼내기

  const token = localStorage.getItem("accessTK"); //localStorage에서 accesstoken꺼내기
  const navigate = useNavigate();
  const request = new Request(cookies, localStorage, navigate);
  const setTemp = (data) => {
    props.setTemp(data);
  }

  const MarkerReset = () => {
    const img = document.getElementById(`${id}img`);
    const text = document.getElementById(`${id}text`);
    if (img) {
      img.style.transform = 'scale(1)';
      if (!bool) {
        img.setAttribute('src', MarkerDefault);
      }
    }
    if (text) {
      text.style.backgroundColor = '#FFFFFF';
      text.style.color = "#000000";
      if (!bool) {
        text.style.display = 'none';
      }
    }
  }
  const MarkerChange = () => {
    const img = document.getElementById(`${id}img`);
    const text = document.getElementById(`${id}text`);
    if (img) {
      if (!bool) {
        img.setAttribute('src', MarkerActive);
      }
      img.style.transform = 'scale(1.2)';
    }
    if (text) {
      if (!bool) {
        text.style.display = 'block';
      }
      text.style.backgroundColor = '#44ADF7';
      text.style.color = "#FFFFFF";
    }
  }
  useEffect(() => {
    const clickOutside = (e) => {
      // 모달이 열려 있고 모달의 바깥쪽을 눌렀을 때 창 닫기
      MarkerReset();
      if (modalOpen && node.current && !node.current.contains(e.target)) {
        setModalOpen(false);
      }
    };
    document.addEventListener("mousedown", clickOutside);
    return () => {
      // Cleanup the event listener
      document.removeEventListener("mousedown", clickOutside);
    };
  });


  // 상세보기 클릭 이벤트
  const handleClick = async () => {
    setLoading(true);
    MarkerChange();
    const response = await request.get("/places/place_detail/", { id: id }, null);
    const response_review = await request.get("/places/place_review/", {
      id: id,
    }, null);
    // console.log("response!!!", response.data);

    setReviewInfo(response_review.data.data);
    setDetailInfo(response.data.data);
    setModalOpen(true);
    setTemp({
      center: {
        lat: response.data.data.latitude,
        lng: response.data.data.longitude,
      },
      zoom: 13,
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
    `   <div style="display: ${bool ? "block" : "none"}; background: #FFFFFF; border-radius: 10px; padding:5px; width: ${width}px; position: absolute; transform: translate(65%, -25%);" id="${id}text">`,
    `      <p style="margin-top:3px; font-size: 1rem;" >${title}</p>`,
    `      <p style="margin-top: -15px; margin-bottom: 3px; font-size: 0.75rem;">${category}</p>`,
    `   </div>`,
    '   <p style="margin-top:0px" > ',
    `       <img src=${bool ? MarkerActive : MarkerDefault} width="25" height="25" alt="marker" class="thumb" id="${id}img" />`,
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
        }}
        onClick={handleClick}
      />
      <DetailBox>
        {modalOpen && (
          <SpotDetail
            modalClose={modalClose}
            id={props.id}
            detailInfo={detailInfo}
            reviewInfo={reviewInfo}
          ></SpotDetail>
        )}
      </DetailBox>
    </div>
  );
};

const NaverMapAPI = (props) => {
  const Item = props.markerInfo;
  const navermaps = window.naver.maps;
  const zoom = props.zoom;
  const setZoom = (zoom) => {
    props.setZoom(zoom);
  }
  //Coor -> 현 위치에서 검색을 설정하기 위한 현재 위치
  const [coor, setCoor] = useState(null);
  const [state, setState] = useState({
    center: {
      lat: 37.551229,
      lng: 126.988205,
    },
    zoom: 13,
  })
  const temp = props.temp;
  const setTemp = (data) => {
    props.setTemp(data);
  }
  const setSearchHere = (data) => {
    props.setSearchHere(data);
  }
  // Geoloation 사용해서 현재 위치 정보 받아와서 상태값에 업데이트 해주기
  const updateCurLocation = async () => {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        //현재 위치 고정
        setTemp({
          center: {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          },
          zoom: zoom,
        });
        setState({
          center: {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          },
          zoom: zoom,
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
      center: {
        lat: data._lat,
        lng: data._lng,
      }
    })
  }
  return (
    <>
      <SearchHereButton onClick={() => {
        props.setPage(1);
        setSearchHere(coor);
      }}>
        <img style={{ marginRight: '5px' }} src={Restart} />
        지금 지도에서 검색
      </SearchHereButton>
      <ControllerWrapper>
        <MoveToCenterButton>
          <img src={MoveToCenter} onClick={handleBackToCenter} />
        </MoveToCenterButton>
        <ZoomSliderWrapper>
          <label htmlFor="zoomRange" style={{ display: 'flex', justifyContent:'center'}} onClick={(e) => {
            setZoom(zoom + 1);
          }}><img src={ZoomPlus} style={{ transform: 'scale(0.6)' }} /></label>
          <ZoomSlider orient="vertical" type="range" min="11" max="19" id="zoomRange" value={zoom} onChange={(event) => {
            setZoom(Number(event.target.value));
          }} /><label htmlFor="zoomRange" style={{ display: 'flex', justifyContent:'center'}} onClick={(e) => {
            setZoom(zoom - 1);
          }}><img src={ZoomMinus} style={{ transform: 'scale(0.6) rotate(90deg)' }} /></label>
        </ZoomSliderWrapper>
      </ControllerWrapper>
      <NaverMap
        mapDivId={"SASM_map"}
        style={{
          width: "100%",
          height: "100%",
          outline: "none",
        }}
        center={temp.center}
        zoom={zoom}
        minZoom={11}
        maxZoom={19}
        onZoomChanged={(zoom) => {
          setZoom(zoom);
        }}
        zoomControl={false}
        onCenterChanged={(center) => {
          handleCenterChanged(center);
        }}
      >
        {/* markers */}
        {Item.map((itemdata, index) => {
          const left = itemdata[0];
          const right = itemdata[1];
          const title = itemdata[2];
          const id = itemdata[3];
          const category = itemdata[4];

          return (
            <>
              <Markers
                categoryNum={props.categoryNum}
                setTemp={setTemp}
                left={left}
                right={right}
                title={title}
                id={id}
                category={category}
                navermaps={navermaps}
                key={index}
              />
            </>
          );
        })}
        <Marker
          key={3}
          position={state.center}
          clickable={false}
          title={"현재 위치"}
          icon={{
            url: "/img/red_dot.png",
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
      itemdata.category,
    ];
  });
  const zoom = props.zoom;
  const setZoom = (zoom) => {
    props.setZoom(zoom);
  }
  const temp = props.temp;
  const setTemp = (data) => {
    props.setTemp(data);
  }
  const setSearchHere = (data) => {
    props.setSearchHere(data);
  }
  const setPage = (page) => {
    props.setPage(page);
  }

  return (
    <MapSection>
      <RenderAfterNavermapsLoaded
        ncpClientId={"aef7a2wcmn"}
        error={<p>Maps Load Error</p>}
        loading={<p>Maps Loading…</p>}
      >
        <NaverMapAPI categoryNum={props.categoryNum} markerInfo={markerInfo} temp={temp} setTemp={setTemp} setSearchHere={setSearchHere} setPage={setPage} zoom={zoom} setZoom={setZoom} />
      </RenderAfterNavermapsLoaded>

      {/* <SearchAgainButton
      // onClick={handleBackToCenter}
      >
        지금 지도에서 검색
      </SearchAgainButton> */}
    </MapSection>
  );
}
