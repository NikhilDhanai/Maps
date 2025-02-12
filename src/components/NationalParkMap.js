import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// ✅ Custom radio button icons
const defaultIcon = new L.DivIcon({
  className: "custom-marker",
  html: '<div style="width: 12px; height: 12px; background: white; border-radius: 50%; border: 2px solid black;"></div>',
  iconSize: [12, 12],
  iconAnchor: [6, 6],
});
const correctIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/128/190/190411.png", // ✅ Green checkmark
  iconSize: [20, 20],
  iconAnchor: [10, 10],
  popupAnchor: [0, -10],
});

const NationalParkMap = ({
  nationalParks,
  center,
  zoom = 6,
  isZoomable = false,
  checkAnswer,
  answeredParks,
}) => {
  return (
    <MapContainer
      center={center}
      zoom={zoom}
      style={{
        height: "80vh",
        width: "60%",
        border: "2px solid black",
        margin: "0 auto",
      }}
      zoomControl={isZoomable} // 🔹 Makes the map fixed (unzoomable)
      dragging={isZoomable} // 🔹 Prevents dragging
      scrollWheelZoom={isZoomable} // 🔒 Disable zoom via scroll
      doubleClickZoom={isZoomable} // 🔒 Disable zoom via double-click
      touchZoom={isZoomable} // 🔒 Disable touch-based zooming
      className="responsive-map"
    >
      {/* 🎯 Base Map Layer */}
      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/">CARTO</a>'
      />

      {/* 🎯 Display National Park Markers */}
      {nationalParks.map((park) => (
        <Marker
          key={park.id}
          position={park.coords}
          icon={answeredParks.includes(park.id) ? correctIcon : defaultIcon}
          eventHandlers={{
            click: () => checkAnswer(park.id),
          }}
        >
          {/* ✅ Only show the popup if it's already answered correctly */}
          {answeredParks.includes(park.id) && <Popup>{park.name}</Popup>}
        </Marker>
      ))}
    </MapContainer>
  );
};

export default NationalParkMap;
