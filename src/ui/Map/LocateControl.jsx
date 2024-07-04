import "leaflet.locatecontrol";
import "leaflet.locatecontrol/dist/L.Control.Locate.css";
import { useEffect, useState } from "react";
import Locate from "leaflet.locatecontrol";
import { useMap } from "react-leaflet";
const onLocationError = (ev) => {
  console.log(ev);
  const msg =
    ev.code !== 1
      ? ev.message
      : "Accesso alla posizione negato. Abilita i permessi di localizzazione per continuare.";
  alert(msg);
};
export function LocateControl(props) {
  const map = useMap();
  let lc;
  useEffect(() => {
    if (!lc) {
      lc = new Locate({ onLocationError: onLocationError, ...props });
      lc.addTo(map);
      if (props.start) {
        lc.start();
      }
    }
  }, [map]);

  return null;
}
