import { Link as RouterLink } from "react-router-dom";

import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

import AccessTimeIcon from "@mui/icons-material/AccessTime";
import PlaceIcon from "@mui/icons-material/Place";
import PersonIcon from "@mui/icons-material/Person";

import { useLocations } from "../../lib/cacheManager/locations";

export default function TimeSlot({ event }) {
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
      color="agesciPurple"
    >
      <Stack
        direction="row"
        justifyContent="space-between"
        sx={{
          width: "100%",
          color: "#2B2D2B",
        }}
      >
        <Stack direction="row" gap="8px" alignItems="center">
          <AccessTimeIcon sx={{ translate: "0 -1px", fontSize: "16px" }} />
          <Typography
            fontSize="16px"
            fontWeight={600}
            textTransform="capitalize"
          >
            {startDT.toLocaleTimeString("it-IT", {
              hour: "numeric",
              minute: "numeric",
            })}{" "}
            -{" "}
            {endDT.toLocaleTimeString("it-IT", {
              hour: "numeric",
              minute: "numeric",
            })}
          </Typography>
        </Stack>
        <Stack direction={"row"} alignItems={"center"}>
          {event.registration_limit !== null && (
            <Stack direction={"row"} alignItems={"center"} gap="4px">
              <Typography
                fontSize="14px"
                fontWeight={600}
                color="agesciPurple.main"
              >
                {event.personal_registrations_count}/{event.registration_limit}
              </Typography>
              <PersonIcon color="agesciPurple" sx={{ fontSize: "14px" }} />
            </Stack>
          )}
        </Stack>
      </Stack>
      <Stack
        direction="row"
        alignItems="center"
        gap={"8px"}
        sx={{
          width: "100%",
          mt: "8px",
          color: "#666A66",
        }}
      >
        <PlaceIcon sx={{ fontSize: "14px", translate: "0 -1px" }} />
        <Typography fontSize="14px" fontWeight={400}>
          {standName}
        </Typography>
      </Stack>
    </Button>
  );
}
