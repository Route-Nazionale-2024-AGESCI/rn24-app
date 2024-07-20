import ButtonBase from "@mui/material/ButtonBase";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import Box from "@mui/material/Box";
import NotListedLocationIcon from "@mui/icons-material/NotListedLocation";
import Typography from "@mui/material/Typography";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Accordion from "@mui/material/Accordion";
import { styled } from "@mui/material/styles";
import LocationCard from "../LocationCard";

const StyledButton = styled(ButtonBase)(({ hasfilters, theme }) => ({
  backgroundColor: hasfilters === "true" ? "#E2DCEA" : "#ffffff",
  color: theme.palette.agesciPurple.main,
  borderColor:
    hasfilters === "true" ? theme.palette.agesciPurple.main : "#E2DCEA",
  padding: "8px",
  marginTop: "12px",
  marginBottom: "12px",
  width: "fit-content",
  paddingRight: hasfilters === "true" ? "36px" : "12px",
  borderRadius: "8px",
}));

const StyledAccordion = styled((props) => (
  <Accordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  "&:not(:last-child)": {
    borderTop: 0,
  },
  "&::before": {
    display: "none",
  },
}));

const FilterAccordion = ({ title, children }) => (
  <StyledAccordion elevation={0} disableGutters square>
    <AccordionSummary
      expandIcon={
        <ExpandMoreIcon
          color="agesciPurple"
          sx={{ backgroundColor: "#E2DCEA", borderRadius: "200px" }}
        />
      }
    >
      <Typography fontSize="18px" fontWeight={600}>
        {title}
      </Typography>
    </AccordionSummary>
    <AccordionDetails>{children}</AccordionDetails>
  </StyledAccordion>
);

export default function FilterLocation({
  open,
  onClose,
  centerMap,
  publicLocations,
  eventLocations,
  tentLocation,
  events,
}) {
  return (
    <SwipeableDrawer disableSwipeToOpen={true} open={open} onClose={onClose}>
      <Box sx={{ width: "300px" }}>
        <Typography
          fontSize="20px"
          fontWeight={900}
          sx={{ ml: "16px", mt: "32px", mb: "24px" }}
        >
          Luoghi
        </Typography>

        <FilterAccordion title="Location degli eventi">
          {Boolean(eventLocations) &&
            eventLocations.map((location, i) => (
              <LocationCard
                key={i}
                location={location}
                onLocationClick={centerMap}
                events={events}
              />
            ))}
        </FilterAccordion>
        <FilterAccordion title="Luoghi d'interesse">
          {Boolean(publicLocations) &&
            publicLocations.map((location, i) => (
              <LocationCard
                key={i}
                location={location}
                onLocationClick={centerMap}
                events={events}
              />
            ))}
        </FilterAccordion>
        <FilterAccordion title="La tua tenda">
          {Boolean(tentLocation) && (
            <LocationCard
              location={tentLocation}
              onLocationClick={centerMap}
              events={events}
            />
          )}
        </FilterAccordion>
      </Box>
    </SwipeableDrawer>
  );
}

export function FilterLocationButton({ onClick }) {
  return (
    <StyledButton variant="contained" onClick={onClick}>
      <NotListedLocationIcon sx={{ mr: "8px" }} />

      <Typography fontSize="14px" fontWeight={600} color={"inherit"}>
        Luoghi
      </Typography>
    </StyledButton>
  );
}
