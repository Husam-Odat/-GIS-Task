import "./styles.css";
import 'bootstrap/dist/css/bootstrap.css';
import "leaflet/dist/leaflet.css";
import { useState, useRef, useMemo, useCallback, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import Form from './Form'; // Import the Form component
import { Icon, divIcon, point } from "leaflet";
import axios from 'axios';

const center = [31.951591711679697, 35.93934368582822];
const zoom = 19;

export default function App1() {
    const [data, setData] = useState([]);
    const [markers, setMarkers] = useState([]);
    const [position, setPosition] = useState(center); // Initialize position state

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
    }, [data]); // Only run once when the component mounts

    useEffect(() => {
        const newMarkers = data.map((item) => ({
            geocode: [item.LAT, item.LNG],
            popUp: item.Notes, // Use item.Notes for popup content
        }));
        setMarkers(newMarkers);
    }, [data]);

    const customIcon = new Icon({
        iconUrl: require("./img/google-maps.png"),
        iconSize: [38, 38],
    });

    const [map, setMap] = useState(null);

    useEffect(() => {
        if (map) {
            map.on('move', () => {
                setPosition(map.getCenter()); // Update position state
            });
        }
    }, [map]);

    return (
        <div className="container">
        <div className="row">
        <div className="suctionMap col-10">
            <MapContainer
                center={center}
                zoom={zoom}
                ref={setMap}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <MarkerClusterGroup>
                    {markers.map((marker, index) => (
                        <Marker key={index} position={marker.geocode} icon={customIcon}>
                            <Popup>{marker.popUp}</Popup>
                        </Marker>
                    ))}
                </MarkerClusterGroup>
            </MapContainer>
            <div className="mapdot"></div>
            </div>

            <div className="col-2">
            <Form position={position} /> {/* Pass position state to Form */}
                </div>
        
        </div>
        </div>
    );
}
