import { Outlet, Navigate } from "react-router-dom";

import Home, { loader as homeLoader } from "./pages/Home";
import Avvisi, { loader as avvisiLoader } from "./pages/Avvisi";
import Mappa, { loader as mappaLoader } from "./pages/Mappa";
import Programma, { loader as programmaLoader } from "./pages/Programma";
import Tracce, { loader as tracceLoader } from "./pages/Tracce";
import Libretto, { loader as librettoLoader } from "./pages/Libretto";
import NavBarLayout from "./pages/layout/NavBarLayout";
import AppBarLayout from "./pages/layout/AppBarLayout";
import FabLayout from "./pages/layout/FabLayout";
import AccessLayout from "./pages/layout/AccessLayout";
import RootError from "./ui/RootError";
import SegmentedError from "./ui/SegmentError";
import Contatti from "./pages/Contatti";
import Login from "./pages/Login";
import Profilo, { loader as profiloLoader } from "./pages/Profilo";
import ToS from "./pages/ToS";
import RecuperoCodice from "./pages/RecuperoCodice";
import RecuperoPwd from "./pages/RecuperoPwd";
import { PurpleLayout, GreenLayout } from "./pages/layout/ColorLayout";
import ScansionaQr from "./pages/ScansionaQr";
import CondividiQr, { loader as condividiQrLoader } from "./pages/CondividiQr";
import RicercaContenuto from "./pages/RicercaContenuto";
import ScansionaQrContenuto from "./pages/ScansionaQrContenuto";
import InserisciCodiceContenuto from "./pages/InserisciCodiceContenuto";
import Evento, { loader as eventoLoader } from "./pages/Evento";
import RegistrazioneEvento, {
  loader as registrazioneEventoLoader,
} from "./pages/RegistrazioneEvento";
import Pagina, { loader as paginaLoader } from "./pages/Pagina";

import { FilterProvider } from "./contexts/filter";
import { useAuth } from "./contexts/auth";

const AuthMiddleware = () => {
  const { isLoaded, user } = useAuth();

  if (!isLoaded) return <p>caricamento...</p>;

  return user ? <Outlet /> : <Navigate to="/login" replace />;
};

const FilterMiddleware = () => {
  return <FilterProvider>{<Outlet />}</FilterProvider>;
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
              {
                path: "recuperoPassword",
                element: <RecuperoPwd />,
                errorElement: <SegmentedError />,
              },
              {
                path: "tos",
                element: <ToS />,
                errorElement: <SegmentedError />,
              },
            ],
          },

          {
            element: <AuthMiddleware />,
            children: [
              {
                element: <FilterMiddleware />,
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
                            path: "libretto",
                            element: <Libretto />,
                            loader: librettoLoader,
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
                          {
                            path: "profilo",
                            element: <Profilo />,
                            loader: profiloLoader,
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
                          {
                            element: <InserisciCodiceContenuto />,
                            index: true,
                          },
                        ],
                      },
                      {
                        path: "/condividiContatto",
                        element: <PurpleLayout back="/contatti" />,
                        children: [
                          {
                            index: true,
                            element: <CondividiQr />,
                            loader: condividiQrLoader,
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
    ],
  },
];
