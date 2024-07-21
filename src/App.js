import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import {
  ThemeProvider,
  createTheme,
  responsiveFontSizes,
} from "@mui/material/styles";

import "./App.css";
import { router } from "./router";
import AuthProvider, { useAuth } from "./contexts/auth";

// import di tutte le icone fontawesome solid, da capire come filtrare
// solo quelle utilizzate da noi e configurazione service worker
import { library } from "@fortawesome/fontawesome-svg-core";
import * as Icons from "@fortawesome/free-solid-svg-icons";

const iconList = Object.keys(Icons)
  .filter((key) => key !== "fas" && key !== "prefix")
  .map((icon) => Icons[icon]);

library.add(...iconList);

const yellowBase = "#F6AB2D",
  purpleBase = "#6D5095",
  greenBase = "#38A368",
  redBase = "#E75750",
  blueBase = "#0077b6";

let theme = createTheme({
  typography: {
    allVariants: { fontFamily: ["Montserrat"].join(",") },
  },
});
theme = createTheme(theme, {
  palette: {
    primary: {
      main: "#6D5095",
    },
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
    agesciBlue: theme.palette.augmentColor({
      color: {
        main: blueBase,
      },
      name: "agesciBlue",
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

function Router() {
  const { isLoaded } = useAuth();

  if (!isLoaded) return <h1>caricamento....</h1>;

  return <RouterProvider router={createBrowserRouter(router)} />;
}

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
