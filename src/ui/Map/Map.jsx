import React, { useEffect } from "react";
import L from "leaflet";
import { TileLayer, useMap, ZoomControl } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { LocateControl } from "./LocateControl";
import { LocationInMap } from "./LocationInMap";
import { leafletLayer } from "protomaps-leaflet";

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
      map.flyTo(centerTo, 17);
    }
  }, [centerTo]);

  useEffect(() => {
    map.whenReady(() => {
      const layer = leafletLayer({
        url: "https://rn24-app-dev.agesci.it/api/static/verona.pmtiles",
        theme: "light",
        bounds: [
          [45.46, 10.98],
          [45.4, 11.06],
        ],
        minZoom: 13,
        maxZoom: 18,
      });
      layer.addTo(map);
    });
  }, [map]);

  const startLocatePosition = location ? false : true
  return (
    <>
      <TileLayer
        // attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <ZoomControl position="bottomright" />
      {Boolean(publicLocations) &&
        publicLocations.map((loc, i) => (
          <LocationInMap key={i} location={loc} />
        ))}
      {Boolean(eventLocations) &&
        eventLocations.map((loc, i) => (
          <LocationInMap key={i} location={loc} />
        ))}
      {Boolean(tentLocation) && <LocationInMap location={tentLocation} />}
      {Boolean(location) && <LocationInMap location={location} big/>}
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
