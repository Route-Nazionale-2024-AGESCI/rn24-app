import { useState } from "react";
import { Link } from "react-router-dom";
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
import Typography from "@mui/material/Typography";
import { SimpleTreeView } from "@mui/x-tree-view/SimpleTreeView";
import { TreeItem, treeItemClasses } from "@mui/x-tree-view/TreeItem";

import { styled } from "@mui/material/styles";

import LogoutModal from "./LogoutModal";
import RnLogo from "./RnLogo";
import NotifyButton from "./NotifyButton";
import Menu from "./Menu";
import { usePages } from "../lib/cacheManager/pages";
import { useAuth } from "../contexts/auth";

const StyledTreeItem = styled((props) => <TreeItem {...props} />)(
  ({ theme }) => ({
    [`& .${treeItemClasses.label}`]: {
      display: "flex",
      alignItems: "center",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap",
      overflow: "hidden",
    },
    // arrow Icon on right (default on left)
    [`& .${treeItemClasses.iconContainer}`]: {
      order: 1,
      marginLeft: "auto",
    },
    [`& .${treeItemClasses.content}`]: {
      display: "flex",
      alignItems: "center",
      width: "100%",
    },
  })
);

export default function AppBar() {
  const [openDrawer, setOpenDrawer] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const { user } = useAuth();
  const pages = usePages();

  const filterPages = (pages) => {
    return pages
      .filter(
        (page) =>
          page.show_in_menus &&
          page.slug !== "sicurezza" &&
          page.slug !== "eventi"
      )
      .map((page) => ({
        ...page,
        children: filterPages(page.children || []).filter(
          (child) => child.slug !== "eventi"
        ),
      }));
  };

  const filteredPages = filterPages(pages);

  const renderTree = (nodes) => (
    <StyledTreeItem
      key={nodes.uuid}
      itemId={nodes.uuid}
      label={
        <Typography
          component={Link}
          to={`/pages/${nodes.uuid}`}
          onClick={() => setOpenDrawer(false)}
          style={{
            textDecoration: "none",
            color: "inherit",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {nodes.title}
        </Typography>
      }
    >
      {Array.isArray(nodes.children)
        ? nodes.children.map((node) => renderTree(node))
        : null}
    </StyledTreeItem>
  );

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
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "300px",
              height: "100%",
            }}
          >
            <Box sx={{ flexGrow: 1, paddingY: "32px", paddingX: "24px" }}>
              <>
                <Typography fontSize="20px" fontWeight={900}>
                  Menu
                </Typography>
                {
                  <SimpleTreeView>
                    {filteredPages.map((page) => renderTree(page))}
                  </SimpleTreeView>
                }
              </>
            </Box>
            <Divider />
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
          </Box>
        </Drawer>
      </Container>
      <LogoutModal open={openModal} onClose={() => setOpenModal(false)} />
    </>
  );
}
