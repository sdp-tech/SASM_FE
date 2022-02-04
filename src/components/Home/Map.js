import React, {useState, useEffect} from 'react';
import { RenderAfterNavermapsLoaded, NaverMap, Marker } from 'react-naver-maps';

function CurrentLocation(){
  
  let latitude= 37.551229;
  let longitude = 126.988205;

  function success (pos){
    latitude = pos.coords.latitude;
    longitude = pos.coords.longitude;
    console.log("콜백 내부", latitude, longitude);
  }

  navigator.geolocation.getCurrentPosition(
    success, 
    function error(error) {
      console.error(error);
      alert("위치 정보를 확인할 수 없어 기본 위치로 이동합니다");
    },
    {
      enableHighAccuracy: true,
      maximumAge: 0,
      timeout: Infinity
    }
  );
  
  console.log("콜백 외부", latitude, longitude);
  return {latitude, longitude};
}

console.log("함수 호출", CurrentLocation());

function NaverMapAPI() {
  
  const navermaps = window.naver.maps;
  
  const [state, setState] = useState({
    center : {
      lat: 37.551229,
      lng: 126.988205
    }
  });
  
  useEffect(() => {
    setState({
      center : {
        lat: 37.5520579,
        lng: 126.9394652
      }
    });
    console.log("내부", state);
  }, [])

	return (
    <NaverMap
      mapDivId={'maps-getting-started-uncontrolled'}
      style={{
				width: '100%',
				height: '100%'
			}}
      center={state.center}
      defaultZoom={16}
      onCenterChanged={center => {console.log(center)}}
    >
			<Marker 
				key={1}
				position={new navermaps.LatLng(37.551229, 126.988205)}
				animation={2}
				onClick={() => {alert('여기는 서울타워입니다.');}}   
			/>
      <Marker 
				key={2}
				position={new navermaps.LatLng(37.5520579, 126.9394652)}
				animation={2}
				// onClick={() => {alert('여기는 현재 위치입니다.');}}   
			/>
    </NaverMap> 
  );
}

export default function Map() {
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