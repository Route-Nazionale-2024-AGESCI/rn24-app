import React, { useEffect } from "react";
import L from "leaflet";
import { TileLayer, useMap } from "react-leaflet";
import "leaflet.offline";
import "leaflet/dist/leaflet.css";
import { LocateControl } from "./LocateControl";
import { LocationInMap } from "./LocationInMap";

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

export const Map = ({ location, centerTo, publicLocations, eventLocations, tentLocation }) => {
  const map = useMap();

  useEffect(() => {
    if (centerTo) {
      map.flyTo(centerTo, 13);
    }
  }, [centerTo]);

  const startLocatePosition = location ? false : true
  return (
    <>
      <TileLayer
        // attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {Boolean(publicLocations) &&
        publicLocations.map((loc, i) => (
          <LocationInMap key={i} location={loc} />
        ))}
      {Boolean(eventLocations) &&
        eventLocations.map((loc, i) => (
          <LocationInMap key={i} location={loc} />
        ))}
      {Boolean(tentLocation) && <LocationInMap location={tentLocation} icon={"campground"} />}
      {Boolean(location) && <LocationInMap location={location} />}
      <LocateControl
        start={startLocatePosition}
        position={"bottomright"}
        flyTo={true}
        showPopup={false}
        initialZoomLevel={17}
        locateOptions={{ watch: true, enableHighAccuracy: true }}
      />
    </>
  );
};
