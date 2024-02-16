import React from "react";
import { MapContainer, TileLayer, Popup, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useSelector } from "react-redux";
import L from 'leaflet'
import icon from './../assets/plane-i.png'
const MapView = ({ openModal }) => {
  const store = useSelector((store) => store);

  const planeIcon = L.icon({
    iconUrl: icon,
    iconSize: [20, 20],
  });
  return (
    <div className="leaflet-container">
      <MapContainer
        center={[39.8283, -98.5795]}  // Center coordinates for the contiguous United States
        zoom={4}                        // Adjust the zoom level accordingly
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {store.flights.map((flight) => (
          <Marker
            icon={planeIcon}
            key={flight.id}
            position={[flight.lat, flight.lng]}
          >
            <Popup>
              <div className="popup">
                <span>Code: {flight.code}</span>
                <button onClick={() => openModal(flight.id)}>Details</button>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default MapView;
