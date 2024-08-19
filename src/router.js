import { Outlet, Navigate, useParams } from "react-router-dom";

import RootLayout from "./pages/layout/RootLayout";
import Home, { loader as homeLoader } from "./pages/Home";
import Avvisi, { loader as avvisiLoader } from "./pages/Avvisi";
import Mappa, { loader as mappaLoader } from "./pages/Mappa";
import Programma, { loader as programmaLoader } from "./pages/Programma";
import Tracce, { loader as tracceLoader } from "./pages/Tracce";
import Libretto, { loader as librettoLoader } from "./pages/Libretto";
import NavBarLayout from "./pages/layout/NavBarLayout";
import AppBarLayout, {
  loader as appBarLoader,
} from "./pages/layout/AppBarLayout";
import FullScreenBadge from "./pages/FullScreenBadge";
import FabLayout from "./pages/layout/FabLayout";
import AccessLayout from "./pages/layout/AccessLayout";
import RootError from "./ui/RootError";
import SegmentedError from "./ui/SegmentError";
import Contatti from "./pages/Contatti";
import Login from "./pages/Login";
import Profilo from "./pages/Profilo";
import RecuperoCodice from "./pages/RecuperoCodice";
import RecuperoPwd from "./pages/RecuperoPwd";
import GeneraPwd from "./pages/GeneraPwd";
import AttendeesList from "./pages/AttendeesList";
import {
  PurpleLayout,
  GreenLayout,
  RedLayout,
  BadgeLayout,
} from "./pages/layout/ColorLayout";
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
import Scan from "./pages/badgeControl/Scan";
import UserFound from "./pages/badgeControl/UserFound";
import UserNotFound from "./pages/badgeControl/UserNotFound";
import QrNotFound from "./pages/badgeControl/QrNotFound";
import BadQr from "./pages/badgeControl/BadQr";
import RoutePlanner, {
  loader as routePlannerLoader,
} from "./pages/planner/RoutePlanner";
import IncontriPlanner, {
  loader as incontriPlannerLoader,
} from "./pages/planner/IncontriPlanner";
import ConfrontiPlanner, {
  loader as confrontiPlannerLoader,
} from "./pages/planner/ConfrontiPlanner";
import SguardiPlanner, {
  loader as sguardiPlannerLoader,
} from "./pages/planner/SguardiPlanner";
import AccadimentoPlanner, {
  loader as accadimentoPlannerLoader,
} from "./pages/planner/AccadimentoPlanner";

import SecurityScan, {
  loader as securityScanLoader,
} from "./pages/SecurityScan";

import { FilterProvider } from "./contexts/filter";
import { PersonalPagesProvider } from "./contexts/personalPages";
import { useAuth } from "./contexts/auth";
import { LocationFilterProvider } from "./contexts/locationFilter";

const AuthMiddleware = () => {
  const { isLoaded, user } = useAuth();

  if (!isLoaded) return <p>caricamento...</p>;

  return user ? <Outlet /> : <Navigate to="/login" replace />;
};

const ContextsMiddleware = () => {
  return (
    <FilterProvider>
      <LocationFilterProvider>
        <PersonalPagesProvider>{<Outlet />}</PersonalPagesProvider>
      </LocationFilterProvider>
    </FilterProvider>
  );
};

const AccessControlWrapper = ({ Layout }) => {
  const { eventId } = useParams();
  return <Layout back={`/eventi/${eventId}`} backText="Torna all'evento" />;
};

export const router = [
  {
    path: "/",
    element: <RootLayout />,
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
                path: "generaPassword",
                element: <GeneraPwd />,
                errorElement: <SegmentedError />,
              },
            ],
          },

          {
            element: <AuthMiddleware />,
            errorElement: <SegmentedError />,
            children: [
              {
                element: <ContextsMiddleware />,
                children: [
                  {
                    element: <NavBarLayout />,
                    errorElement: <SegmentedError />,
                    children: [
                      {
                        element: <AppBarLayout />,
                        loader: appBarLoader,
                        errorElement: <SegmentedError />,
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
                            path: "eventi/:eventId/partecipanti",
                            element: <AttendeesList />,
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
                          },
                          {
                            path: "progetta-route",
                            element: <RoutePlanner />,
                            loader: routePlannerLoader,
                          },
                          {
                            path: "progetta-route/incontri",
                            element: <IncontriPlanner />,
                            loader: incontriPlannerLoader,
                          },
                          {
                            path: "progetta-route/sguardi",
                            element: <SguardiPlanner />,
                            loader: sguardiPlannerLoader,
                          },
                          {
                            path: "progetta-route/confronti",
                            element: <ConfrontiPlanner />,
                            loader: confrontiPlannerLoader,
                          },
                          {
                            path: "progetta-route/incontri/:idAccadimento",
                            element: <AccadimentoPlanner />,
                            loader: accadimentoPlannerLoader,
                          },
                          {
                            path: "security-scan",
                            element: <SecurityScan />,
                            loader: securityScanLoader,
                          },
                        ],
                      },
                      {
                        element: (
                          <GreenLayout
                            back="/contatti"
                            backText="Torna agli altri metodi"
                          />
                        ),
                        path: "aggiungiContatto/qr",
                        children: [
                          {
                            index: true,
                            element: <ScansionaQr />,
                          },
                        ],
                      },
                      {
                        element: (
                          <GreenLayout
                            back="/ricercaContenuto"
                            backText="Torna agli altri metodi"
                          />
                        ),
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
                        element: (
                          <PurpleLayout
                            back="/ricercaContenuto"
                            backText="Torna agli altri metodi"
                          />
                        ),
                        path: "ricercaContenuto/codice",
                        children: [
                          {
                            element: <InserisciCodiceContenuto />,
                            index: true,
                          },
                        ],
                      },
                      {
                        element: <BadgeLayout />,
                        path: "badge",
                        children: [
                          {
                            element: <FullScreenBadge />,
                            index: true,
                          },
                        ],
                      },
                      {
                        path: "/condividiContatto",
                        element: (
                          <PurpleLayout
                            back="/contatti"
                            backText="Torna agli altri metodi"
                          />
                        ),
                        children: [
                          {
                            index: true,
                            element: <CondividiQr />,
                          },
                        ],
                      },

                      // CONTROLLO ACCESSI
                      {
                        path: "/controlloAccessi/:eventId",
                        element: <AccessControlWrapper Layout={PurpleLayout} />,
                        children: [
                          { index: true, element: <Scan /> },
                          { path: "bad-qr", element: <BadQr /> },
                          { path: "qr-not-found", element: <QrNotFound /> },
                        ],
                      },
                      {
                        path: "/controlloAccessi/:eventId/user-found/:userId",
                        element: <AccessControlWrapper Layout={GreenLayout} />,
                        children: [{ index: true, element: <UserFound /> }],
                      },
                      {
                        path: "/controlloAccessi/:eventId/user-not-found",
                        element: <AccessControlWrapper Layout={RedLayout} />,
                        children: [{ index: true, element: <UserNotFound /> }],
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
