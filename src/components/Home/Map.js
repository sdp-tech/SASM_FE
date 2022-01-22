import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Icon } from "leaflet";


// import * as parkData from "../../datas/map/skateboard-parks";
// var parkData = require('../../datas/map/skateboard-parks');
// Code Refactoring 1 : JSON import 방식 통일
// -> List.js에서도 require로 받았는데 나름 우리끼리 통일하는게 좋을 듯
// 개인적으로 import가 직관적이고 외부 모듈 데이터 가져온거 볼 또 상단에 묶여있으니까 좋은 듯
import parkData from "../../datas/map/skateboard-parks";

console.log(parkData);

// Code Refactoring 2 : 함수형 컴포넌트로 통일
// 실제로 지금 코드에서도 클래스형 컴포넌트에서 사용할 수 없는 Hook(useState)을 사용해서 코드 에러 뜬 것도 있고
// 최근의 기술적 동향으로는 함수형 컴포넌트 사용을 지향한다고 하니 함수형 컴포넌트로 사용하는게 좋을 듯
// 추가로 수현이는 함수형 컴포넌트 사용하기는 했는데 일반적 함수 방식이고
// 나는 화살표 함수형으로 사용해서 이것도 통일하면 코드 통일성 더 맞아서 좋을것 같아
// 관련 설명 링크 https://devowen.com/298


// Code Refactoring 3 : 컴포넌트 요소 단수형 이름 사용하기
// 물론 복수형 요소인 경우도 있을 수는 있지만 컴포넌트 개념 자체적으로
// 개별 개체를 의미하는 요소다보니까 단수형으로 이름 관리하는게 좋을것 같아
const Map = () => {

    const state = {
        lat: 45.4,
        lng: -75.7,
        zoom: 12
    }
    const position = [state.lat, state.lng];
    const mapStyles = {
        overflow: "hidden",
        width: "100vw",
        height: "100vh"
    };
    const skater = new Icon({
        iconUrl: "/skateboarding.svg",
        iconSize:[25, 25]
    });
    const [activePark, setActivePark] = useState(null);
    const parks = parkData.features;
    console.log(parks);

    return (
        <MapContainer styles={mapStyles} center={position} zoom={state.zoom} scrollWheelZoom={false}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {parks.map(park => (
                <Marker 
                    key={park.properties.PARK_ID}
                    position={[
                        park.geometry.coordinates[1],
                        park.geometry.coordinates[0]
                    ]}
                    onClick={()=> {
                        setActivePark(park);
                    }}
                    icon={skater}
                    />
            ))}
            {activePark && (
                <Popup
                    position={[
                        activePark.geometry.coordinates[1],
                        activePark.geometry.coordinates[0]
                    ]}
                    onClose={()=>{
                        setActivePark(null);
                    }}
                >
                    <div>
                        <h2>{activePark.properties.NAME}</h2>
                        <p>{activePark.properties.DESCRIPITO}</p>
                    </div>
                </Popup>
            )}                     
        </MapContainer>
    )
}

export default Map;