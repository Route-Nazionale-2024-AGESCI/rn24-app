import { Outlet } from "react-router-dom";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";

import AppBar from "../../ui/AppBar";

export default function AppBarLayout() {
  return (
    <Box sx={{ mt: "40px" }}>
      <AppBar />
      <Container sx={{ p: 0 }}>
        <Outlet />
      </Container>
    </Box>
  );
}
