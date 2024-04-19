import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import PlaceIcon from "@mui/icons-material/Place";
import { italianMonth } from "../lib/italianDate";

import { useEvent } from "../lib/hooks/events";
import { useLocation } from "../lib/hooks/locations";

export default function EventSummaryCard({ eventId }) {
  const event = useEvent(eventId);
  const location = useLocation(event.location);

  const startDT = new Date(event.starts_at);
  const endDT = new Date(event.ends_at);
  const title = event.name;
  const standName = location?.name || "Luogo non definito";
  return (
    <Button
      sx={{
        maxWidth: "300px",
        width: "300px",
        height: "96px",
        borderRadius: "8px",
        textTransform: "none",
        p: "12px",
        justifyContent: "start",
        flex: "0 0 auto",
      }}
      variant="contained"
      disableElevation
      color="white"
    >
      <Stack direction="row" spacing="16px">
        <Box
          sx={{
            bgcolor: "#E2DCEA",
            width: "56px",
            height: "72px",
            borderRadius: "8px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <Typography
            variant="subtitle1"
            fontSize="20px"
            fontWeight={600}
            sx={{ color: "#6D5095" }}
          >
            {startDT.getDate().toString().padStart(2, "0")}
          </Typography>
          <Typography
            variant="subtitle2"
            fontSize="14px"
            fontWeight={600}
            textTransform="uppercase"
            sx={{ color: "#6D5095" }}
          >
            {italianMonth[startDT.getMonth()].substring(0, 3)}
          </Typography>
        </Box>
        <Stack direction="column" maxWidth="204px">
          <Typography
            variant="subtitle1"
            fontSize="12px"
            lineHeight="15px"
            fontWeight={600}
            textAlign="left"
            mb="8px"
            //Limitare il numero di righe visualizzate a 2, per titoli troppo lunghi
            sx={{
              display: "-webkit-box",
              overflow: "hidden",
              WebkitBoxOrient: "vertical",
              WebkitLineClamp: 2,
            }}
          >
            {title}
          </Typography>
          <Stack direction="row" spacing="8px" alignItems="center">
            <AccessTimeIcon sx={{ fontSize: 12, color: "#959695" }} />
            <Typography
              variant="subtitle2"
              fontSize="12px"
              fontWeight={400}
              textAlign="left"
              mb="4px"
              sx={{ color: "#959695" }}
            >
              {startDT.getHours().toString().padStart(2, "0")}:
              {startDT.getMinutes().toString().padStart(2, "0")} -{" "}
              {endDT.getHours().toString().padStart(2, "0")}:
              {endDT.getMinutes().toString().padStart(2, "0")}
            </Typography>
          </Stack>
          <Stack direction="row" spacing="8px" alignItems="center">
            <PlaceIcon sx={{ fontSize: 12, color: "#959695" }} />
            <Typography
              variant="subtitle2"
              fontSize="12px"
              fontWeight={400}
              textAlign="left"
              mb="4px"
              sx={{ color: "#959695" }}
            >
              {standName}
            </Typography>
          </Stack>
        </Stack>
      </Stack>
    </Button>
  );
}
