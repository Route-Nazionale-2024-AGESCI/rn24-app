import React, { useEffect } from "react";
import L from "leaflet";
import { Marker, Popup, TileLayer, useMap } from "react-leaflet";
import "leaflet.offline";
import "leaflet/dist/leaflet.css";
import { LocateControl } from "./LocateControl";
import { LocationInfo } from "./LocationInfo";

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});


export const Map = ({ position, location, locations, centerTo }) => {
  const map = useMap();

  useEffect(()=>{
    if(centerTo) {
      map.flyTo(centerTo, 13)
    }
  }, [centerTo])
  
  return (
    <>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {Boolean(location) &&
        <Marker position={position}>
          <Popup><LocationInfo location={location} position={position}/></Popup>
        </Marker>
      }
      <LocateControl position={'bottomright'} setView={false} flyTo={true} showPopup={false} locateOptions={{watch: true, enableHighAccuracy: true}} />
    </>
  );
};
