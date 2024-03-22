import * as React from "react";
import Avatar from "@mui/material/Avatar";
import { orange } from "@mui/material/colors";

export default function UserAvatar() {
  return (
    <Avatar
      src="Profilo.jpg"
      sx={{
        bgcolor: orange[300],
        height: 36,
        width: 36,
        border: "2px solid white",
      }}
    ></Avatar>
  );
}
