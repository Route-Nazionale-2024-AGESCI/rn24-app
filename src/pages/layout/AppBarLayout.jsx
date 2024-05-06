import { Outlet } from "react-router-dom";
//import { Link } from "react-router-dom";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";

//import { AuthIsLoggedIn, AuthIsNotLoggedIn } from "../../contexts/auth";
import AppBar from "../../ui/AppBar";

export default function AppBarLayout() {
  return (
    <Box sx={{ mt: "40px" }}>
      <AppBar />
      <Container sx={{ p: 0 }}>
        {/* Questo non dovrebbe servire, perchè la navbar è presente solo nelle
        pagine autenticate... ma vista la chiarezza dei requisiti, teniamola che non si sa mai!
        <AuthIsLoggedIn>   
          <Outlet />
        </AuthIsLoggedIn>
        <AuthIsNotLoggedIn>
          <Link to={'/login'}>Accedi</Link>
        </AuthIsNotLoggedIn>*/}
        <Outlet />
      </Container>
    </Box>
  );
}
