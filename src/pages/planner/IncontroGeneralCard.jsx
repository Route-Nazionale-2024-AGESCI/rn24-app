import { Link as RouterLink } from "react-router-dom";

import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import Diversity1RoundedIcon from "@mui/icons-material/Diversity1Rounded";
import HexagonRoundedIcon from "@mui/icons-material/HexagonRounded"; // incontri
import PlaceIcon from "@mui/icons-material/Place";

import { useLocations } from "../../lib/cacheManager/locations";



export default function IncontroGeneralCard({
  title,
  happinessPath,
  date,
  idAccadimento,
  eventUuid,
  locationId
}) {
  const locations = useLocations();
  const location = locations.find((loc) => loc.uuid === locationId);
  return (
    <Button
      component={RouterLink}
      to={
        idAccadimento !== ""
          ? `/progetta-route/incontri/${idAccadimento}`
          : `/eventi/${eventUuid}`
      }
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
        }}
      >
        <Typography
          fontSize="14px"
          fontWeight={600}
          textTransform="capitalize"
          color="agesciPurple.main"
        >
          Incontri
        </Typography>
      </Stack>
      <Stack direction={"row"} gap="10px" mt="16px" alignItems={"center"}>
        <Box
          sx={{
            backgroundColor: "#E2DCEA",
            height: "32px",
            width: "32px",
            minWidth: "32px",
            borderRadius: "8px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color: "agesciPurple.main",
          }}
        >
          <HexagonRoundedIcon sx={{ fontSize: "12px" }} />
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
          {title}
        </Typography>
      </Stack>

      <Stack direction="row" spacing="8px" alignItems="center" mt="12px">
        <CalendarMonthIcon sx={{ fontSize: 14, color: "#666A66" }} />
        <Typography
          variant="subtitle2"
          fontSize="14px"
          fontWeight={400}
          textAlign="left"
          mb="4px"
          sx={{ color: "#666A66" }}
        >
          {date}
        </Typography>
      </Stack>
      <Stack direction="row" spacing="8px" alignItems="center" mt="12px">
        <PlaceIcon sx={{ fontSize: 14, color: "#666A66" }} />
        <Typography
          variant="subtitle2"
          fontSize="14px"
          fontWeight={400}
          textAlign="left"
          mb="4px"
          sx={{ color: "#666A66" }}
        >
          {location?.name}
        </Typography>
      </Stack>
      {happinessPath !== null && (
        <Stack direction="row" spacing="8px" alignItems="center">
          <Diversity1RoundedIcon sx={{ fontSize: 14, color: "#666A66" }} />
          <Typography
            variant="subtitle2"
            fontSize="14px"
            fontWeight={400}
            textAlign="left"
            mb="4px"
            sx={{ color: "#666A66" }}
          >
            {happinessPath}
          </Typography>
        </Stack>
      )}
    </Button>
  );
}
