import React, { useEffect, useState, useRef } from 'react';
import L from 'leaflet';
import * as ELG from 'esri-leaflet-geocoder';
import { Map as LeafletMap, Circle, CircleMarker, TileLayer } from 'react-leaflet'
import "leaflet/dist/leaflet.css";
import "esri-leaflet-geocoder/dist/esri-leaflet-geocoder.css";
import "leaflet/dist/leaflet.js";
import "esri-leaflet-geocoder/dist/esri-leaflet-geocoder.js";

// import marker icons
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.4.0/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.4.0/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.4.0/dist/images/marker-shadow.png"
});

const Map = (props) => {
  const { coordenates } = props;
  const [lMap, setLMap] = useState(null);

  useEffect(() => {
    if(lMap && coordenates){
      const map = lMap.leafletElement;

    }
  }, [lMap, coordenates]);


  return (
    <LeafletMap
      center={coordenates}
      zoom={15}
      ref={m => {setLMap(m)}}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; <a href=&quot;http://openstreetmap.org/copyright&quot;>OpenStreetMap</a> contributors"
      />
        <CircleMarker
          center={coordenates}
          fillColor="#186fa2"
          radius={10}
          opacity={0}
          fillOpacity={0.95}>
          <Circle
            center={coordenates}
            radius={1500}
            stroke={true}
            weight={1} />
        </CircleMarker>
    </LeafletMap>
  );
}

export default Map;
