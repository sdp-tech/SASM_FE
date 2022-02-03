import React from 'react';
import { RenderAfterNavermapsLoaded, NaverMap, Marker } from 'react-naver-maps';

function NaverMapAPI() {
    const navermaps = window.naver.maps;
  
    return (
    <NaverMap
      mapDivId={'maps-getting-started-uncontrolled'}
      style={{
				width: '100%',
				height: '100%'
			}}
      defaultCenter={{ lat: 37.554722, lng: 126.970833 }}
      defaultZoom={13}
    >
			<Marker 
				key={1}
				position={new navermaps.LatLng(37.551229, 126.988205)}
				animation={2}
				onClick={() => {alert('여기는 서울타워입니다.');}}   
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