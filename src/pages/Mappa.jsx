import Typography from "@mui/material/Typography";
import { useLoaderData } from "react-router-dom";
import { useMemo } from "react";
import { getLocationList, getLocation } from "../lib/cacheManager/locations";
import { Map } from "../ui/Map/Map";
import Box from "@mui/material/Box";
import { MapContainer } from "react-leaflet";
import { useState } from "react";
import { Grid, Stack } from "@mui/material";
import PlaceIcon from "@mui/icons-material/Place";
import { useUser } from "../lib/cacheManager/user";
import { useEventRegistrations } from "../lib/cacheManager/events";
import { getEventList } from "../lib/cacheManager/events";
import { DirectionsButton } from "../ui/Map/LocationInfo";
import HtmlWithRouterLinks from "../lib/htmlParser";

/* 
  
  Allowed URLs:
    /mappa
    /mappa/?location=1234-1234-1123asef-12ff3
    /mappa/?lat=44.234234234&lon=23.43245345

*/

export async function loader({ request }) {
  const { locations } = await getLocationList();
  const { events } = await getEventList();
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
      [lon, lat] = location?.coords.coordinates;
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
  if (locations) {
    publicLocations = locations.filter((loc) => loc.is_public === true);
  }
  return { locations, lat, lon, location, publicLocations, events };
}

export default function Mappa() {
  // Elenco delle locations... come filtrare quelle che deve visualizzare l'utente?
  const { locations } = useLoaderData();
  const { publicLocations } = useLoaderData();

  // Location per la tenda dell'utente
  const { user } = useUser();
  const tentLocationUuid = user?.scout_group?.line?.location;
  const tentLocation = tentLocationUuid
    ? locations.find((loc) => loc.uuid === tentLocationUuid)
    : undefined;

  // Location degli eventi a cui l'utente è registrato
  const { events } = useLoaderData();
  const { registrations } = useEventRegistrations();
  const eventLocations = useMemo(() => {
    const regUuid = registrations.map((reg) => reg.event);
    return events
      .filter((ev) => regUuid.includes(ev.uuid))
      .map((ev) => locations.find((l) => l.uuid === ev.location));
  }, [events, registrations, locations]);

  // Centro della mappa, se non sono null... altrimenti centrare sulla posizione del dispositivo
  const { lat, lon } = useLoaderData();

  // Location al centro della mappa (fare sempre riferimento a lat e lon)
  // usare per ottenere info in piu
  const { location } = useLoaderData();

  // Poligono relaativo alla location, se presente
  const { polygon } = useLoaderData();
  // TODO: Posizione centrale della mappa di default
  const center = lat && lon ? [lat, lon] : [45.419743, 11.040704];

  const [centerTo, setCenterTo] = useState();
  const centerMap = () => {
    setCenterTo(center);
  };
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
          height: "calc(100vh - 330px)",
          minHeight: `270px`,
          overflow: "hidden",
          marginX: "16px",
        }}
      >
        <MapContainer
          center={center}
          zoom={14}
          minZoom={13}
          maxZoom={18}
          scrollWheelZoom={true}
          style={{ width: "100%", height: "100%", zIndex: 0 }}
        >
          <Map
            position={center}
            location={location}
            locations={locations}
            centerTo={centerTo}
            publicLocations={publicLocations}
            eventLocations={eventLocations}
            tentLocation={tentLocation}
          />
        </MapContainer>
      </Box>
      {location && (
        <Box
          sx={{
            background: "white",
            borderRadius: "16px",
            paddingX: "16px",
            margin: "16px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-around",
          }}
        >
          <Grid item xs={6}>
            <Stack
              direction="row"
              spacing="8px"
              marginY="16px"
              alignItems="center"
            >
              <PlaceIcon
                sx={{ fontSize: 22, color: "#666A66" }}
                onClick={centerMap}
              />
              <Typography
                onClick={centerMap}
                fontSize="16px"
                variant="body1"
                fontWeight={600}
              >
                {location.name}
              </Typography>
            </Stack>
          </Grid>
          {location.description && (
            <Grid item xs={6}>
              <Stack
                direction="row"
                spacing="8px"
                paddingBottom="16px"
                alignItems="center"
              >
                <Typography fontSize="14px" fontWeight={600}>
                  Descrizione:
                </Typography>
                <div className="description-container">
                  <HtmlWithRouterLinks htmlString={location.description} />
                </div>
              </Stack>
            </Grid>
          )}
        </Box>
      )}
    </>
  );
}
