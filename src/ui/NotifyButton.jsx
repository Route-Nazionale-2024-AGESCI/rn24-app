import { useState, useEffect } from "react";
import { useRevalidator } from "react-router-dom";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Button from "@mui/material/Button";
import Badge from "@mui/material/Badge";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import DownloadIcon from "@mui/icons-material/Download";
import Alert from "@mui/material/Alert";
import Fade from "@mui/material/Fade";

import { useVersions, getLocalVersions } from "../lib/dataManager/version";
import { refreshEventList } from "../lib/cacheManager/events";
import { refreshLocationList } from "../lib/cacheManager/locations";
import { refreshPages } from "../lib/cacheManager/pages";

const isBefore = (date1, date2) => {
  if (new Date(date1) < new Date(date2)) return true;
  return false;
};

export default function NotifyButton() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [alert, setAlert] = useState(null); // 'success', 'error'
  const revalidator = useRevalidator();
  // could be undefined
  const { eventsVersion, pagesVersion, locationsVersion } = useVersions();
  const { localEventsVersion, localPagesVersion, localLocationsVersion } =
    getLocalVersions();
  const dataNeedRefresh = (() => {
    if (
      eventsVersion === undefined ||
      pagesVersion === undefined ||
      locationsVersion === undefined
    )
      return false;
    if (
      localEventsVersion === null ||
      localPagesVersion === null ||
      localLocationsVersion === null
    )
      return false;
    return (
      isBefore(localEventsVersion, eventsVersion) ||
      isBefore(localPagesVersion, pagesVersion) ||
      isBefore(localLocationsVersion, locationsVersion)
    );
  })();

  useEffect(() => {
    if (alert !== null) {
      const timer = setTimeout(() => {
        setAlert(null);
      }, 10000);
      return () => clearTimeout(timer);
    }
  }, [alert]);
  return (
    <>
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
        onClick={(event) => setAnchorEl(event.currentTarget)}
      >
        {dataNeedRefresh ? (
          <Badge
            color="agesciRed"
            badgeContent=" "
            variant="dot"
            overlap="circular"
          >
            <NotificationsIcon color="agesciPurple" />
          </Badge>
        ) : (
          <NotificationsIcon color="agesciPurple" />
        )}
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
        slotProps={{ paper: { sx: { mt: 1 }, elevation: 3 } }}
      >
        {dataNeedRefresh ? (
          <MenuItem
            onClick={() => {
              // download fresh data
              const promises = [];
              isBefore(localEventsVersion, eventsVersion) &&
                promises.push(refreshEventList());
              isBefore(localPagesVersion, pagesVersion) &&
                promises.push(refreshPages());
              isBefore(localLocationsVersion, locationsVersion) &&
                promises.push(refreshLocationList());

              Promise.all(promises)
                .then(() => {
                  // Alert positivo
                  setAlert("success");
                  revalidator.revalidate();
                })
                .catch((error) => {
                  // Alert negativo
                  console.error(error);
                  setAlert("error");
                });
              setAnchorEl(null);
            }}
          >
            <DownloadIcon />
            <Typography variant="body2" sx={{ marginLeft: "8px" }}>
              Scarica gli aggiornamenti
            </Typography>
          </MenuItem>
        ) : (
          <MenuItem disabled>
            <Typography variant="body2" sx={{ marginLeft: "8px" }}>
              Nulla di nuovo per ora...
            </Typography>
          </MenuItem>
        )}
      </Menu>

      <Fade in={alert === "success"}>
        <Alert
          severity={"success"}
          onClose={() => {
            setAlert(null);
          }}
          sx={{
            width: "80%",
            maxWidth: "400px",
            position: "fixed",
            bottom: "100px",
            left: "50%",
            translate: `calc(-50% - 16px)`,
            zIndex: "2000",
          }}
        >
          Aggiornamento effettuato con successo
        </Alert>
      </Fade>
      <Fade in={alert === "error"}>
        <Alert
          severity={"error"}
          onClose={() => {
            setAlert(null);
          }}
          sx={{
            width: "80%",
            maxWidth: "400px",
            position: "fixed",
            bottom: "100px",
            left: "50%",
            translate: `calc(-50% - 16px)`,
            zIndex: "2000",
          }}
        >
          Si è verificato un problema... riprova più tardi
        </Alert>
      </Fade>
    </>
  );
}
