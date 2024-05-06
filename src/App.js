import React from "react";
import { RouterProvider } from "react-router-dom";
import {
  ThemeProvider,
  createTheme,
  responsiveFontSizes,
} from "@mui/material/styles";

import "./App.css";
import { getLoggedInRouter, getNotLoggedInRouter } from "./router";
import AuthProvider, {AuthContext, AuthIsLoggedIn, AuthIsNotLoggedIn} from "./contexts/auth";

const yellowBase = "#F6AB2D",
  purpleBase = "#6D5095",
  greenBase = "#38A368",
  redBase = "#E75750";

let theme = createTheme({
  typography: {
    allVariants: { fontFamily: ["Montserrat"].join(",") },
  },
});
theme = createTheme(theme, {
  palette: {
    agesciYellow: theme.palette.augmentColor({
      color: {
        main: yellowBase,
      },
      name: "agesciYellow",
    }),
    agesciPurple: theme.palette.augmentColor({
      color: {
        main: purpleBase,
      },
      name: "agesciPurple",
    }),
    agesciGreen: theme.palette.augmentColor({
      color: {
        main: greenBase,
      },
      name: "agesciGreen",
    }),
    agesciRed: theme.palette.augmentColor({
      color: {
        main: redBase,
      },
      name: "agesciRed",
    }),
    white: theme.palette.augmentColor({
      color: {
        main: "#FFFFFF",
      },
      name: "white",
    }),
  },
});
theme = responsiveFontSizes(theme);


const Router = () => {
  const {isLoaded, user, token, status} = React.useContext(AuthContext);

  const notLoggedInRouter = React.useMemo(() => {
    if(isLoaded && user === null)
      return getNotLoggedInRouter();
  }, [isLoaded]);

  const loggedInRouter = React.useMemo(() => {
    if(isLoaded && user)
      return getLoggedInRouter();
  }, [isLoaded]);

  if(!isLoaded)
    return 'Caricamento....';

  if(user)
    return <RouterProvider router={loggedInRouter} />;

  
  return <RouterProvider router={notLoggedInRouter} />;

};

function App() {
  
  return (
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <Router />
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
