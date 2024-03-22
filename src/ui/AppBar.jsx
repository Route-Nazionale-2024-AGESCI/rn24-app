import * as React from "react";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";

import RnLogo from "./RnLogo";
import NotifyButton from "./NotifyButton";
import UserAvatar from "./UserAvatar";

export default function AppBar() {
  return (
    <Container
      sx={{
        backgroundColor: "transparent",
        //mt: "40px",
        mb: "32px",
        p: 0,
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <RnLogo />
        <Stack direction="row" spacing="16px">
          <NotifyButton />
          <UserAvatar />
        </Stack>
      </Box>
    </Container>
  );
}
