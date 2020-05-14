import React from "react";
import { Map, TileLayer, Marker, Popup, Tooltip } from "react-leaflet";

const INITIAL_LATITUDE = -6.1755339;
const INITIAL_LONGITUDE = 106.8261159;
const INITIAL_ZOOM = 12;

const leafletContainerStyle = {
  height: "400px",
  width: "100%",
  margin: "0"
};

const MapInput = ({
  handleChange,
  position_lat,
  position_lng,
  position_zoom
}) => {
  const position = [
    position_lat ? position_lat : INITIAL_LATITUDE,
    position_lng ? position_lng : INITIAL_LONGITUDE
  ];

  return (
    <div className="leaflet-containers">
      <Map
        name="address_location"
        center={position}
        zoom={position_zoom ? position_zoom : INITIAL_ZOOM}
        onClick={e => handleChange(e)}
      >
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position}></Marker>
      </Map>
    </div>
  );
};

export default MapInput;
