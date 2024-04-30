import { useState } from "react";
import { useLoaderData, Link as RouterLink } from "react-router-dom";

import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup, {
  toggleButtonGroupClasses,
} from "@mui/material/ToggleButtonGroup";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import PersonIcon from "@mui/icons-material/Person";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import PlaceIcon from "@mui/icons-material/Place";
import HourglassTopRoundedIcon from "@mui/icons-material/HourglassTopRounded";
import { styled } from "@mui/material/styles";

import WhitePaper from "../ui/WhitePaper";

import getEventColor from "../lib/eventColor";

import {
  getEventList,
  getEventInvitations,
  getEventRegistrations,
} from "../lib/dataManager/events";
import { getLocationList } from "../lib/dataManager/locations";

const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
  [`& .${toggleButtonGroupClasses.grouped}`]: {
    margin: "6px", //theme.spacing(0.5),
    padding: "8px 20px",
    border: 0,
    borderRadius: "8px",
    backgroundColor: "#E2DCEA",
    color: theme.palette.agesciPurple.main,
    "&.Mui-selected": {
      backgroundColor: theme.palette.agesciPurple.main,
      color: theme.palette.common.white,
    },
    [`&.${toggleButtonGroupClasses.disabled}`]: {
      border: 0,
    },
  },
}));

// TODO: implementare API per il numero di iscritti

export async function loader() {
  const events = await getEventList();
  const locations = await getLocationList();
  const registrations = await getEventRegistrations();
  const invitations = await getEventInvitations();
  return { events, locations, registrations, invitations };
}

