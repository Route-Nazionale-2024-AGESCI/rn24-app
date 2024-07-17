import { Link as RouterLink } from "react-router-dom";

import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import EventSummaryCard from "./EventSummaryCard";
import { useMemo } from "react";

export default function LocationCard({
  location,
  onLocationClick = () => null,
  showBorder = true,
  disabled = false,
  events,
}) {
  const icon = location.icon ? location.icon : "location-dot";
  const locationEvents = useMemo(() => {
    if (!events) return null;
    return events
      .filter((ev) => location.uuid === ev.location)
      .filter((ev) => {
        const endDt = new Date(ev.ends_at);
        const now = new Date();
        return endDt >= now;
      });
  }, [events, location]);
  const buildEventCards = (events) => {
    return events.map((ev, index) => (
      <EventSummaryCard
        event={ev}
        location={location}
        key={index}
        small
        showLocation={false}
      />
    ));
  };

  return (
    <Button
      disabled={disabled}
      component={RouterLink}
      onClick={() => {
        onLocationClick(location);
      }}
      sx={{
        border: `${showBorder ? "1px solid #E2DCEA" : "none"}`,
        borderRadius: "8px",
        paddingY: "12px",
        paddingX: `${showBorder ? "12px" : "0"}`,
        display: "flex",
        flexDirection: "column",
        alignItems: "start",
        marginY: "12px",
        textTransform: "none",
      }}
      // color={location.color}
    >
      <Stack direction={"row"} gap="10px" mb="8px" alignItems={"center"}>
        <Box
          sx={{
            backgroundColor: `${location.color}20`,
            height: "32px",
            width: "32px",
            transform: "rotate(-45deg)",
            borderRadius: "50% 50% 50% 8%",
            position: "absolute",
          }}
        ></Box>
        <Box
          sx={{
            height: "32px",
            width: "32px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {" "}
          <i>
            <FontAwesomeIcon
              icon={["fas", icon]}
              style={{ color: location.color }}
            />
          </i>
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
          {location.name}
        </Typography>
      </Stack>

      <Stack direction="row" spacing="8px" alignItems="center">
        <Typography
          variant="subtitle2"
          fontSize="14px"
          fontWeight={400}
          textAlign="left"
          mb="4px"
          sx={{ color: "#666A66" }}
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
              color={location.color}
            >
              {location.category}
            </Typography>
          </Stack>
          {location.description}
        </Typography>
      </Stack>
      {Boolean(locationEvents && locationEvents.length) && (
        <Box
          sx={{
            pt: "8px",
            display: "flex",
            flexDirection: "row",
            overflowX: "scroll",
            gap: "8px",
            maxWidth: "100%",
          }}
        >
          {buildEventCards(locationEvents)}
        </Box>
      )}
    </Button>
  );
}
