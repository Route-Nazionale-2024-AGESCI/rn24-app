import ButtonBase from "@mui/material/ButtonBase";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Accordion from "@mui/material/Accordion";
import { styled } from "@mui/material/styles";
// import LocationCard from "../LocationCard";
import TuneIcon from "@mui/icons-material/Tune";

import { useFilters } from "../../contexts/locationFilter"
import { useMemo, useState } from "react";
import { alpha, Badge, FormControl, FormControlLabel, InputBase, MenuItem, Select, Switch } from "@mui/material";
import AccessButton from "../AccessButton";

const StyledButton = styled(ButtonBase)(({ hasfilters, theme }) => ({
  backgroundColor: "#ffffff",
  color: hasfilters === "true" ? theme.palette.agesciPurple.main : "#000000",
  border:
    hasfilters === "true" ? "2px solid "+theme.palette.agesciPurple.main : "none",
  padding: hasfilters === "true" ? "6px" : "8px",
  marginTop: "12px",
  marginBottom: "12px",
  width: "fit-content",
  paddingRight: hasfilters === "true" ? "36px" : "12px",
  borderRadius: "8px",
}));

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: -16,
    top: 0,
    backgroundColor: theme.palette.agesciPurple.main,
    padding: "0 4px",
    color: "#ffffff",
  },
}));

const StyledTextField = styled(InputBase)(({ theme }) => ({
  "label + p": {
    color: "#3333dd",
  },
  "& .MuiInputBase-input": {
    borderRadius: 8,
    backgroundColor: "#ffffff",
    border: "1px solid",
    borderColor: theme.palette.agesciPurple.main,
    padding: "12px 16px",
    fontSize: "14px",
    transition: theme.transitions.create([
      "border-color",
      "background-color",
      "box-shadow",
    ]),
    "&:focus": {
      boxShadow: `${alpha(theme.palette.agesciPurple.main, 0.25)} 0 0 0 0.1rem`,
    },
  },
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

// const FilterAccordion = ({ title, children }) => (
//   <StyledAccordion elevation={0} disableGutters square>
//     <AccordionSummary
//       expandIcon={
//         <ExpandMoreIcon
//           color="agesciPurple"
//           sx={{ backgroundColor: "#E2DCEA", borderRadius: "200px" }}
//         />
//       }
//     >
//       <Typography fontSize="18px" fontWeight={600}>
//         {title}
//       </Typography>
//     </AccordionSummary>
//     <AccordionDetails>{children}</AccordionDetails>
//   </StyledAccordion>
// );

const countFilters = (filters) => {
  let n = 0;
  if (filters.category !== "") n++;
  return n;
};

export default function FilterLocation({
  open,
  onClose,
  centerMap,
  publicLocations,
  eventLocations,
  tentLocation,
  events,
}) {
  const { filters, updateFilter } = useFilters();
  const [category, setCategory] = useState(filters.category);
  const [ignoreDistrict, setIgnoreDistrict] = useState(filters.ignoreDistrict);

  const categories = useMemo(() => {
    return [...new Set(publicLocations.filter(loc => loc.coords?.coordinates).map(obj => obj.category))].sort()
  }, [publicLocations]);

  return (
    <SwipeableDrawer disableSwipeToOpen={true} open={open} onClose={onClose}>
      <Box sx={{ width: "266px", px: "16px" }}>
        <Typography
          fontSize="20px"
          fontWeight={900}
          sx={{ ml: "16px", mt: "32px", mb: "24px" }}
        >
          Filtri
        </Typography>
        <FormControl variant="standard" sx={{ width: "100%" }}>
          <Typography
            fontSize="16px"
            fontWeight={700}
            my="12px"
            sx={{ color: "#2B2D2B" }}
          >
            Categoria
          </Typography>
          <Select
            input={<StyledTextField sx={{ width: "100%" }} />}
            value={category === "" ? "All" : category}
            onChange={(ev) => {
              let v = ev.target.value;
              v = v === "All" ? "" : v;
              setCategory(v);
            }}
          >
            <MenuItem value="All">Tutti</MenuItem>
            {categories.map((c, i) => (
              <MenuItem value={c} key={i}>
                {c}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* <FilterAccordion title="Location degli eventi">
          {Boolean(eventLocations && eventLocations.length) ? (
            eventLocations.map((location, i) => (
              <LocationCard
                key={i}
                location={location}
                onLocationClick={centerMap}
                events={events}
              />
            ))
          ) : (
            <Typography fontSize="16px" mt="12px" mb="24px">
              Troverai qui le location degli eventi a cui sei iscritto
            </Typography>
          )}
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
          {Boolean(tentLocation) ? (
            <LocationCard
              location={tentLocation}
              onLocationClick={centerMap}
              events={events}
            />
          ) : (
            <Typography fontSize="16px" mt="12px" mb="24px">
              Troverai qui la location della tua tenda
            </Typography>
          )}
        </FilterAccordion> */}
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          mt: "48px",
          px: "16px",
        }}
      >
        <AccessButton
          sx={{ m: 0, mb: "16px" }}
          onClick={(ev) => {
            updateFilter("category", category);
            onClose();
          }}
        >
          <Typography fontSize="16px" fontWeight={600}>
            Applica Filtri
          </Typography>
        </AccessButton>

        <AccessButton
          sx={{ m: 0, borderColor: "agesciRed.main" }}
          onClick={(ev) => {
            updateFilter("category", "");
            setCategory("");
            onClose();
          }}
        >
          <Typography fontSize="16px" fontWeight={600} color="agesciRed.main">
            Elimina Filtri
          </Typography>
        </AccessButton>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          mt: "auto",
          p: "16px",
          mb: "24px",
          maxWidth: "266px",
        }}
      >
        <FormControlLabel
          sx={{
            fontSize: "10px",
            ml: "0px"
          }}
          control={
            <Switch
              checked={!ignoreDistrict}
              onChange={() => {
                setIgnoreDistrict(!ignoreDistrict)
                updateFilter("ignoreDistrict", !ignoreDistrict);
              }}
              inputProps={{ "aria-label": "controlled" }}
              // size="small"
            />
          }
          label={
            <Typography sx={{  fontSize: "14px", }}>
              Nascondi luoghi degli altri sottocampi (consigliato)
            </Typography>
          }
          labelPlacement="start"
        />
      </Box>
    </SwipeableDrawer>
  );
}

export function FilterLocationButton({ onClick }) {
  const { filters } = useFilters();
  const filtersNumber = countFilters(filters);
  return (
    <StyledButton
      hasfilters={filtersNumber > 0 ? "true" : "false"}
      variant="contained"
      onClick={onClick}
    >
      <TuneIcon sx={{ mr: "8px" }} />

      <Typography fontSize="14px" fontWeight={600} color={"inherit"}>
        Filtra
      </Typography>
      <StyledBadge badgeContent={filtersNumber} color="agesciPurple.main" />
    </StyledButton>
  );
}
