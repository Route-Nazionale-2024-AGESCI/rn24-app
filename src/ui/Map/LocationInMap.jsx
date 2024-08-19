import React from "react";
import { Marker, Polygon, Polyline } from "react-leaflet";
import { getIcon } from "./svg_pins/utils";
import { useNavigate } from "react-router-dom";

export const LocationInMap = ({ location, icon, big = false }) => {
  const colorOption = location.color ? { color: location.color } : undefined;
  const coords = location.coords
    ? [location.coords.coordinates[1], location.coords.coordinates[0]]
    : null;
  const pathCoords = location.path
    ? location.path.coordinates.map((c) => [c[1], c[0]])
    : null;
  const polygonCoords = location.polygon
    ? location.polygon.coordinates.map((p) => p.map((c) => [c[1], c[0]]))
    : null;
  const navigate = useNavigate();
  const onClick = () => {
    navigate(`/mappa/?location=${location.uuid}`);
  };
  return (
    <>
      {Boolean(coords) && (
        <Marker
          className={"prova"}
          position={coords}
          icon={getIcon(location.color, icon ? icon : location.icon, big)}
          pane={big ? "popupPane" : "markerPane"}
          eventHandlers={{
            click: () => {
              onClick();
            },
          }}
        ></Marker>
      )}
      {Boolean(location.path) && (
        <Polyline pathOptions={colorOption} positions={pathCoords} eventHandlers={{
          click: () => {
            onClick();
          },
        }} />
      )}
      {Boolean(location.polygon) && (
        <Polygon pathOptions={colorOption} positions={polygonCoords} eventHandlers={{
          click: () => {
            onClick();
          },
        }} />
      )}
    </>
  );
};
