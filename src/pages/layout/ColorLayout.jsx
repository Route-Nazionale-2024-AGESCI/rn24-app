import { Outlet } from "react-router-dom";
import Box from "@mui/material/Box";

import BackToOtherMethods from "../../ui/BackToOtherMethods";

const ColorLayout = ({ back, color, backText }) => (
  <Box
    sx={{
      minHeight: "100vh",
      mb: "-80px",
      display: "flex",
      flexDirection: "column",
      bgcolor: color,
    }}
  >
    <BackToOtherMethods back={back} backText={backText} />
    <Box
      sx={{
        textAlign: "center",
        flexGrow: "1",
        display: "flex",
        flexDirection: "column",
        justifyContent: "start",
        alignItems: "center",
        paddingTop: "40px",
      }}
    >
      <Outlet />
    </Box>
  </Box>
);

export function PurpleLayout({ back, backText }) {
  return (
    <ColorLayout back={back} backText={backText} color="agesciPurple.main" />
  );
}

export function RedLayout({ back, backText }) {
  return <ColorLayout back={back} backText={backText} color="agesciRed.main" />;
}

export function GreenLayout({ back, backText }) {
  return (
    <ColorLayout back={back} backText={backText} color="agesciGreen.main" />
  );
}
