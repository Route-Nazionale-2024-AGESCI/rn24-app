import { Outlet } from "react-router-dom";
import Box from "@mui/material/Box";

import FloatingActionButton from "../../ui/FloatingActionButton";

export default function FabLayout() {
  return (
    <>
      <Outlet />
      <Box sx={{ height: "100px" }} />
      <FloatingActionButton />
    </>
  );
}
