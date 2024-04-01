import { Outlet } from "react-router-dom";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";

import RnFullLogo from "../../ui/RnFullLogo";

export default function AccessLayout() {
  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <RnFullLogo />
      <Box sx={{ height: "56px" }} />
      <Outlet />
    </Container>
  );
}
