import React from "react";
import { Marker, Polygon, Polyline, Popup } from "react-leaflet";
import { LocationInfo } from "./LocationInfo";
import { getIcon } from "./svg_pins/utils";


export const LocationInMap = ({ location, icon }) => {

  const colorOption = location.color ? { color: location.color} : undefined

  return (
    <>
      <Marker
        position={location.coords.coordinates}
        icon={getIcon(location.color, icon ? icon : location.icon)}
      >
        <Popup>
          <LocationInfo location={location} position={location.coords.coordinates} />
        </Popup>
      </Marker>
      {Boolean(location.path) && <Polyline pathOptions={colorOption} positions={location.path.coordinates} />}
      {Boolean(location.polygon) && <Polygon pathOptions={colorOption} positions={location.polygon.coordinates} />}
    </>
  );
};
