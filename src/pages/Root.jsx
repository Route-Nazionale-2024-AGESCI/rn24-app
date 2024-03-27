import { Outlet } from "react-router-dom";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";

import AppBar from "../ui/AppBar";
import NavBar from "../ui/NavBar";
import FloatingActionButton from "../ui/FloatingActionButton";

export default function Root() {
  return (
    <>
      <Box sx={{ mt: "40px", mx: "24px", mb: "180px" }}>
        <AppBar />
        <Container>
          <Outlet />
          <FloatingActionButton />
        </Container>
      </Box>
      <NavBar />
    </>
  );
}
