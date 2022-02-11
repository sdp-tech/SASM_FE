import React, {useState, useEffect} from 'react';

const { naver } = window;

const Map = () => {
  const mapOptions = {
    center: new naver.maps.LatLng(37.3595704, 127.105399),
    zoom: 10,
  };
  
  const map = new naver.maps.Map('map', mapOptions);
  
  return (
    <div 
      id='map'
      style={{
        width: "100%",
        height: "100%" 
      }} 
    />
  );
}

export default Map;