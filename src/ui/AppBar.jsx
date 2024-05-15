import { useState } from "react";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";
import SettingsApplicationsIcon from "@mui/icons-material/SettingsApplications";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

import LogoutModal from "./LogoutModal";
import RnLogo from "./RnLogo";
import NotifyButton from "./NotifyButton";
import Menu from "./Menu";

import { useAuth } from "../contexts/auth";

export default function AppBar() {
  const [openDrawer, setOpenDrawer] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const { user } = useAuth();
  return (
    <>
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
            <NotifyButton />
            <Menu onClick={() => setOpenDrawer(!openDrawer)} />
          </Stack>
        </Box>
        <Drawer
          open={openDrawer}
          onClose={() => setOpenDrawer(false)}
          PaperProps={{ sx: { backgroundColor: "#2B2D2B", color: "#ffffff" } }}
        >
          <List dense>
            <ListItem>
              <ListItemButton>
                <ListItemIcon>
                  <PersonIcon color="white" />
                </ListItemIcon>
                <ListItemText
                  primary="Profilo"
                  primaryTypographyProps={{
                    fontSize: "16px",
                    fontWeight: 600,
                  }}
                />
              </ListItemButton>
            </ListItem>
            {user.is_staff && (
              <ListItem>
                <ListItemButton href="/admin">
                  <ListItemIcon>
                    <SettingsApplicationsIcon color="white" />
                  </ListItemIcon>
                  <ListItemText
                    primary="Amministratore"
                    primaryTypographyProps={{
                      fontSize: "16px",
                      fontWeight: 600,
                    }}
                  />
                </ListItemButton>
              </ListItem>
            )}
            <ListItem>
              <ListItemButton onClick={() => setOpenModal(true)}>
                <ListItemIcon>
                  <LogoutIcon color="agesciRed" />
                </ListItemIcon>
                <ListItemText
                  primary="Logout"
                  primaryTypographyProps={{
                    color: "agesciRed.main",
                    fontSize: "16px",
                    fontWeight: 600,
                  }}
                />
              </ListItemButton>
            </ListItem>
          </List>
        </Drawer>
      </Container>
      <LogoutModal open={openModal} onClose={() => setOpenModal(false)} />
    </>
  );
}
