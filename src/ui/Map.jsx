import React from "react";
import L from "leaflet";
import { Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet.offline";
import "leaflet/dist/leaflet.css";

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});


export const Map = ({ position, location, locations }) => {
  return (
    <>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {Boolean(location) &&
        <Marker position={position}>
          <Popup>{location.name}</Popup>
        </Marker>
      }
    </>
  );
};
