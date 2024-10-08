import React, { useEffect } from "react";
import L from "leaflet";
import { AttributionControl, TileLayer, useMap, ZoomControl } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { LocateControl } from "./LocateControl";
import { LocationInMap } from "./LocationInMap";
import { leafletLayer } from "protomaps-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

export const Map = ({ location, centerTo, locations }) => {
  const map = useMap();

  useEffect(() => {
    if (centerTo) {
      map.flyTo(centerTo, 17);
    }
  }, [centerTo, map]);

  useEffect(() => {
    map.whenReady(() => {
      const layer = leafletLayer({
        url: "/api/static/verona.pmtiles",
        theme: "light",
        bounds: [
          [45.46, 10.98],
          [45.407, 11.06],
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
      <LocateControl
        start={startLocatePosition}
        position={"bottomright"}
        showPopup={false}
        initialZoomLevel={17}
        locateOptions={{ watch: true, enableHighAccuracy: true }}
      />
      <TileLayer
        // attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <AttributionControl position="topright" />
      <MarkerClusterGroup
        chunkedLoading
        disableClusteringAtZoom={18}
        maxClusterRadius={15}
        zoomToBoundsOnClick={18}
        spiderfyOnMaxZoom={false}
      >
        {Boolean(locations) &&
          locations.map((loc, i) => (
            loc && <LocationInMap key={i} location={loc} />
          ))}
      </MarkerClusterGroup>
      {Boolean(location) && <LocationInMap location={location} big />}
      <ZoomControl position="bottomright" />
    </>
  );
};
