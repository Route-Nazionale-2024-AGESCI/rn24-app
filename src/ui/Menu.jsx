import * as React from "react";
import Button from "@mui/material/Button";
import MenuIcon from "@mui/icons-material/Menu";

export default function Menu({ ...props }) {
  return (
    <Button
      disableElevation
      sx={{
        borderRadius: "8px",
        p: "10px 12px 10px 12px",
        height: "40px",
        width: "40px",
        minWidth: "40px",
      }}
      color="white"
      variant="contained"
      {...props}
    >
      <MenuIcon color="agesciPurple" />
    </Button>
  );
}
