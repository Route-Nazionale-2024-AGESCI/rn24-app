import Typography from "@mui/material/Typography";
import { useLoaderData } from "react-router-dom";
import { getLocationList, getLocation } from "../lib/cacheManager/locations";

/* 
  
  Allowed URLs:
    /mappa
    /mappa/?location=1234-1234-1123asef-12ff3
    /mappa/?lat=44.234234234&lon=23.43245345

*/

export async function loader({ request }) {
  const { locations } = await getLocationList();
  const url = new URL(request.url);
  let location, lat, lon;

  if (url.searchParams.get("location")) {
    // Found location uuid in request
    location = await getLocation(url.searchParams.get("location"));
    if (location === undefined) {
      location = null;
      lat = null;
      lon = null;
    } else {
      [lat, lon] = location?.coords.coordinates;
    }
  } else if (url.searchParams.get("lat") && url.searchParams.get("lon")) {
    // Found latitude and longitude in request
    lat = Number(url.searchParams.get("lat"));
    lon = Number(url.searchParams.get("lon"));
    location = null;
    if (isNaN(lat) || isNaN(lon)) {
      // Invalid coords
      lat = null;
      lon = null;
    }
  } else {
    lat = null;
    lon = null;
    location = null;
  }
  return { locations, lat, lon, location };
}

export default function Mappa() {
  // Elenco delle locations... come filtrare quelle che deve visualizzare l'utente?
  const { locations } = useLoaderData();

  // Centro della mappa, se non sono null... altrimenti centrare sulla posizione del dispositivo
  const { lat, lon } = useLoaderData();

  // Location al centro della mappa (fare sempre riferimento a lat e lon)
  // usare per ottenere info in piu
  const { location } = useLoaderData();

  return (
    <>
      <Typography variant="h2">Mappa</Typography>
      <Typography variant="h3">{location?.name}</Typography>
      <Typography variant="body1">Latitude: {lat}</Typography>
      <Typography variant="body1">Longitude: {lon}</Typography>
    </>
  );
}
