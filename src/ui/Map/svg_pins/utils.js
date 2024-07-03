import CustomPin from "./CustomPin";
import { renderToStaticMarkup } from "react-dom/server";
import { divIcon } from "leaflet";

export const getIcon = (color, icon) => {
  const pin = <CustomPin color={color} icon={icon} />;
  const iconMarkup = renderToStaticMarkup(pin);
  const customMarketIcon = divIcon({ 
        html: iconMarkup,
        iconAnchor: [6.5, 28]
    });
  return customMarketIcon;
};