export default function Programma() {
  const getCurrentDate = () => {
    // const today = new Date(2024, 7, 25, 13);
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };
  const minDate = "2024-08-22";
  const maxDate = "2024-08-25";

  const [selectedDay, setSelectedDay] = useState(() => {
    const currentDate = getCurrentDate();
    return currentDate >= minDate && currentDate <= maxDate
      ? currentDate
      : minDate;
  });
  const { events, locations, registrations, invitations } = useLoaderData();

  const filterEventsByDate = (events, selectedDay) => {
    return events.filter((event) => {
      const eventDate = event.starts_at.split("T")[0];
      return eventDate === selectedDay;
    });
  };

  const findEventsInProgress = (events) => {
    // const currentDate = new Date(2024, 7, 25, 19, 30);
    const currentDate = new Date();
    return events.filter((event) => {
      const startsAt = new Date(event.starts_at);
      const endsAt = new Date(event.ends_at);
      return startsAt <= currentDate && endsAt > currentDate;
    });
  };
  const regUuid = registrations.map((reg) => reg.event);
  const invUuid = invitations.map((inv) => inv.uuid);
  const visibleEvents = events.filter(
    (ev) => regUuid.includes(ev.uuid) || invUuid.includes(ev.uuid)
  );
  const filteredEvents = filterEventsByDate(visibleEvents, selectedDay);
  const eventsInProgress = findEventsInProgress(filteredEvents);

  const handleChangeDay = (event, newDay) => {
    if (newDay !== null) {
      setSelectedDay(newDay);
    }
  };

  const EventCard = ({ event }) => {
    const location = locations.find((loc) => loc.uuid === event.location);
    const standName = location?.name || "Luogo non definito";
    const startDT = new Date(event.starts_at);
    const endDT = new Date(event.ends_at);
    const inProgress = eventsInProgress.includes(event);
    return (
      <Button
        component={RouterLink}
        to={`/eventi/${event.uuid}`}
        sx={{
          border: "1px solid #E2DCEA",
          borderRadius: "8px",
          padding: "12px",
          display: "flex",
          flexDirection: "column",
          alignItems: "start",
          marginX: "24px",
          marginY: "12px",
          textTransform: "none",
        }}
        color={getEventColor(event.kind).main.split(".")[0]}
      >
        <Stack
          direction="row"
          justifyContent="space-between"
          sx={{
            width: "100%",
          }}
        >
          <Typography
            fontSize="14px"
            fontWeight={600}
            textTransform="capitalize"
            color={getEventColor(event.kind).main}
          >
            {event.kind.toLowerCase()}
          </Typography>
          <Stack direction={"row"} alignItems={"center"}>
            <Typography
              fontSize="14px"
              fontWeight={600}
              color="agesciPurple.main"
            >
              10/25
            </Typography>
            <PersonIcon
              fontSize="14px"
              color="agesciPurple"
              sx={{
                translate: "0 -1px",
              }}
            />
          </Stack>
        </Stack>
        <Stack direction={"row"} gap="10px" mt="16px" alignItems={"center"}>
          <Box
            sx={{
              backgroundColor: getEventColor(event.kind).bg,
              height: inProgress ? "64px" : "32px",
              width: inProgress ? "64px" : "32px",
              borderRadius: "8px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              color: getEventColor(event.kind).main,
            }}
          >
            <CalendarMonthIcon
              sx={{
                fontSize: inProgress ? "24px" : "12px",
              }}
            />
          </Box>
          <Typography
            fontSize="16px"
            fontWeight={600}
            sx={{
              display: "-webkit-box",
              overflow: "hidden",
              WebkitBoxOrient: "vertical",
              WebkitLineClamp: 2,
              color: "#2B2D2B",
            }}
          >
            {event.name}
          </Typography>
        </Stack>

        <Stack direction="row" spacing="8px" alignItems="center" mt="12px">
          <AccessTimeIcon sx={{ fontSize: 14, color: "#666A66" }} />
          <Typography
            variant="subtitle2"
            fontSize="14px"
            fontWeight={400}
            textAlign="left"
            mb="4px"
            sx={{ color: "#666A66" }}
          >
            {startDT.getHours().toString().padStart(2, "0")}:
            {startDT.getMinutes().toString().padStart(2, "0")} -{" "}
            {endDT.getHours().toString().padStart(2, "0")}:
            {endDT.getMinutes().toString().padStart(2, "0")}
          </Typography>
        </Stack>
        <Stack direction="row" spacing="8px" alignItems="center">
          <PlaceIcon sx={{ fontSize: 14, color: "#666A66" }} />
          <Typography
            variant="subtitle2"
            fontSize="14px"
            fontWeight={400}
            textAlign="left"
            mb="4px"
            sx={{ color: "#666A66" }}
          >
            {standName}
          </Typography>
        </Stack>
      </Button>
    );
  };

  const TodayView = () => {
    return (
      <>
        <Typography
          fontSize="20px"
          fontWeight={900}
          sx={{ marginTop: "32px", marginLeft: "24px", color: "#2B2D2B" }}
        >
          In Corso
          {eventsInProgress.length > 0 ? (
            eventsInProgress.map((ev) => <EventCard event={ev} key={ev.uuid} />)
          ) : (
            <Stack direction={"row"} gap={"16px"} mt="12px">
              <Box
                sx={{
                  height: "64px",
                  width: "64px",
                  borderRadius: "8px",
                  backgroundColor: "#F0EDF4",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <HourglassTopRoundedIcon
                  sx={{
                    fontSize: "24px",
                    color: "#B6A7CA",
                  }}
                />
              </Box>
              <Stack direction="column" gap="8px">
                <Typography fontSize="16px" fontWeight={600}>
                  Nessun evento è ancora iniziato
                </Typography>
                <Typography fontSize="14px" fontWeight={400} color={"#2B2D2B"}>
                  Tieniti pronto e inizia ad avvicinarti allo stand di interesse
                </Typography>
              </Stack>
            </Stack>
          )}
        </Typography>
        <Typography
          fontSize="20px"
          fontWeight={900}
          sx={{ marginTop: "32px", marginLeft: "24px", color: "#2B2D2B" }}
        >
          Prossimi Eventi
          {filteredEvents
            .filter((ev) => !eventsInProgress.includes(ev))
            .map((ev) => (
              <EventCard event={ev} />
            ))}
        </Typography>
      </>
    );
  };
  const AnotherDayView = () => {
    return (
      <>
        <Typography
          fontSize="20px"
          fontWeight={900}
          sx={{ marginTop: "32px", marginLeft: "24px", color: "#2B2D2B" }}
        >
          {getCurrentDate() < selectedDay
            ? "Eventi in Programma"
            : "Eventi Passati"}
        </Typography>
        {filteredEvents.map((ev) => (
          <EventCard event={ev} key={ev.uuid} />
        ))}
      </>
    );
  };

  return (
    <>
      <Typography
        variant="h1"
        fontSize="25px"
        fontWeight={900}
        sx={{ margin: "16px", color: "#2B2D2B" }}
      >
        Programma
      </Typography>
      <WhitePaper>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <StyledToggleButtonGroup
            value={selectedDay}
            exclusive
            onChange={handleChangeDay}
            aria-label="Giorno"
            sx={{
              //border: "1px solid blue",
              marginX: "auto",
            }}
          >
            <ToggleButton value="2024-08-22" aria-label="22 agosto">
              <Stack direction={"column"} spacing={-1}>
                <Typography fontSize="20px" fontWeight={600}>
                  22
                </Typography>
                <Typography fontSize="14px" fontWeight={600}>
                  AGO
                </Typography>
              </Stack>
            </ToggleButton>
            <ToggleButton value="2024-08-23" aria-label="23 agosto">
              <Stack direction={"column"} spacing={-1}>
                <Typography fontSize="20px" fontWeight={600}>
                  23
                </Typography>
                <Typography fontSize="14px" fontWeight={600}>
                  AGO
                </Typography>
              </Stack>
            </ToggleButton>
            <ToggleButton value="2024-08-24" aria-label="24 agosto">
              <Stack direction={"column"} spacing={-1}>
                <Typography fontSize="20px" fontWeight={600}>
                  24
                </Typography>
                <Typography fontSize="14px" fontWeight={600}>
                  AGO
                </Typography>
              </Stack>
            </ToggleButton>
            <ToggleButton value="2024-08-25" aria-label="25 agosto">
              <Stack direction={"column"} spacing={-1}>
                <Typography fontSize="20px" fontWeight={600}>
                  25
                </Typography>
                <Typography fontSize="14px" fontWeight={600}>
                  AGO
                </Typography>
              </Stack>
            </ToggleButton>
          </StyledToggleButtonGroup>
        </Box>
        {getCurrentDate() === selectedDay ? <TodayView /> : <AnotherDayView />}
      </WhitePaper>
    </>
  );
}
