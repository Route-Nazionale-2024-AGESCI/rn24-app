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
  const location = useLocation();
  const handleDestinationChange = (event, newValue) => {
    setDestinazione(newValue);
  };

  React.useEffect(() => {
    console.log(location.pathname);
    setDestinazione(location.pathname);
  }, [location.pathname]);

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
          label={<Label text="Calendario" />}
          value="/calendario"
          icon={<CalendarMonthIcon />}
          component={Link}
          to="/calendario"
        />
        <BottomNavigationAction
          label={<Label text="Mappa" />}
          value="/mappa"
          icon={<MapIcon />}
          component={Link}
          to="/mappa"
        />
        <BottomNavigationAction
          label={<Label text="Avvisi" />}
          value="/avvisi"
          icon={<ReportProblemIcon />}
          component={Link}
          to="/avvisi"
        />
      </BottomNavigation>
    </Container>
  );
}
