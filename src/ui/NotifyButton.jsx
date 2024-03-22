import * as React from "react";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Button from "@mui/material/Button";
import Badge from "@mui/material/Badge";

export default function NotifyButton() {
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
    >
      <Badge
        color="agesciRed"
        badgeContent=" "
        variant="dot"
        overlap="circular"
      >
        <NotificationsIcon color="agesciPurple" />
      </Badge>
    </Button>
  );
}
