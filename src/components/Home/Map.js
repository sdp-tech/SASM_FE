import React, {useState, useEffect} from 'react';
import { RenderAfterNavermapsLoaded, NaverMap, Marker } from 'react-naver-maps';

// Geoloation 사용해서 현재 위치 정보 받아오기
// Promise를 이용해 동기화처리해주기
function CurrentLocation(){
  
  const options =     {
    enableHighAccuracy: true,
    maximumAge: 0,
    timeout: Infinity
  };

  return new Promise((resolve, rejected) => {
    navigator.geolocation.getCurrentPosition(resolve, rejected, options);
  });
}

const NaverMapAPI = () => {
  
  const navermaps = window.naver.maps;
  
  // 일단은 기본 default 맵을 서울 시청 좌표로 상태 유지
  const [state, setState] = useState({
    center: {
      lat: 37.551229,
      lng: 126.988205
    },
    zoom: 16
  });
  const [render, setRender] = useState(0);
   
  // 초기에 한번 현재 위치 정보 받아서 해당 현재 위치로 이동시켜주기
  // useEffect 안에서 async한 함수 사용하고 싶을 때는
  // 아래와 같이 useEffect안에서 aysnc function 정의해서 사용하기
  useEffect(() => {
    async function updateCurLocation(){
      let position = await CurrentLocation();
      setState({
        ...state,
        center : {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        }
      });
    }
    updateCurLocation();
  }, [])

  // 버튼 클릭 시 지도 현재 위치 중심으로 이동
  const handleBackToCenter = () => {
    async function updateCurLocation(){
      let position = await CurrentLocation();
      setState({
        ...state,
        center : {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        },
        zoom: 16
      });
    }
    updateCurLocation();
  };
  
  // console.log(state.zoom);

	return (
    <>
      <button
        style={{
          position: 'fixed',
          top: '70px',
          right: '10px',
          zIndex: '4'
        }}
        onClick={handleBackToCenter}
      >
          현재 위치로
      </button>

      <NaverMap
        mapDivId={'SASM_map'}
        style={{
          width: '100%',
          height: '100%'
        }}
        center={state.center}
        defaultZoom={state.zoom}
        // onCenterChanged={center => {console.log(center)}}
        onZoomChanged={zoom => {console.log(zoom)}}
      >
        
        <Marker 
          key={1}
          position={new navermaps.LatLng(37.551229, 126.988205)}
          // animation={2}
          onClick={() => {alert('여기는 서울타워입니다.');}}   
        />
        <Marker 
          key={2}
          position={new navermaps.LatLng(37.5520579, 126.9394652)}
          // animation={2}
          onClick={() => {alert('여기는 서강대입니다.');}}   
        />

        <Marker 
          key={3}
          position={state.center}
          clickable={false}
          icon={{
            url: './img/red_dot.png',
            size: new navermaps.Size(20, 20),
            origin: new navermaps.Point(190, 190),
            anchor: new navermaps.Point(10, 10)
          }}
          // animation={2}
          onClick={() => {alert('여기는 현재 위치입니다.');}}   
        />
        <Marker 
          key={4}
          position={state.center}
          // animation={2}
          onClick={() => {alert('여기는 현재위치입니다.');}}   
        />
      </NaverMap> 
    </>
  );
}

const Map = () => {
  return (
    <RenderAfterNavermapsLoaded
      ncpClientId={'aef7a2wcmn'}
      error={<p>Maps Load Error</p>}
      loading={<p>Maps Loading...</p>}
    >
      <NaverMapAPI />
    </RenderAfterNavermapsLoaded>
  );
};

export default Map;