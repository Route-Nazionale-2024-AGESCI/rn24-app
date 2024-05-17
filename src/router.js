import { Outlet, Navigate } from "react-router-dom";

import Home, { loader as homeLoader } from "./pages/Home";
import Avvisi, { loader as avvisiLoader } from "./pages/Avvisi";
import Mappa, { loader as mappaLoader } from "./pages/Mappa";
import Programma, { loader as programmaLoader } from "./pages/Programma";
import Tracce, { loader as tracceLoader } from "./pages/Tracce";
import NavBarLayout from "./pages/layout/NavBarLayout";
import AppBarLayout from "./pages/layout/AppBarLayout";
import FabLayout from "./pages/layout/FabLayout";
import AccessLayout from "./pages/layout/AccessLayout";
import RootError from "./ui/RootError";
import SegmentedError from "./ui/SegmentError";
import Contatti from "./pages/Contatti";
import Login from "./pages/Login";
import RecuperoCodice from "./pages/RecuperoCodice";
import { PurpleLayout, GreenLayout } from "./pages/layout/ColorLayout";
import ScansionaQr from "./pages/ScansionaQr";
import CondividiQr from "./pages/CondividiQr";
import RicercaContenuto from "./pages/RicercaContenuto";
import ScansionaQrContenuto from "./pages/ScansionaQrContenuto";
import InserisciCodiceContenuto from "./pages/InserisciCodiceContenuto";
import Evento, { loader as eventoLoader } from "./pages/Evento";
import RegistrazioneEvento, {
  loader as registrazioneEventoLoader,
} from "./pages/RegistrazioneEvento";
import Pagina, { loader as paginaLoader } from "./pages/Pagina";

import { useAuth } from "./contexts/auth";

const AuthMiddleware = () => {
  const { isLoaded, user } = useAuth();

  if (!isLoaded) return <p>caricamento...</p>;

  return user ? <Outlet /> : <Navigate to="/login" replace />;
};

export const router = [
  {
    path: "/",
    errorElement: <RootError />,
    children: [
      {
        children: [
          {
            element: <AccessLayout />,
            children: [
              {
                path: "login",
                element: <Login />,
                errorElement: <SegmentedError />,
              },
              {
                path: "recuperoCodice",
                element: <RecuperoCodice />,
                errorElement: <SegmentedError />,
              },
            ],
          },

          {
            element: <AuthMiddleware />,
            children: [
              {
                element: <NavBarLayout />,
                errorElement: <SegmentedError />,
                children: [
                  {
                    element: <AppBarLayout />,
                    children: [
                      {
                        element: <FabLayout />,
                        children: [
                          {
                            index: true,
                            element: <Home />,
                            loader: homeLoader,
                          },
                        ],
                      },
                      {
                        path: "programma",
                        element: <Programma />,
                        loader: programmaLoader,
                      },
                      {
                        path: "mappa",
                        element: <Mappa />,
                        loader: mappaLoader,
                      },
                      {
                        path: "avvisi",
                        element: <Avvisi />,
                        loader: avvisiLoader,
                      },
                      {
                        path: "eventi/:eventId",
                        element: <Evento />,
                        loader: eventoLoader,
                        children: [
                          {
                            index: true,
                            element: <RegistrazioneEvento />,
                            loader: registrazioneEventoLoader,
                          },
                        ],
                      },
                      {
                        path: "pagine/:pageId",
                        element: <Pagina />,
                        loader: paginaLoader,
                      },
                      {
                        // Alias
                        path: "pages/:pageId",
                        element: <Pagina />,
                        loader: paginaLoader,
                      },
                      {
                        path: "contatti",
                        element: <Contatti />,
                      },

                      {
                        path: "tracce",
                        element: <Tracce />,
                        loader: tracceLoader,
                      },
                      {
                        path: "ricercaContenuto",
                        element: <RicercaContenuto />,
                      },
                    ],
                  },
                  {
                    element: <GreenLayout back="/contatti" />,
                    path: "aggiungiContatto/qr",
                    children: [
                      {
                        index: true,
                        element: <ScansionaQr />,
                      },
                    ],
                  },
                  {
                    element: <GreenLayout back="/ricercaContenuto" />,
                    path: "ricercaContenuto/qr",
                    children: [
                      {
                        index: true,
                        element: <ScansionaQrContenuto />,
                      },
                    ],
                  },
                  // {
                  //   element: <CodiceLayout back="/aggiungiContatto" />,
                  //   path: "aggiungiContatto/codice",
                  //   children: [
                  //     {
                  //       index: true,
                  //       element: <InserisciCodice />,
                  //     },
                  //   ],
                  // },
                  {
                    element: <PurpleLayout back="/ricercaContenuto" />,
                    path: "ricercaContenuto/codice",
                    children: [
                      { element: <InserisciCodiceContenuto />, index: true },
                    ],
                  },
                  {
                    path: "/condividiContatto",
                    element: <PurpleLayout back="/contatti" />,
                    children: [
                      {
                        index: true,
                        element: <CondividiQr />,
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
];
