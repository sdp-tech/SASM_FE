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

/*
함수형 컴포넌트들도 function 방식으로 적다보니 실제는 React component임을 까먹게 됨
리액트 컴포넌트들은 화살표 함수 방식으로 표기하고
세부 동작으로 작성한 함수들은 function 선언 방식으로 표기하는 것이 좋을 듯

추가로 React component 요소에는 async를 넣어놓을 수 없음
*/
const NaverMapAPI = () => {
  
  const navermaps = window.naver.maps;
  
  // 일단은 기본 default 맵을 서울 시청 좌표로 상태 유지
  const [state, setState] = useState({
    center : {
      lat: 37.551229,
      lng: 126.988205
    }
  });
  
  // 초기에 한번 현재 위치 정보 받아서 해당 현재 위치로 이동시켜주기
  // useEffect 안에서 async한 함수 사용하고 싶을 때는
  // 아래와 같이 useEffect안에서 aysnc function 정의해서 사용하기
  useEffect(() => {
    async function updateCurLocation(){
      let position = await CurrentLocation();
      setState({
        center : {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        }
      });
    }
    updateCurLocation();
  }, [])


	return (
    <>
      <NaverMap
        mapDivId={'maps-getting-started-uncontrolled'}
        style={{
          width: '100%',
          height: '100%'
        }}
        center={state.center}
        defaultZoom={16}
        // onCenterChanged={center => {console.log(center)}}
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