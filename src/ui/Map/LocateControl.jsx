import "leaflet.locatecontrol";
import "leaflet.locatecontrol/dist/L.Control.Locate.css";
import { useEffect, useState } from "react";
import Locate from "leaflet.locatecontrol";
import { useMap } from "react-leaflet";

export function LocateControl(props) {
  const map = useMap();
  let lc;
  useEffect(() => {
    if (!lc) {
      lc = new Locate({ ...props });
      lc.addTo(map);
      lc.start();
    }
  }, [map]);

  return null;
}
