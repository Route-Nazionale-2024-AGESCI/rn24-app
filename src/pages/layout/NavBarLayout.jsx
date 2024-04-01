import { Outlet } from "react-router-dom";
import Box from "@mui/material/Box";

import NavBar from "../../ui/NavBar";

export default function NavBarLayout() {
  return (
    <>
      <Box sx={{ mb: "80px" }}>
        <Outlet />
      </Box>
      <NavBar />
    </>
  );
}
