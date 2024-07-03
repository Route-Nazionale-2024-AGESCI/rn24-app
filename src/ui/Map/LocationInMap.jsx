import React from "react";
import { Marker, Polygon, Polyline, Popup } from "react-leaflet";
import { LocationInfo } from "./LocationInfo";
import { getIcon } from "./svg_pins/utils";

export const LocationInMap = ({ location }) => {
  return (
    <>
      <Marker
        position={location.coords.coordinates}
        icon={getIcon(location.color, location.icon)}
      >
        <Popup>
          <LocationInfo location={location} position={location.coords.coordinates} />
        </Popup>
      </Marker>
      {Boolean(location.path) && <Polyline positions={location.path.coordinates} />}
      {Boolean(location.polygon) && <Polygon positions={location.polygon.coordinates} />}
    </>
  );
};
