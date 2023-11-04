import React, { useState, useEffect } from 'react';
import './styles.css';
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Icon, point, divIcon } from "leaflet";
import MarkerClusterGroup from 'react-leaflet-cluster';
import axios from 'axios';



export default function App() {
  const [data, setData] = useState([]);
  const [markers, setMarkers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/maps');
        setData(response.data);
      } catch (error) {
        console.error('Error:', error);
      }
    };
    fetchData();
  }, [data]);

  useEffect(() => {
    const newMarkers = data.map((item) => ({
      geocode: [item.LAT, item.LNG],
      popUp: `${data.Notes}`,
    }));
    setMarkers(newMarkers);
  }, [data]);

  const customIcon = new Icon({
    iconUrl: require("./img/google-maps.png"),
    iconSize: [38, 38],
  });

  return (
    <MapContainer center={[48.8566, 2.3522]} zoom={13} style={{ height: "100vh" }} >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
      />
      <MarkerClusterGroup>
        {markers.map((marker, index) => (
          <Marker key={index} position={marker.geocode} icon={customIcon}   >
            {/* <Popup>{marker.popUp}</Popup> */}
            <Popup>'hallo'</Popup>
          </Marker>
        ))}
      </MarkerClusterGroup>
      <div className='mapdot'><img src='%publicurl%/img/google-maps.png' alt='Google Maps Icon' />

 </div>
    </MapContainer>
  );
}
