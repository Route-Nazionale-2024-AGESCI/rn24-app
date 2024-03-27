import Button from "@mui/material/Button";
import { Link as RouterLink } from "react-router-dom";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import QrCodeIcon from "@mui/icons-material/QrCode";
import MenuBookIcon from "@mui/icons-material/MenuBook";

const style = {
  maxWidth: "400px",
  height: "64px",
  borderRadius: "8px",
  width: "100%",
  textTransform: "none",
  lineHeight: "16px",
  fontSize: "14px",
  fontWeight: "600",
  fontFamily: ["Montserrat"],
  display: "flex",
  justifyContent: "start",
  pl: "16px",
  textAlign: "left",
};

export default function CardButton({ text, icon, bgColor, to = undefined }) {
  const linkProps =
    to === undefined
      ? {}
      : {
          component: RouterLink,
          to,
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
      text="Aggiungi Contatto"
      bgColor="agesciPurple"
      icon={<PersonAddAlt1Icon sx={{ mr: "16px" }} />}
    />
  );
}

export function QrCodeButton() {
  return (
    <CardButton
      text="Scansiona QR Code"
      bgColor="agesciRed"
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
    />
  );
}
