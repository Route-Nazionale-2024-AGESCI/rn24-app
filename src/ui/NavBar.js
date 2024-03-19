import * as React from "react";
import BottomNavigation from "@mui/material/BottomNavigation";
import MuiBottomNavigationAction from "@mui/material/BottomNavigationAction";
import Container from "@mui/material/Container";
import { styled } from "@mui/material/styles";

import HomeIcon from "@mui/icons-material/Home";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import MapIcon from "@mui/icons-material/Map";
import ReportProblemIcon from "@mui/icons-material/ReportProblem";

const selectedColor = "#FFFFFF";
const inactiveColor = "#86838D";
const backgroundColor = "#2B2D2C";

const BottomNavigationAction = styled(MuiBottomNavigationAction)(`
  color: ${inactiveColor};
  &.Mui-selected {
    color: ${selectedColor};
  }
`);

export default function NavBar() {
  const [destinazione, setDestinazione] = React.useState("Home");
  const handleDestinationChange = (event, newValue) => {
    setDestinazione(newValue);
  };

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
        sx={{ bgcolor: backgroundColor, borderRadius: "20px 20px 0 0" }}
        value={destinazione}
        onChange={handleDestinationChange}
      >
        <BottomNavigationAction label="Home" value="Home" icon={<HomeIcon />} />
        <BottomNavigationAction
          label="Calendario"
          value="Calendario"
          icon={<CalendarMonthIcon />}
        />
        <BottomNavigationAction
          label="Mappa"
          value="Mappa"
          icon={<MapIcon />}
        />
        <BottomNavigationAction
          label="Avvisi"
          value="Avvisi"
          icon={<ReportProblemIcon />}
        />
      </BottomNavigation>
    </Container>
  );
}
