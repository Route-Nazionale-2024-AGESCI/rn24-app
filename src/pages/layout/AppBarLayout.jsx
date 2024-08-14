import { Outlet, useLoaderData } from "react-router-dom";
//import { Link } from "react-router-dom";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";

//import { AuthIsLoggedIn, AuthIsNotLoggedIn } from "../../contexts/auth";
import { getPages } from "../../lib/cacheManager/pages";
import AppBar from "../../ui/AppBar";

export async function loader() {
  const { pages } = await getPages();
  return { pages };
}

export default function AppBarLayout() {
  const { pages } = useLoaderData();
  return (
    <Box sx={{ mt: "40px" }}>
      <AppBar pages={pages} />
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
