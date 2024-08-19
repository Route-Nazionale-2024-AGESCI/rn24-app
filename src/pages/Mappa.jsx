import Typography from "@mui/material/Typography";
import { useLoaderData } from "react-router-dom";
import { useEffect, useMemo } from "react";
import { getLocationList, getLocation } from "../lib/cacheManager/locations";
import { Map } from "../ui/Map/Map";
import Box from "@mui/material/Box";
import { MapContainer } from "react-leaflet";
import { useState } from "react";
import { useUser } from "../lib/cacheManager/user";
import { useEventRegistrations } from "../lib/cacheManager/events";
import { getEventList } from "../lib/cacheManager/events";
import { DirectionsButton } from "../ui/Map/LocationInfo";
import FilterLocation, { FilterLocationButton } from "../ui/Map/FilterLocation";
import LocationCard from "../ui/LocationCard";
import { Button } from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useFilters, applyFilter } from "../contexts/locationFilter";


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
    if (location === undefined || !location?.coords?.coordinates) {
      // location = null;
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
  const district = user?.scout_group?.line?.subdistrict?.district;
  const tentLocationUuid = user?.scout_group?.line?.location;
  const tentLocation = tentLocationUuid
    ? locations.find((loc) => loc.uuid === tentLocationUuid)
    : undefined;

  // Location degli eventi a cui l'utente è registrato
  const { events } = useLoaderData();
  const { registrations } = useEventRegistrations();
  const userEvents = useMemo(() => {
    const regUuid = registrations.map((reg) => reg.event);
    return events.filter((ev) => regUuid.includes(ev.uuid));
  }, []);

  const eventLocations = useMemo(() => {
    return userEvents.map((ev) =>
      locations.find((l) => l.uuid === ev.location)
    );
  }, [userEvents, locations]);

  // Location dei prossimi eventi da visualizzare
  const [evtLocsToShow, setEvtLocsToShow] = useState(2)

  const nextEvents = useMemo(() => {
    return userEvents
      .filter((ev) => {
        const endDt = new Date(ev.ends_at);
        const now = new Date();
        return endDt >= now;
      });
  }, [userEvents]);

  const nextEventsLocations = useMemo(() => {
    return [...new Set(nextEvents
      .slice(0, evtLocsToShow)
      .map((ev) => locations.find((l) => l.uuid === ev.location)))];
  }, [nextEvents, locations, evtLocsToShow]);

  const nxtEvtLocsLenght = useMemo(() => (
    [...new Set(nextEvents.map(obj => obj.location))].length
  ),[nextEvents])

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
  const centerMap = (location) => {
    if (location?.coords?.coordinates) {
      setCenterTo([
        location.coords.coordinates[1],
        location.coords.coordinates[0],
      ]);
    } else if (location?.polygon?.coordinates && location?.polygon?.coordinates.length > 0) {
      setCenterTo([
        location.polygon.coordinates[0][0][1],
        location.polygon.coordinates[0][0][0],
      ]);
    } else if (location?.path?.coordinates && location?.path?.coordinates.length > 0) {
      const i = parseInt(location.path.coordinates.length / 2)
      setCenterTo([
        location.path.coordinates[i][1],
        location.path.coordinates[i][0],
      ]);
    }
    
    setOpenFilterDrawer(false);
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };

  const [openFilterDrawer, setOpenFilterDrawer] = useState(false);
  const { filters } = useFilters();
  const filteredPublicLocations = applyFilter(
    publicLocations,
    filters,
    district?.uuid
  );
  
  const [infoBarHeight, setInfoBarHeight] = useState("200")

  useEffect(()=>{
    if (location) {
      setInfoBarHeight(270)
    } else {
      setInfoBarHeight(200)
    }
  }, [location])

  const [hasFilters, setHasFilters] = useState(false)

  useEffect(()=>{
    let f = false;
    if (filters.category !== "") f = true;
    setHasFilters(f)
  }, [filters])

  const locationsToShow = useMemo(() => {
    let locs = filteredPublicLocations;
    if (!hasFilters) {
      locs = locs.concat(eventLocations);
      if (tentLocation) { locs.push(tentLocation) }
    }
    return [...new Set(locs)];
  }, [eventLocations, tentLocation, hasFilters, filteredPublicLocations]);

  return (
    <>
      {/* <Typography
        fontSize="25px"
        fontWeight={900}
        sx={{ margin: "16px", color: "#2B2D2B" }}
      >
        Mappa
      </Typography> */}
      <Box
        sx={{
          background: "white",
          height: `calc(100vh - ${infoBarHeight}px)`,
          minHeight: `270px`,
          overflow: "hidden",
          marginTop: "-112px",
          transition: "height 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
        }}
      >
        <MapContainer
          center={center}
          zoom={14}
          minZoom={13}
          maxZoom={18}
          scrollWheelZoom={true}
          style={{ width: "100%", height: "100%", zIndex: 0 }}
          zoomControl={false}
          attributionControl={false}
        >
          <Map
            position={center}
            location={location}
            locations={locationsToShow}
            centerTo={centerTo}
          />
          <Box
            sx={{
              zIndex: 410,
              position: "absolute",
              left: "24px",
              bottom: "28px",
            }}
          >
            <FilterLocationButton
              onClick={() => {
                setOpenFilterDrawer(true);
              }}
            />
          </Box>
        </MapContainer>
      </Box>

      <Box
        sx={{
          background: "white",
          borderRadius: "16px 16px 0 0",
          paddingX: "24px",
          marginY: "16px",
          paddingBottom: "48px",
          minHeight: "180px",
          marginY: "-16px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-around",
          position: "relative",
          boxShadow: "0px -4px 9px -6px #777",
        }}
      >
        <Box
          sx={{
            width: "100%",
            borderRadius: "16px 16px 0 0",
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            paddingTop: "8px",
            marginBottom: "0px",
          }}
        >
          <Box
            sx={{
              backgroundColor: "#E2DCEA",
              borderRadius: "50px",
              height: "4px",
              width: "32px",
            }}
          ></Box>
        </Box>
        {location && (
          <LocationCard
            location={location}
            onLocationClick={centerMap}
            showBorder={false}
            events={userEvents}
            selected
          />
        )}
        {Boolean(nextEventsLocations && nextEventsLocations.length) && (
          <>
            <Typography
              fontSize="20px"
              fontWeight={900}
              mt="24px"
              sx={{ color: "#2B2D2B" }}
            >
              Location dei prossimi eventi
            </Typography>
            {nextEventsLocations.map((location, i) => (
              <LocationCard
                key={i}
                location={location}
                onLocationClick={centerMap}
                events={userEvents}
              />
            ))}
            {Boolean(nxtEvtLocsLenght > evtLocsToShow) && (
              <Button
                variant="text"
                onClick={() => {
                  // setOpenFilterDrawer(true);
                  setEvtLocsToShow(evtLocsToShow + 2)
                }}
                endIcon={<ArrowForwardIosIcon sx={{ color: "#2B2D2B" }} />}
                sx={{ mt: "12px" }}
              >
                <Typography
                  fontSize="16px"
                  fontWeight={600}
                  sx={{ color: "#2B2D2B", textTransform: "none" }}
                >
                  Vedi altri
                </Typography>
              </Button>
            )}
          </>
        )}
        <Typography
          fontSize="20px"
          fontWeight={900}
          mt="24px"
          sx={{ color: "#2B2D2B" }}
        >
          La tua tenda
        </Typography>
        {Boolean(tentLocation) ? (
          <LocationCard
            location={tentLocation}
            onLocationClick={centerMap}
            events={events}
          />
        ) : (
          <Typography fontSize="16px" mt="12px" mb="24px">
            Troverai qui la location della tua tenda
          </Typography>
        )}
      </Box>
      <FilterLocation
        open={openFilterDrawer}
        onClose={() => {
          setOpenFilterDrawer(false);
        }}
        centerMap={centerMap}
        publicLocations={publicLocations}
        eventLocations={eventLocations}
        tentLocation={tentLocation}
        events={userEvents}
      />
    </>
  );
}
