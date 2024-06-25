import { useState, useEffect } from "react";
import { useLoaderData, Outlet, Link } from "react-router-dom";

import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Fab from "@mui/material/Fab";
import CircularProgress from "@mui/material/CircularProgress";

import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import PersonIcon from "@mui/icons-material/Person";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import PlaceIcon from "@mui/icons-material/Place";
import QrCodeIcon from "@mui/icons-material/QrCode";
import Alert from "@mui/material/Alert";
import Fade from "@mui/material/Fade";

import WhitePaper from "../ui/WhitePaper";
import AccessButton from "../ui/AccessButton";

import getEventColor from "../lib/eventColor";
import { italianMonth } from "../lib/italianDate";

import { getLocation } from "../lib/cacheManager/locations";
import { getEvent, useEventAttendees } from "../lib/cacheManager/events";
import { getPage } from "../lib/cacheManager/pages";
import { useUser } from "../lib/cacheManager/user";
import {
  useCheckIn,
  postEventCheckIn,
  deleteEventCheckIn,
} from "../lib/dataManager/events";
import HtmlWithRouterLinks from "../lib/htmlParser";

import { useNetworkState } from "@uidotdev/usehooks";

const ErrorAlert = ({ errorMsg, onClose }) => (
  <Fade in={errorMsg !== null}>
    <Alert
      severity="error"
      onClose={onClose}
      sx={{
        width: "80%",
        maxWidth: "400px",
        position: "fixed",
        bottom: "100px",
        left: "50%",
        translate: `calc(-50%)`,
        zIndex: "2000",
      }}
    >
      {errorMsg}
    </Alert>
  </Fade>
);

export async function loader({ params }) {
  const event = await getEvent(params.eventId);
  const location = await getLocation(event?.location);
  const description = await getPage(event?.page);
  return { event, location, description };
}

