import { Link as RouterLink } from "react-router-dom";

import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
//import PersonIcon from "@mui/icons-material/Person";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import PlaceIcon from "@mui/icons-material/Place";

import { useLocations } from "../lib/cacheManager/locations";
import getEventColor from "../lib/eventColor";
import EventIcon from "../lib/eventIcon";

export default function EventCard({ event, inProgress = false }) {
  const locations = useLocations();
  const location = locations.find((loc) => loc.uuid === event.location);
  const standName = location?.name || "Luogo non definito";
  const startDT = new Date(event.starts_at);
  const endDT = new Date(event.ends_at);

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
        {/* <Stack direction={"row"} alignItems={"center"}>
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
          </Stack> */}
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
          <EventIcon
            kind={event.kind}
            fontSize={inProgress ? "24px" : "12px"}
          />
          {/* <CalendarMonthIcon
            sx={{
              fontSize: inProgress ? "24px" : "12px",
            }}
          /> */}
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
}
