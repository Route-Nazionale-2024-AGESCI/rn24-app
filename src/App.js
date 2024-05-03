import React from "react";
import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import {
  ThemeProvider,
  createTheme,
  responsiveFontSizes,
} from "@mui/material/styles";

import "./App.css";

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

function App() {
  return (
    <ThemeProvider theme={theme}>
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
