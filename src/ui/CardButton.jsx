import Button from "@mui/material/Button";
import { Link as RouterLink } from "react-router-dom";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import QrCodeIcon from "@mui/icons-material/QrCode";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import RouteIcon from "@mui/icons-material/Route";

export default function CardButton({ text, icon, bgColor, to = undefined }) {
  const linkProps =
    to === undefined
      ? {}
      : {
          component: RouterLink,
          to,
        };

  const style = {
    maxWidth: "400px",
    height: "64px",
    borderRadius: "8px",
    width: "100%",
    textTransform: "none",
    lineHeight: "16px",
    fontSize: "14px",
    fontWeight: "600",
    display: "flex",
    justifyContent: "start",
    pl: "16px",
    textAlign: "left",
    color: "#ffffff",
  };
  return (
    <Button
      sx={style}
      disableElevation
      color={bgColor}
      variant="contained"
      startIcon={icon}
      {...linkProps}
    >
      {text}
    </Button>
  );
}

export function AddContactButton() {
  return (
    <CardButton
      text="Contatti"
      bgColor="agesciPurple"
      to="/contatti"
      icon={<PersonAddAlt1Icon sx={{ mr: "16px" }} />}
    />
  );
}

export function QrCodeButton() {
  return (
    <CardButton
      text="Scansiona QR Code"
      bgColor="agesciRed"
      to="/ricercaContenuto"
      icon={<QrCodeIcon sx={{ mr: "8px" }} />}
    />
  );
}

export function BookletButton() {
  return (
    <CardButton
      text="Consulta il Libretto"
      bgColor="agesciGreen"
      icon={<MenuBookIcon sx={{ mr: "8px" }} />}
      to="/libretto"
    />
  );
}

export function RoutePlannerButton() {
  return (
    <CardButton
      text="Progetta la Tua Route"
      bgColor="agesciYellow"
      icon={<RouteIcon sx={{ mr: "8px" }} />}
      to="/progetta-route"
    />
  );
}
