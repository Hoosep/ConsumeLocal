import React, { useEffect, useState, useRef } from 'react';
import { Button } from "antd";
import { Link } from "react-router-dom";
import L from 'leaflet';
import * as ELG from 'esri-leaflet-geocoder';
import { Map as LeafletMap, LayerGroup, Circle, CircleMarker, Popup, TileLayer } from 'react-leaflet'
import "leaflet/dist/leaflet.css";
import "esri-leaflet-geocoder/dist/esri-leaflet-geocoder.css";
import "leaflet/dist/leaflet.js";
import "esri-leaflet-geocoder/dist/esri-leaflet-geocoder.js";
import styled from "styled-components";

// import marker icons
delete L.Icon.Default.prototype._getIconUrl;

const ButtonHelp = styled(Button)`
  font-weight: bold;
  color: #FFF;
  background-color: #186fa2;
  border: 1px solid #186fa2;
  &:hover,
  &:focus {
    border: 1px solid #186fa2;
    color: #186fa2;
  }
`;

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.4.0/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.4.0/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.4.0/dist/images/marker-shadow.png"
});

const Map = (props) => {
  const { city, markers } = props;
  const [zoom, setZoom] = useState(4);
  const [coordenates, setCoordenates] = useState([23.6260333, -102.5375005]);
  const [lMap, setLMap] = useState(null);

  useEffect(() => {
    if(lMap && city && markers){
      const map = lMap.leafletElement;
      const geoCode = new ELG.Geocode()
                          .city(city)
                          .country("MEXICO");
      
      geoCode.run((err, data, response) => {
        if(err) {
          console.log("err", err);
          return;
        }

        let city = data.results.filter(element => {
          const { properties } = element;
          return properties.Country === "MEX"
        });
        
        let coordenates = [city[0].latlng.lat, city[0].latlng.lng];
        setZoom(13);
        setCoordenates(coordenates);
      });

    }
  }, [lMap, city, markers]);


  const renderBusiness = () => {
    if (markers.length > 0 ) {
      return markers.map(item => {
        return (
          <CircleMarker
            key={item.id}
            center={item.coordenates}
            fillColor="#186fa2"
            radius={10}
            opacity={0}
            fillOpacity={0.95}>
              <Popup>
                <strong>{item.business_name}</strong>
                <p className="my-0">
                  {item.street} {item.exterior_number},&nbsp;
                  {item.neighborhood}
                </p>
                <p className="my-0">
                  Contacto: {item.telephone}
                </p>
                <p className="my-0">
                  {item.category}
                </p>
                <Link to={`/business/${item.slug}`}>
                  <ButtonHelp block className="d-block mt-2">APOYAME</ButtonHelp>
                </Link>
              </Popup>
            </CircleMarker>
        )
      })
    } else return "";
    
  }

  return (
    <LeafletMap
      center={coordenates}
      zoomControl={true}
      zoom={zoom}
      ref={m => {setLMap(m)}}>
      <TileLayer
        url="https://{s}.tile.osm.org/{z}/{x}/{y}.png"
        attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
      />
        <LayerGroup key={1}>
          { renderBusiness() }
        </LayerGroup> 
    </LeafletMap>
  );
}

export default Map;
