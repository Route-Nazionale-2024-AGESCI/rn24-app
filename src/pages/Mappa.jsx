import Typography from "@mui/material/Typography";
import { useLoaderData } from "react-router-dom";
import { getLocationList, getLocation } from "../lib/cacheManager/locations";
import { Map } from "../ui/Map/Map";
import Box from "@mui/material/Box";
import { MapContainer } from "react-leaflet";
import { useState } from "react";
import { Stack } from "@mui/material";
import PlaceIcon from "@mui/icons-material/Place";
import { DirectionsButton } from "../ui/Map/LocationInfo";

/* 
  
  Allowed URLs:
    /mappa
    /mappa/?location=1234-1234-1123asef-12ff3
    /mappa/?lat=44.234234234&lon=23.43245345

*/

export async function loader({ request }) {
  const { locations } = await getLocationList();
  const url = new URL(request.url);
  let location, lat, lon, publicLocations;

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
  if ( locations ) {
    publicLocations = locations.filter((loc) => loc.is_public === true)
  } 
  return { locations, lat, lon, location, publicLocations };
}

export default function Mappa() {
  // Elenco delle locations... come filtrare quelle che deve visualizzare l'utente?
  const { locations } = useLoaderData();
  const { publicLocations } = useLoaderData();

  // Centro della mappa, se non sono null... altrimenti centrare sulla posizione del dispositivo
  const { lat, lon } = useLoaderData();

  // Location al centro della mappa (fare sempre riferimento a lat e lon)
  // usare per ottenere info in piu
  const { location } = useLoaderData();

  // Poligono relaativo alla location, se presente
  const { polygon } = useLoaderData();
  // TODO: Posizione centrale della mappa di default
  const center = lat && lon 
  ? [lat, lon]
  : [45.419743, 11.040704]

  const [centerTo, setCenterTo] = useState();
  const centerMap = () => {
    setCenterTo(center)
  }
  return (
    <>
      <Typography
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
          margin: "0 16px",
        }}
      >
        <MapContainer
          center={center}
          zoom={14}
          minZoom={13}
          maxZoom={23}
          scrollWheelZoom={true}
          style={{ width: "100%", height: "100%", zIndex: 0 }}
        >
          <Map
            position={center}
            location={location}
            locations={locations}
            centerTo={centerTo}
            publicLocations={publicLocations}
          />
        </MapContainer>
      </Box>
      {location && (
        <Box
          sx={{
            margin: "16px",
          }}
        >
          <Stack direction="row" spacing="8px" alignItems="center" >
            <PlaceIcon sx={{ fontSize: 22, color: "#666A66" }} onClick={centerMap}/>
            <Typography
              onClick={centerMap}
              fontSize="16px"
              variant="body1"
              fontWeight={600}
            >
              {location.name}
            </Typography>
          </Stack>
          {/* <DirectionsButton position={`${lat},${lon}`}/> */}
        </Box>)}
    </>
  );
}
