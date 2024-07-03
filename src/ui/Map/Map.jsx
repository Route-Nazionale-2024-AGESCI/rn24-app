import React, { useEffect } from "react";
import L from "leaflet";
import { Marker, TileLayer, useMap } from "react-leaflet";
import "leaflet.offline";
import "leaflet/dist/leaflet.css";
import { LocateControl } from "./LocateControl";
import { leafletLayer } from "protomaps-leaflet";
import VeronaPmtiles from "../../../public/verona.pmtiles";
import { LocationInMap } from "./LocationInMap";

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

export const Map = ({ position, location, centerTo, publicLocations }) => {
  const map = useMap();

  useEffect(() => {
    if (centerTo) {
      map.flyTo(centerTo, 13);
    }
  }, [centerTo]);

  useEffect(() => {
    map.whenReady(() => {
      const layer = leafletLayer({ url: VeronaPmtiles, theme: "light" });
      layer.addTo(map);
    });
  }, [map]);

  return (
    <>
      {/* <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      /> */}
      {Boolean(publicLocations) &&
        publicLocations.map((loc, i) => (
          <LocationInMap key={i} location={loc} />
        ))}
      {Boolean(location) && <LocationInMap location={location} />}
      <LocateControl
        position={"bottomright"}
        setView={false}
        flyTo={true}
        showPopup={false}
        clickBehavior={{
          inView: "start",
          inViewNotFollowing: "stop",
          outOfView: "setView",
        }}
        locateOptions={{ watch: true, enableHighAccuracy: true }}
      />
    </>
  );
};
