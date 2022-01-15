import React, { Component, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Icon } from "leaflet";
import * as parkData from "../../datas/map/skateboard-parks.json";

class Maps extends Component {
    constructor() {
        super();
        this.state = {
            lat: 45.4,
            lng: -75.7,
            zoom: 12
        }
    }

    render() {
        
        const position = [this.state.lat, this.state.lng];

        const mapStyles = {
            overflow: "hidden",
            width: "100%",
            height: "100vh"
        };

        const skater = new Icon({
            iconUrl: "/skateboarding.svg",
            iconSize:[25, 25]
        });

        const LandingPage = (()=>{
            const [activePark, setActivePark] = useState(null);
            // console.log(parkData);

            const parks = parkData.features;

            return (
                <div>
                    <MapContainer styles={mapStyles} center={position} zoom={this.state.zoom} scrollWheelZoom={false}>
                        <TileLayer
                            attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
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
                </div>
            );
        });

        return LandingPage();
    }
}

export default Maps;