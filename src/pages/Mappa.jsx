import Typography from "@mui/material/Typography";
import { useLoaderData } from "react-router-dom";
import { getLocationList, getLocation } from "../lib/cacheManager/locations";
import { Map } from "../ui/Map";
import Box from "@mui/material/Box";
import { MapContainer } from "react-leaflet";

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

  // TODO: Posizione centrale della mappa di default
  const center = lat && lon 
  ? [lat, lon]
  : [45.419743, 11.040704]


  return (
    <>
      <Typography
        variant="h1"
        fontSize="25px"
        fontWeight={900}
        sx={{ margin: "16px", color: "#2B2D2B" }}
      >
        Mappa
      </Typography>
      <Box
        sx={{
          background: "white",
          borderRadius: "16px",
          height: "50vh",
          minHeight: `250px`,
          overflow: "hidden",
          margin: "0 16px"
        }}
      >
        <MapContainer
          center={center}
          zoom={13}
          scrollWheelZoom={true}
          style={{ width: "100%", height: "100%", zIndex: 0 }}
        >
          <Map position={center} location={location} locations={locations} />
        </MapContainer>
      </Box>
      <Box
       sx={{
        margin: "16px",
      }}
      >
        <Typography variant="h3">{location?.name}</Typography>
        <Typography variant="body1">Latitude: {lat}</Typography>
        <Typography variant="body1">Longitude: {lon}</Typography>
      </Box>
    </>
  );
}
