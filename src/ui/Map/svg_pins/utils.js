import CustomPin from "./CustomPin";
import { renderToStaticMarkup } from "react-dom/server";
import { divIcon } from "leaflet";

export const getIcon = (color, icon, big) => {
  const pin = <CustomPin color={color} icon={icon} big={big}/>;
  const iconMarkup = renderToStaticMarkup(pin);
  const iconAnchor = big ? [10.5, 37.5] : [6.5, 28]
  const popupAnchor = big ? [5, -19] : [0.5, -28]
  const customMarketIcon = divIcon({ 
        html: iconMarkup,
        iconAnchor: iconAnchor,
        popupAnchor: popupAnchor
    });
  return customMarketIcon;
};
