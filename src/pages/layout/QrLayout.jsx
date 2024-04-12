import { Outlet } from "react-router-dom";
import Box from "@mui/material/Box";

import BackToOtherMethods from "../../ui/BackToOtherMethods";

export default function QrLayout({ back }) {
  return (
    <Box
      sx={{
        height: "100vh",
        mb: "-80px",
        display: "flex",
        flexDirection: "column",
        bgcolor: "agesciRed.main",
      }}
    >
      <BackToOtherMethods back={back} />
      <Box
        sx={{
          textAlign: "center",
          flexGrow: "1",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
}
