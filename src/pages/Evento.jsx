import { useLoaderData, Outlet, Link } from "react-router-dom";

import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import PersonIcon from "@mui/icons-material/Person";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import PlaceIcon from "@mui/icons-material/Place";

import WhitePaper from "../ui/WhitePaper";

import getEventColor from "../lib/eventColor";
import { italianMonth } from "../lib/italianDate";

import { getLocation } from "../lib/cacheManager/locations";
import { getEvent } from "../lib/cacheManager/events";
import { getPage } from "../lib/cacheManager/pages";
import HtmlWithRouterLinks from "../lib/htmlParser";

export async function loader({ params }) {
  const event = await getEvent(params.eventId);
  const location = await getLocation(event.location);
  const description = await getPage(event.page);

  return { event, location, description };
}

export default function Evento() {
  const { event, location, description } = useLoaderData();

  const standName = location?.name ?? "Luogo non definito";
  const startDT = event?.starts_at ? new Date(event.starts_at) : undefined;
  const endDT = event?.ends_at ? new Date(event.ends_at) : undefined;
  const registrationDT = event?.registrations_open_at
    ? new Date(event.registrations_open_at)
    : undefined;

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
              <Stack direction="column">
                {((event.registration_limit &&
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
                  )}
              </Stack>
            </Grid>
            <Grid item xs={6}>
              <Stack direction="column">
                <Typography fontSize="14px" fontWeight={600}>
                  Data:
                </Typography>
                <Stack direction="row" spacing="8px" alignItems="center">
                  <CalendarMonthIcon sx={{ fontSize: 12, color: "#666A66" }} />
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
                  <AccessTimeIcon sx={{ fontSize: 12, color: "#666A66" }} />
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
          </Grid>
          <Stack direction="column" marginY={"24px"}>
            <Typography fontSize="14px" fontWeight={600}>
              Luogo:
            </Typography>
            <Stack direction="row" spacing="8px" alignItems="center">
              <PlaceIcon sx={{ fontSize: 12, color: "#666A66" }} />

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
                    //sx={{ color: "#666A66" }}
                    sx={{ color: "agesciPurple.main" }}
                  >
                    {standName}
                  </Typography>
                </Link>
              )}
            </Stack>
          </Stack>
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
        <Outlet />
        <Box sx={{ height: "20px" }} />
      </WhitePaper>
    </>
  );
}
