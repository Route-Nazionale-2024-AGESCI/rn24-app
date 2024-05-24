import { Link as RouterLink, useLoaderData } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";

import PlaceIcon from "@mui/icons-material/Place";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

import WhitePaper from "../ui/WhitePaper";

import { getTraccia } from "../lib/cacheManager/events";
import { getPage } from "../lib/cacheManager/pages";
import { getLocation } from "../lib/cacheManager/locations";

export async function loader() {
  const traccia = await getTraccia();
  const description = await getPage(traccia?.page);
  const location = await getLocation(traccia?.location);
  return { traccia, description, location };
}

export default function Tracce() {
  const { traccia, description, location } = useLoaderData();
  const startDT = new Date(traccia.starts_at);
  const endDT = new Date(traccia.ends_at);
  return (
    <>
      <Typography
        fontSize="25px"
        fontWeight={900}
        sx={{ ml: "24px", height: "40px" }}
      >
        Tracce
      </Typography>
      <WhitePaper>
        <Box
          sx={{
            //mt: "40px",
            mx: "24px",
          }}
        >
          <Typography fontSize="14px" fontWeight={800} sx={{ mb: "12px" }}>
            Dettagli del Servizio
          </Typography>

          {description && description.body && (
            <Box dangerouslySetInnerHTML={{ __html: description.body }} />
          )}
          <Box sx={{ height: "32px" }} />
          <Typography fontSize="14px" fontWeight={800} sx={{ mb: "12px" }}>
            Info Logistiche
          </Typography>
          <Box
            sx={{ p: "12px", border: "1px solid #E2DCEA", borderRadius: "8px" }}
          >
            {location && (
              <RouterLink
                to={`/mappa/?location=${location.uuid}`}
                style={{ textDecoration: "none" }}
              >
                <Stack direction="row" spacing="8px" alignItems="center">
                  <PlaceIcon
                    sx={{ fontSize: 14, color: "agesciPurple.main" }}
                  />
                  <Typography
                    variant="subtitle2"
                    fontSize="14px"
                    fontWeight={600}
                    textAlign="left"
                    mb="4px"
                    sx={{ color: "agesciPurple.main" }}
                  >
                    {location.name || "Indirizzo del servizio"}
                  </Typography>
                </Stack>
              </RouterLink>
            )}
            <Stack direction="row" spacing="8px" alignItems="center">
              <AccessTimeIcon sx={{ fontSize: 14, color: "#959695" }} />
              <Typography
                variant="subtitle2"
                fontSize="14px"
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
          </Box>
        </Box>
      </WhitePaper>
    </>
  );
}
