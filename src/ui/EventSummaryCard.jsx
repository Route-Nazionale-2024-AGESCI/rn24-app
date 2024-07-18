import { Link as RouterLink } from "react-router-dom";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import PlaceIcon from "@mui/icons-material/Place";

import { italianMonth } from "../lib/italianDate";
import getEventColor from "../lib/eventColor";

export default function EventSummaryCard({ 
  event, 
  location,
  small = false,
  showLocation = true
 }) {
  const startDT = new Date(event.starts_at);
  const endDT = new Date(event.ends_at);
  const title = event.name;
  const standName = location?.name || "Luogo non definito";
  return (
    <Button
      sx={{
        maxWidth: `${small ? "200px" : "300px"}`,
        width: `${small ? "200px" : "300px"}`,
        height: `${small ? "68px" : "96px"}`,
        borderRadius: "8px",
        textTransform: "none",
        p: "12px",
        justifyContent: "start",
        flex: "0 0 auto",
        backgroundColor: `${small ? getEventColor(event.kind).bg : "none"}`
      }}
      className="event-summary-card-container"
      component={RouterLink}
      to={`/eventi/${event.uuid}`}
      variant="contained"
      disableElevation
      color="white"
    >
      <Stack direction="row" spacing="16px">
        <Box
          sx={{
            bgcolor: `${small ? "none" : getEventColor(event.kind).bg}`, //"#E2DCEA",
            width: `${small ? "34px" : "56px"}`,
            height: `${small ? "68px" : "72px"}`,
            borderRadius: "8px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            textAlign: "center",
          }}
        >
          <Typography
            variant="subtitle1"
            fontSize="20px"
            fontWeight={600}
            sx={{
              color: getEventColor(event.kind).main, //"#6D5095"
            }}
          >
            {startDT.getDate().toString().padStart(2, "0")}
          </Typography>
          <Typography
            variant="subtitle2"
            fontSize="14px"
            fontWeight={600}
            textTransform="uppercase"
            sx={{
              color: getEventColor(event.kind).main,
              //"#6D5095"
            }}
          >
            {italianMonth[startDT.getMonth()].substring(0, 3)}
          </Typography>
        </Box>
        <Stack direction="column" maxWidth="204px" alignItems="flex-start" justifyContent="center">
          <Typography
            variant="subtitle1"
            fontSize="14px"
            lineHeight="15px"
            fontWeight={600}
            textAlign="left"
            mb={`${small ? "0" : "8px"}`}
            //Limitare il numero di righe visualizzate a 2, per titoli troppo lunghi
            sx={{
              display: "-webkit-box",
              overflow: "hidden",
              WebkitBoxOrient: "vertical",
              WebkitLineClamp: 2,
              color: "#2B2D2B"
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
          {showLocation && <Stack direction="row" spacing="8px" alignItems="center">
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
          </Stack>}
        </Stack>
      </Stack>
    </Button>
  );
}
