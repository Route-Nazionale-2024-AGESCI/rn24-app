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
// import NotifyButton from "./NotifyButton";
import Menu from "./Menu";
import { usePages } from "../lib/cacheManager/pages";
import { useAuth } from "../contexts/auth";
import { useRefreshData } from "../lib/dataManager/version";
import { usePersonalPages } from "../contexts/personalPages";

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
  const { personalPages } = usePersonalPages();
  const { user } = useAuth();
  const pages = usePages();

  useRefreshData();

  const filterPages = (pages) => {
    return pages
      .filter(
        (page) =>
          page.show_in_menus &&
          page.slug !== "sicurezza" &&
          page.slug !== "rn24-events-root" &&
          page.slug !== "libretto"
      )
      .map((page) => ({
        ...page,
        children: filterPages(page.children || []),
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
            position: "relative",
          }}
        >
          <Box
            sx={{
              zIndex: 410,
            }}
          >
            <RnLogo />
          </Box>

          <Box
            sx={{
              zIndex: 410,
            }}
          >
            <Stack direction="row" spacing="16px">
              {/* <NotifyButton /> */}
              <Menu
                onClick={() => setOpenDrawer(!openDrawer)}
                aria-label="menu"
              />
            </Stack>
          </Box>
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
                <Typography fontSize="20px" fontWeight={900} marginBottom={2}>
                  Menu
                </Typography>
                {
                  <SimpleTreeView>
                    {filteredPages[0]?.children?.map((page) =>
                      renderTree(page)
                    )}
                  </SimpleTreeView>
                }
                {personalPages.length > 0 && (
                  <>
                    <Box sx={{ height: "24px" }} />
                    <Divider color="#aaaaaa" />
                    <Box sx={{ height: "24px" }} />
                    <Typography
                      fontSize="18px"
                      fontWeight={600}
                      marginBottom={2}
                    >
                      Le mie pagine
                    </Typography>
                    {
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          gap: 1,
                          marginLeft: 1,
                        }}
                      >
                        {personalPages.map((page, i) => (
                          <Typography
                            component={Link}
                            key={i}
                            to={`/pages/${page.uuid}`}
                            onClick={() => setOpenDrawer(false)}
                            style={{
                              textDecoration: "none",
                              color: "inherit",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                            }}
                          >
                            {page.title}
                          </Typography>
                        ))}
                      </Box>
                    }
                  </>
                )}
              </>
            </Box>
            <Divider color="#aaaaaa" />
            <List dense>
              <ListItem>
                <ListItemButton
                  component={Link}
                  to="/profilo"
                  onClick={() => {
                    setOpenDrawer(false);
                  }}
                >
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
              {user.permissions.is_staff && (
                <ListItem>
                  <ListItemButton href="/api/admin/" target="_blank">
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
