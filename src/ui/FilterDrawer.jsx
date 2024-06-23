import { useState } from "react";
import ButtonBase from "@mui/material/ButtonBase";
import InputBase from "@mui/material/InputBase";
import Drawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import TuneIcon from "@mui/icons-material/Tune";
import Typography from "@mui/material/Typography";
import Badge from "@mui/material/Badge";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Accordion from "@mui/material/Accordion";
// import Radio from "@mui/material/Radio";
// import RadioGroup from "@mui/material/RadioGroup";
// import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import AccessButton from "./AccessButton";
import { styled, alpha } from "@mui/material/styles";

import { useFilters } from "../contexts/filter";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: -16,
    top: 0,
    backgroundColor: theme.palette.agesciPurple.main,
    padding: "0 4px",
    color: "#ffffff",
  },
}));

const StyledButton = styled(ButtonBase)(({ hasfilters, theme }) => ({
  backgroundColor: hasfilters === "true" ? "#E2DCEA" : "#ffffff",
  color: theme.palette.agesciPurple.main,
  border: "1px solid",
  borderColor:
    hasfilters === "true" ? theme.palette.agesciPurple.main : "#E2DCEA",
  padding: "12px",
  marginTop: "12px",
  marginBottom: "12px",
  paddingRight: hasfilters === "true" ? "36px" : "12px",
  borderRadius: "8px",
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

const countFilters = (filters) => {
  let n = 0;
  if (filters.name !== "") n++;
  if (filters.kind !== "") n++;
  //if (filters.aperturaIscrizioni !== null) n++;
  //if (filters.isRegistered !== null) n++;
  return n;
};

export default function FilterDrawer({ open, onClose }) {
  const { filters, updateFilter } = useFilters();
  const [name, setName] = useState(filters.name);
  const [kind, setKind] = useState(filters.kind);
  // const [aperturaIscrizioni, setAperturaIscrizioni] = useState(
  //   filters.aperturaIscrizioni
  // );
  // const [isRegistered, setIsRegistered] = useState(filters.isRegistered);

  return (
    <Drawer open={open} onClose={onClose}>
      <Box sx={{ width: "300px" }}>
        <Typography
          fontSize="20px"
          fontWeight={900}
          sx={{ ml: "16px", mt: "32px", mb: "24px" }}
        >
          Filtri
        </Typography>
        <FilterAccordion title="Nome Evento">
          <StyledTextField
            placeholder="Inserisci Nome Evento"
            color="agesciPurple"
            value={name}
            onChange={(ev) => setName(ev.target.value)}
            sx={{ width: "100%" }}
          />
        </FilterAccordion>
        <FilterAccordion title="Tipologia Evento">
          <FormControl variant="standard" sx={{ width: "100%" }}>
            <Select
              input={<StyledTextField sx={{ width: "100%" }} />}
              value={kind === "" ? "All" : kind}
              onChange={(ev) => {
                let v = ev.target.value;
                v = v === "All" ? "" : v;
                setKind(v);
              }}
            >
              <MenuItem value="All">Tutti</MenuItem>
              <MenuItem value="SGUARDI">Sguardi</MenuItem>
              <MenuItem value="INCONTRI">Incontri</MenuItem>
              <MenuItem value="CONFRONTI">Confronti</MenuItem>
              <MenuItem value="TRACCE">Tracce</MenuItem>
              <MenuItem value="PASTI">Pasti</MenuItem>
              <MenuItem value="DOCCIA">Doccia</MenuItem>
              {/* <MenuItem value="LOGISTICO">Logistico</MenuItem> */}
              <MenuItem value="ALTRO">Altro</MenuItem>
            </Select>
          </FormControl>
        </FilterAccordion>
        {/* <FilterAccordion title="Stato Iscrizione">
          <FormControl>
            <RadioGroup
              row
              aria-labelledby="opzioni-stato-iscrizione"
              name="opzioni-stato-iscrizione"
              value={isRegistered === null ? "all" : String(isRegistered)}
              onChange={(ev) => {
                let v = ev.target.value;
                v = v === "all" ? null : v === "true";
                setIsRegistered(v);
              }}
            >
              <FormControlLabel
                value="true"
                control={<Radio color="agesciPurple" />}
                label="Iscritto"
              />
              <FormControlLabel
                value="false"
                control={<Radio color="agesciPurple" />}
                label="Non iscritto"
              />
              <FormControlLabel
                value="all"
                control={<Radio color="agesciPurple" />}
                label="Tutti"
              />
            </RadioGroup>
          </FormControl>
        </FilterAccordion>
        <FilterAccordion title="Apertura Iscrizioni">
          <FormControl>
            <RadioGroup
              row
              aria-labelledby="opzioni-apertura-iscrizione"
              name="opzioni-apertura-iscrizione"
              value={aperturaIscrizioni === null ? "all" : aperturaIscrizioni}
              onChange={(ev) => {
                let v = ev.target.value;
                v = v === "all" ? null : v === "true";
                setAperturaIscrizioni(v);
              }}
            >
              <FormControlLabel
                value="true"
                control={<Radio color="agesciPurple" />}
                label="Aperte"
              />
              <FormControlLabel
                value="false"
                control={<Radio color="agesciPurple" />}
                label="Chiuse"
              />
              <FormControlLabel
                value="all"
                control={<Radio color="agesciPurple" />}
                label="Tutte"
              />
            </RadioGroup>
          </FormControl>
        </FilterAccordion> */}
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
              updateFilter("name", name);
              updateFilter("kind", kind);
              //updateFilter("aperturaIscrizioni", aperturaIscrizioni);
              //updateFilter("isRegistered", isRegistered);
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
              updateFilter("name", "");
              updateFilter("kind", "");
              //updateFilter("aperturaIscrizioni", null);
              //updateFilter("isRegistered", null);
              setName("");
              setKind("");
              //setAperturaIscrizioni(null);
              //setIsRegistered(null);
              onClose();
            }}
          >
            <Typography fontSize="16px" fontWeight={600} color="agesciRed.main">
              Elimina Filtri
            </Typography>
          </AccessButton>
        </Box>
      </Box>
    </Drawer>
  );
}

export function FilterButton({ onClick }) {
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