export default function Evento() {
  const { event, location, description } = useLoaderData();
  const { user } = useUser();
  const { attendees } = useEventAttendees(event?.uuid);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const networkState = useNetworkState();
  const { data, mutate } = useCheckIn(
    event?.kind === "TRACCE" ? event?.uuid : null
  );
  const { check_in } = data ?? { check_in: null };

  if (event === null) {
    throw new Error(
      "Evento non trovato... Assicurati di aver inserito l'ID corretto"
    );
  }

  useEffect(() => {
    if (error !== null) {
      const timer = setTimeout(() => {
        setError(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  const standName = location?.name ?? "Luogo non definito";
  const startDT = event?.starts_at ? new Date(event.starts_at) : undefined;
  const endDT = event?.ends_at ? new Date(event.ends_at) : undefined;
  const registrationDT = event?.registrations_open_at
    ? new Date(event.registrations_open_at)
    : undefined;

  const handleSubmit = async () => {
    try {
      setLoading(true);
      if (check_in === false) {
        await postEventCheckIn(event.uuid);
        mutate({ check_in: true });
        // mutate();
      } else {
        await deleteEventCheckIn(event.uuid);
        mutate({ check_in: false });
        // mutate()
      }
    } catch (err) {
      console.error(err);
      setError("Si è verificato un errore");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Typography
        variant="h1"
        fontSize="25px"
        fontWeight={900}
        sx={{ margin: "16px", color: "#2B2D2B" }}
      >
        {event.name}
      </Typography>
      <WhitePaper
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <Box
          sx={{
            marginX: "24px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-around",
          }}
        >
          <Grid container rowSpacing={"24px"}>
            <Grid item xs={6}>
              <Stack direction="column">
                <Typography fontSize="14px" fontWeight={600}>
                  Modulo:
                </Typography>
                <Typography
                  fontSize="16px"
                  fontWeight={600}
                  textTransform="capitalize"
                  color={getEventColor(event.kind).main}
                >
                  {event.kind.toLowerCase()}
                </Typography>
              </Stack>
            </Grid>
            <Grid item xs={6}>
              {event.is_registration_required &&
                event.registration_limit !== null && (
                  <Stack direction="column">
                    <Typography fontSize="14px" fontWeight={600}>
                      Numero Iscritti:
                    </Typography>
                    <Stack direction={"row"} alignItems={"center"} gap="4px">
                      <Typography
                        fontSize="14px"
                        fontWeight={600}
                        color="agesciPurple.main"
                      >
                        {event.personal_registrations_count}/
                        {event.registration_limit}
                      </Typography>
                      <PersonIcon
                        color="agesciPurple"
                        sx={{ fontSize: "14px" }}
                      />
                    </Stack>
                  </Stack>
                )}
              {/* {((event.registration_limit &&
                  event.registration_limit < 30000) ||
                  (event.registration_limit_from_same_scout_group &&
                    event.registration_limit_from_same_scout_group <
                      30000)) && (
                  <Typography fontSize="14px" fontWeight={600}>
                    Limite Partecipanti:
                  </Typography>
                )}
                {event.registration_limit &&
                  event.registration_limit < 30000 && (
                    <Stack direction={"row"} alignItems={"center"}>
                      <Typography
                        fontSize="14px"
                        fontWeight={600}
                        color="agesciPurple.main"
                      >
                        {event.registration_limit}
                      </Typography>
                      <PersonIcon
                        fontSize="14px"
                        color="agesciPurple"
                        sx={{
                          translate: "0 -1px",
                        }}
                      />
                    </Stack>
                  )}
                {event.registration_limit_from_same_scout_group &&
                  event.registration_limit_from_same_scout_group < 30000 && (
                    <Typography
                      fontSize="14px"
                      fontWeight={600}
                      color="agesciPurple.main"
                    >
                      {event.registration_limit_from_same_scout_group} dallo
                      stesso gruppo
                    </Typography>
                  )} */}
            </Grid>
            <Grid item xs={6}>
              <Stack direction="column">
                <Typography fontSize="14px" fontWeight={600}>
                  Data:
                </Typography>
                <Stack direction="row" spacing="8px" alignItems="center">
                  <CalendarMonthIcon
                    sx={{ fontSize: 12, color: "#666A66", translate: "0 -1px" }}
                  />
                  <Typography
                    variant="subtitle2"
                    fontSize="12px"
                    fontWeight={400}
                    sx={{ color: "#666A66" }}
                  >
                    {startDT.getDate()} {italianMonth[startDT.getMonth()]}
                  </Typography>
                </Stack>
              </Stack>
            </Grid>
            <Grid item xs={6}>
              <Stack direction="column">
                <Typography fontSize="14px" fontWeight={600}>
                  Orario:
                </Typography>

                <Stack direction="row" spacing="8px" alignItems="center">
                  <AccessTimeIcon
                    sx={{ fontSize: 12, color: "#666A66", translate: "0 -1px" }}
                  />
                  <Typography
                    variant="subtitle2"
                    fontSize="12px"
                    fontWeight={400}
                    sx={{ color: "#666A66" }}
                  >
                    {startDT.getHours().toString().padStart(2, "0")}:
                    {startDT.getMinutes().toString().padStart(2, "0")} -{" "}
                    {endDT.getHours().toString().padStart(2, "0")}:
                    {endDT.getMinutes().toString().padStart(2, "0")}
                  </Typography>
                </Stack>
              </Stack>
            </Grid>
            {registrationDT !== undefined ? (
              <>
                <Grid item xs={6}>
                  <Stack direction="column">
                    <Typography fontSize="14px" fontWeight={600}>
                      Apertura iscrizioni:
                    </Typography>
                    <Stack direction="row" spacing="8px" alignItems="center">
                      <CalendarMonthIcon
                        sx={{ fontSize: 12, color: "#666A66" }}
                      />
                      <Typography
                        variant="subtitle2"
                        fontSize="12px"
                        fontWeight={400}
                        sx={{ color: "#666A66" }}
                      >
                        {registrationDT.getDate()}{" "}
                        {italianMonth[registrationDT.getMonth()]}
                      </Typography>
                    </Stack>
                  </Stack>
                </Grid>
                <Grid item xs={6}>
                  <Stack direction="column">
                    <Typography fontSize="14px" fontWeight={600}>
                      Orario iscrizioni:
                    </Typography>
                    <Stack direction="row" spacing="8px" alignItems="center">
                      <AccessTimeIcon sx={{ fontSize: 12, color: "#666A66" }} />
                      <Typography
                        variant="subtitle2"
                        fontSize="12px"
                        fontWeight={400}
                        sx={{ color: "#666A66" }}
                      >
                        {registrationDT.getHours().toString().padStart(2, "0")}:
                        {registrationDT
                          .getMinutes()
                          .toString()
                          .padStart(2, "0")}
                      </Typography>
                    </Stack>
                  </Stack>
                </Grid>
              </>
            ) : null}

            <Grid item xs={6}>
              <Stack direction="column" marginY={"24px"}>
                <Typography fontSize="14px" fontWeight={600}>
                  Luogo:
                </Typography>
                <Stack direction="row" spacing="8px" alignItems="center">
                  <PlaceIcon
                    sx={{ fontSize: 12, color: "#666A66", translate: "0 -2px" }}
                  />

                  {location === undefined ? (
                    <Typography
                      variant="subtitle2"
                      fontSize="12px"
                      fontWeight={400}
                      textAlign="left"
                      mb="4px"
                      sx={{ color: "#666A66" }}
                    >
                      standName
                    </Typography>
                  ) : (
                    <Link
                      to={`/mappa/?location=${location.uuid}`}
                      //style={{ textDecoration: "none" }}
                    >
                      <Typography
                        variant="subtitle2"
                        fontSize="12px"
                        fontWeight={600}
                        textAlign="left"
                        mb="4px"
                        sx={{
                          color: "agesciPurple.main",
                          textDecoration: "underline",
                        }}
                      >
                        {standName}
                      </Typography>
                    </Link>
                  )}
                </Stack>
              </Stack>
            </Grid>

            {user?.permissions?.can_scan_qr &&
              event.is_registration_required && (
                <Grid item xs={6}>
                  <Stack direction="column" marginY={"24px"}>
                    <Typography fontSize="14px" fontWeight={600}>
                      Elenco partecipanti:
                    </Typography>
                    {attendees.length === 0 ? (
                      <Typography
                        variant="subtitle2"
                        fontSize="12px"
                        fontWeight={400}
                        textAlign="left"
                        mb="4px"
                        sx={{ color: "#666A66" }}
                      >
                        Non disponibile
                      </Typography>
                    ) : (
                      <>
                        <Typography
                          variant="subtitle2"
                          fontSize="12px"
                          fontWeight={400}
                          textAlign="left"
                          mb="4px"
                          sx={{ color: "#666A66" }}
                        >
                          Disponibile anche offline
                        </Typography>
                        <Link to="partecipanti">
                          <Typography
                            variant="subtitle2"
                            fontSize="12px"
                            fontWeight={600}
                            textAlign="left"
                            mb="4px"
                            sx={{
                              color: "agesciPurple.main",
                              textDecoration: "underline",
                            }}
                          >
                            Visualizza
                          </Typography>
                        </Link>
                      </>
                    )}
                  </Stack>
                </Grid>
              )}
          </Grid>
          {description && (
            <Stack direction="column">
              <Typography fontSize="14px" fontWeight={600}>
                Descrizione:
              </Typography>
              <div className="description-container">
                <HtmlWithRouterLinks htmlString={description.body} />
              </div>
            </Stack>
          )}
        </Box>
        <Box sx={{ height: "20px" }} />
        <Box>
          <Outlet />
          <Box sx={{ height: "20px" }} />
          {event.kind === "TRACCE" &&
            networkState.online &&
            check_in !== null && (
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <AccessButton
                  sx={{ opacity: loading ? "50%" : "100%", m: 0 }}
                  disabled={loading}
                  onClick={handleSubmit}
                >
                  <Typography fontSize="16px" fontWeight={600}>
                    {check_in === false
                      ? "Inizia il Servizio"
                      : "Segna come non iniziato"}
                  </Typography>
                  {loading && (
                    <CircularProgress
                      size="20px"
                      sx={{ marginLeft: "12px", color: "#000000" }}
                    />
                  )}
                </AccessButton>
              </Box>
            )}
        </Box>
        <Box sx={{ height: "20px" }} />
        {user?.permissions?.can_scan_qr &&
          attendees.length > 0 &&
          event.is_registration_required && (
            <>
              <Box sx={{ height: "80px" }}></Box>
              <Fab
                color="agesciPurple"
                style={{
                  position: "fixed",
                  right: "24px",
                  bottom: "100px",
                }}
                LinkComponent={Link}
                to={`/controlloAccessi/${event.uuid}`}
              >
                <QrCodeIcon sx={{ color: "#FFFFFF" }} />
              </Fab>
            </>
          )}
        <ErrorAlert errorMsg={error} onClose={() => setError(null)} />
      </WhitePaper>
    </>
  );
}
