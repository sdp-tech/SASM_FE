import React, {useState, useEffect} from 'react';
import { RenderAfterNavermapsLoaded, NaverMap, Marker } from 'react-naver-maps';

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

async function NaverMapAPI() {
  
  const navermaps = window.naver.maps;
  
  const [state, setState] = useState({
    center : {
      lat: 37.551229,
      lng: 126.988205
    }
  });
  
  useEffect(() => {
    async function updateCurLocation(){
      let position = await CurrentLocation();
      console.log("동기화 처리", position);
      setState({
        center : {
          lat: 37.5520579,
          lng: 126.9394652
        }
      });
    }
    updateCurLocation();
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