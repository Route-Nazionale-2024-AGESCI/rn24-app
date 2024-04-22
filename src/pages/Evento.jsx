import { useLoaderData } from "react-router-dom";

import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";

import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import PersonIcon from "@mui/icons-material/Person";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import PlaceIcon from "@mui/icons-material/Place";

import WhitePaper from "../ui/WhitePaper";

import getEventColor from "../lib/eventColor";

import { getLocation } from "../lib/dataManager/locations";
import { getEvent } from "../lib/dataManager/events";

export async function loader({ params }) {
  const event = await getEvent(params.eventId);
  const location = await getLocation(event.location);
  return { event, location };
}

export default function Evento() {
  const { event, location } = useLoaderData();
  const standName = location?.name || "Luogo non definito";
  const startDT = new Date(event?.starts_at) || undefined;
  const endDT = new Date(event?.ends_at) || undefined;

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
      <WhitePaper>
        <Box
          sx={{
            marginY: "24px",
            marginTop: "40px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-around",
          }}
        >
          <Stack direction="row">
            <Stack direction="column">
              <Typography fontSize="14px" fontWeight={600}>
                Modulo:
              </Typography>
            </Stack>
            <Stack direction="column">
              <Typography fontSize="14px" fontWeight={600}>
                Numero Iscritti:
              </Typography>
            </Stack>
          </Stack>
          <Stack direction="row">
            <Stack direction="column">
              <Typography fontSize="14px" fontWeight={600}>
                Data:
              </Typography>
            </Stack>
            <Stack direction="column">
              <Typography fontSize="14px" fontWeight={600}>
                Orario:
              </Typography>
            </Stack>
          </Stack>
          <Stack direction="row">
            <Stack direction="column">
              <Typography fontSize="14px" fontWeight={600}>
                Apertura iscrizioni:
              </Typography>
            </Stack>
            <Stack direction="column">
              <Typography fontSize="14px" fontWeight={600}>
                Orario iscrizioni:
              </Typography>
            </Stack>
          </Stack>
          <Stack direction="column">
            <Typography fontSize="14px" fontWeight={600}>
              Luogo:
            </Typography>
          </Stack>
          <Stack direction="column">
            <Typography fontSize="14px" fontWeight={600}>
              Descrizione:
            </Typography>
          </Stack>
        </Box>
      </WhitePaper>
    </>
  );
}
