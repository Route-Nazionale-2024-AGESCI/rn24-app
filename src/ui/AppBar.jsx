import * as React from "react";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

import RnLogo from "./RnLogo";
import NotifyButton from "./NotifyButton";
import UserAvatar from "./UserAvatar";

import { testEvents } from "../lib/api_test";

export default function AppBar() {
  return (
    <Container
      sx={{
        backgroundColor: "transparent",
        mb: "32px",

        p: 0,
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          mx: "24px",
          height: "40px",
        }}
      >
        <RnLogo />
        <Stack direction="row" spacing="16px">
          <Button onClick={() => testEvents()}>Test API</Button>
          <NotifyButton />
          <UserAvatar />
        </Stack>
      </Box>
    </Container>
  );
}
