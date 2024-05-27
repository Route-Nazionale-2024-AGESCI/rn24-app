import ButtonBase from "@mui/material/ButtonBase";
import Drawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import TuneIcon from "@mui/icons-material/Tune";
import Typography from "@mui/material/Typography";
import Badge from "@mui/material/Badge";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Accordion from "@mui/material/Accordion";
import { styled } from "@mui/material/styles";

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

const StyledButton = styled(ButtonBase)(({ hasFilters, theme }) => ({
  backgroundColor: hasFilters ? "#E2DCEA" : "#ffffff",
  color: theme.palette.agesciPurple.main,
  border: "1px solid",
  borderColor: hasFilters ? theme.palette.agesciPurple.main : "#E2DCEA",
  padding: "12px",
  marginTop: "12px",
  marginBottom: "12px",
  paddingRight: hasFilters ? "36px" : "12px",
  borderRadius: "8px",
}));

const countFilters = (filters) => {
  let n = 0;
  // TODO: delete next line
  //n++;
  if (filters.name !== "") n++;
  if (filters.kind !== "") n++;
  if (filters.aperturaIscrizioni !== null) n++;
  if (filters.isRegistered !== null) n++;
  return n;
};

export default function FilterDrawer({ open, onClose }) {
  return (
    <Drawer open={open} onClose={onClose}>
      <Box sx={{ width: "300px" }}></Box>
    </Drawer>
  );
}

export function FilterButton({ onClick }) {
  const { filters } = useFilters();
  const filtersNumber = countFilters(filters);
  return (
    <StyledButton
      hasFilters={filtersNumber > 0}
      variant="contained"
      onClick={onClick}
      disableElevation
    >
      <TuneIcon sx={{ mr: "8px" }} />

      <Typography fontSize="14px" fontWeight={600} color={"inherit"}>
        Filtra
      </Typography>
      <StyledBadge badgeContent={filtersNumber} color="agesciPurple.main" />
    </StyledButton>
  );
}
