import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { ButtonBase, Typography, styled } from "@mui/material";
import PinDropIcon from "@mui/icons-material/PinDrop";
import DirectionsIcon from "@mui/icons-material/Directions";
import { navigationLink } from "./utils";


export function FindInMapButton() {
  return (
    <StyledButton variant="contained">
      <PinDropIcon sx={{ mr: "8px" }} />
      <Typography fontSize="14px" fontWeight={600} color={"inherit"}>
        Vedi su mappa
      </Typography>
    </StyledButton>
  );
}

export function DirectionsButton({ position }) {
  return (
    <>
      <RouterLink
        to={navigationLink(position)}
        style={{ textDecoration: "none", marginTop: 0 }}
      >
        <StyledButton variant="contained">
          <DirectionsIcon sx={{ mr: "8px" }} />
          <Typography fontSize="14px" fontWeight={600} color={"inherit"}>
            Ottieni indicazioni
          </Typography>
        </StyledButton>
      </RouterLink>
    </>
  );
}

const StyledButton = styled(ButtonBase)(({ theme }) => ({
  color: "#ffffff",
  backgroundColor: theme.palette.agesciBlue.main,
  border: "1px solid",
  borderColor: "#E2DCEA",
  padding: "12px",
  marginTop: "12px",
  marginBottom: "12px",
  paddingRight: "12px",
  borderRadius: "8px",
  "& p": {
    margin: 0,
  },
}));
