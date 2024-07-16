import React from "react";
import { Marker, Polygon, Polyline, Popup } from "react-leaflet";
import { LocationInfo } from "./LocationInfo";
import { getIcon } from "./svg_pins/utils";


export const LocationInMap = ({ location, icon }) => {

  const colorOption = location.color ? { color: location.color} : undefined
  const coords = location.coords ? [location.coords.coordinates[1], location.coords.coordinates[0]]: null
  const pathCoords = location.path ? location.path.coordinates.map(c => [c[1], c[0]]) : null
  const polygonCoords = location.polygon ? location.polygon.coordinates.map(p => p.map(c => [c[1], c[0]])) : null

  return (
    <>
      <Marker
        position={coords}
        icon={getIcon(location.color, icon ? icon : location.icon)}
      >
        <Popup>
          <LocationInfo location={location} position={coords} />
        </Popup>
      </Marker>
      {Boolean(location.path) && <Polyline pathOptions={colorOption} positions={pathCoords} />}
      {Boolean(location.polygon) && <Polygon pathOptions={colorOption} positions={polygonCoords} />}
    </>
  );
};
