import { Outlet } from "react-router-dom";
import Box from "@mui/material/Box";

import BackToOtherMethods from "../../ui/BackToOtherMethods";

const ColorLayout = ({ back, color }) => (
  <Box
    sx={{
      minHeight: "100vh",
      mb: "-80px",
      display: "flex",
      flexDirection: "column",
      bgcolor: color,
    }}
  >
    <BackToOtherMethods back={back} />
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

export function PurpleLayout({ back }) {
  return <ColorLayout back={back} color="agesciPurple.main" />;
}

export function RedLayout({ back }) {
  return <ColorLayout back={back} color="agesciRed.main" />;
}

export function GreenLayout({ back }) {
  return <ColorLayout back={back} color="agesciGreen.main" />;
}
