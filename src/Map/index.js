import React, { useEffect, useState, useRef } from 'react';
import L from 'leaflet';
import * as ELG from 'esri-leaflet-geocoder';
import { Map as LeafletMap, Marker, Popup, TileLayer } from 'react-leaflet'
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
  const { street, exteriorNumber,
          zipcode, neighborhood, county,
          state, onChange } = props;
  const [zoom, setZoom] = useState(4);
  const [coordenates, setCoordenates] = useState([23.6260333, -102.5375005]);
  const [lMap, setLMap] = useState(null);

  const triggerChange = (coordenates) => {
    if (onChange) {
      onChange(coordenates);
    }
  };
  useEffect(() => {
    if(lMap && street && exteriorNumber && zipcode
       && neighborhood && county && state){
      const map = lMap.leafletElement;

      const address = `${street} ${exteriorNumber}`;

      const geoCode = new ELG.Geocode().address(address)
                          .neighborhood(neighborhood)
                          .postal(zipcode)
                          .city(county)
                          .region(state);
      geoCode.run((err, data, response) => {
        if(err) {
          console.log("err", err);
          return;
        }
        const marker = new L.marker(data.results[0].latlng, { draggable: true }).addTo(map);


        setZoom(17);
        let coordenates = [data.results[0].latlng.lat, data.results[0].latlng.lng];
        setCoordenates(coordenates);
        triggerChange(coordenates)
        marker.on('dragend', function(event) {
          var latlng = event.target.getLatLng();
          console.log(latlng.lat, latlng.lng)
        });
        console.log("data", data);
        //layerGroup.clearLayers();
        //layerGroup.addLayer(L.marker(data.results[0].latlng, { draggable: true }));
      });


      // const searchControl = new ELG.Geosearch().addTo(map);
      // const results = new L.LayerGroup().addTo(map);
      // searchControl.on("results", function(data) {
      //   results.clearLayers();
      //   console.log("data", data);
      //   for (let i = data.results.length - 1; i >= 0; i--) {
      //     results.addLayer(L.marker(data.results[i].latlng));
      //   }
      // });
    }
  }, [lMap, street, exteriorNumber, zipcode,
      neighborhood, county, state]);


  return (
    <LeafletMap
      center={coordenates}
      zoomControl={true}
      dragging={true}
      zoom={zoom}
      ref={m => {setLMap(m)}}>
      <TileLayer
        url="https://{s}.tile.osm.org/{z}/{x}/{y}.png"
        attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
      />
    </LeafletMap>
  );
}

export default Map;
