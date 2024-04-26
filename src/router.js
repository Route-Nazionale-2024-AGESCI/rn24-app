import { createBrowserRouter } from "react-router-dom";
import Home, { loader as homeLoader } from "./pages/Home";
import Avvisi from "./pages/Avvisi";
import Mappa from "./pages/Mappa";
import Programma, { loader as programmaLoader } from "./pages/Programma";
import Tracce from "./pages/Tracce";
import NavBarLayout from "./pages/layout/NavBarLayout";
import AppBarLayout from "./pages/layout/AppBarLayout";
import FabLayout from "./pages/layout/FabLayout";
import AccessLayout from "./pages/layout/AccessLayout";
import RootError from "./ui/RootError";
import SegmentedError from "./ui/SegmentError";
import AggiungiContatto from "./pages/AggiungiContatto";
import Login from "./pages/Login";
// import RecuperoPwd from "./pages/RecuperoPwd";
import RecuperoCodice from "./pages/RecuperoCodice";
import QrLayout from "./pages/layout/QrLayout";
//import NfcLayout from "./pages/layout/NfcLayout";
import CodiceLayout from "./pages/layout/CodiceLayout";
//import RicercaNfc from "./pages/RicercaNfc";
import ScansionaQr from "./pages/ScansionaQr";
import InserisciCodice from "./pages/InserisciCodice";
import RicercaContatto from "./pages/RicercaContatto";
import CondividiContatto from "./pages/CondividiContatto";
import CondividiQr, { loader as condividiQrLoader } from "./pages/CondividiQr";
//import CondividiNfc from "./pages/CondividiNfc";
import Evento, { loader as eventoLoader } from "./pages/Evento";

export const router = createBrowserRouter([
  {
    path: "/",
    //element: <Root />,
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
              // {
              //   path: "recuperoPassword",
              //   element: <RecuperoPwd />,
              //   errorElement: <SegmentedError />,
              // },
              {
                path: "recuperoCodice",
                element: <RecuperoCodice />,
                errorElement: <SegmentedError />,
              },
            ],
          },

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
                  },
                  {
                    path: "avvisi",
                    element: <Avvisi />,
                  },
                  {
                    path: "eventi/:eventId",
                    element: <Evento />,
                    loader: eventoLoader,
                  },
                  {
                    path: "aggiungiContatto",
                    element: <AggiungiContatto />,
                  },
                  {
                    path: "condividiContatto",
                    element: <CondividiContatto />,
                  },
                  {
                    path: "tracce",
                    element: <Tracce />,
                  },
                ],
              },
              // {
              //   element: <NfcLayout back="/aggiungiContatto" />,
              //   path: "aggiungiContatto/nfc",
              //   children: [
              //     {
              //       index: true,
              //       element: <RicercaNfc />,
              //     },
              //     {
              //       path: "ricerca",
              //       element: <RicercaContatto />,
              //     },
              //   ],
              // },
              {
                element: <QrLayout back="/aggiungiContatto" />,
                path: "aggiungiContatto/qr",
                children: [
                  {
                    index: true,
                    element: <ScansionaQr />,
                  },
                  {
                    path: "ricerca",
                    element: <RicercaContatto />,
                  },
                ],
              },
              {
                element: <CodiceLayout back="/aggiungiContatto" />,
                path: "aggiungiContatto/codice",
                children: [
                  {
                    index: true,
                    element: <InserisciCodice />,
                  },
                  {
                    path: "ricerca",
                    element: <RicercaContatto />,
                  },
                ],
              },
              {
                path: "condividiContatto/qr",
                element: <QrLayout back="/condividiContatto" />,
                children: [
                  {
                    index: true,
                    element: <CondividiQr />,
                    loader: condividiQrLoader,
                  },
                ],
              },
              // {
              //   path: "condividiContatto/nfc",
              //   element: <NfcLayout back="/condividiContatto" />,
              //   children: [
              //     {
              //       index: true,
              //       element: <CondividiNfc />,
              //     },
              //   ],
              // },
            ],
          },
        ],
      },
    ],
  },
]);
