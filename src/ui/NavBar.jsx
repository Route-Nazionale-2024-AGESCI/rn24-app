import * as React from "react";
import { Link, useLocation } from "react-router-dom";
import BottomNavigation from "@mui/material/BottomNavigation";
import MuiBottomNavigationAction from "@mui/material/BottomNavigationAction";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { styled } from "@mui/material/styles";

import HomeIcon from "@mui/icons-material/Home";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import MapIcon from "@mui/icons-material/Map";
import ReportProblemIcon from "@mui/icons-material/ReportProblem";

import { getSicurezza } from "../lib/cacheManager/pages";

const selectedColor = "#FFFFFF";
const inactiveColor = "#86838D";
const backgroundColor = "#2B2D2C";

const BottomNavigationAction = styled(MuiBottomNavigationAction)(`
  color: ${inactiveColor};
  &.Mui-selected {
    color: ${selectedColor};
  };
`);

export default function NavBar() {
  const [destinazione, setDestinazione] = React.useState("Home");
  const [sicurezzaUrl, setSicurezzaUrl] = React.useState("/avvisi");
  const location = useLocation();
  const handleDestinationChange = (event, newValue) => {
    setDestinazione(newValue);
  };

  React.useEffect(() => {
    let dest = location.pathname;
    if (dest.endsWith("/") && dest.length > 1) {
      dest = dest.slice(0, dest.length - 1);
    }
    setDestinazione(dest);
  }, [location.pathname]);

  React.useEffect(() => {
    const updateSicurezzaUrl = async () => {
      const sicurezzaPage = await getSicurezza();
      if (sicurezzaPage && sicurezzaPage?.uuid) {
        setSicurezzaUrl(`/pages/${sicurezzaPage.uuid}`);
      }
    };
    updateSicurezzaUrl();
  });

  const Label = ({ text }) => <Typography fontSize="12px">{text}</Typography>;

  return (
    <Container
      sx={{
        position: "fixed",
        bottom: 0,
        right: 0,
        left: 0,
        p: 0,
      }}
    >
      <BottomNavigation
        sx={{
          bgcolor: backgroundColor,
          borderRadius: "16px 16px 0 0",
          height: "80px",
        }}
        value={destinazione}
        onChange={handleDestinationChange}
      >
        <BottomNavigationAction
          label={<Label text="Home" />}
          value="/"
          icon={<HomeIcon />}
          component={Link}
          to="/"
        />
        <BottomNavigationAction
          label={<Label text="Programma" />}
          value="/programma"
          icon={<CalendarMonthIcon />}
          component={Link}
          to="/programma"
        />
        <BottomNavigationAction
          label={<Label text="Mappa" />}
          value="/mappa"
          icon={<MapIcon />}
          component={Link}
          to="/mappa"
        />
        <BottomNavigationAction
          label={<Label text="Sicurezza" />}
          value={sicurezzaUrl}
          icon={<ReportProblemIcon />}
          component={Link}
          to={sicurezzaUrl}
        />
      </BottomNavigation>
    </Container>
  );
}
