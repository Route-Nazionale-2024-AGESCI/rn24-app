import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import Avvisi from "./pages/Avvisi";
import Mappa from "./pages/Mappa";
import Calendario from "./pages/Calendario";
import Tracce from "./pages/Tracce";
import NavBarLayout from "./pages/layout/NavBarLayout";
import AppBarLayout from "./pages/layout/AppBarLayout";
import FabLayout from "./pages/layout/FabLayout";
import AccessLayout from "./pages/layout/AccessLayout";
import RootError from "./ui/RootError";
import SegmentedError from "./ui/SegmentError";
import AggiungiContatto from "./pages/AggiungiContatto";
import Login from "./pages/Login";
import RecuperoPwd from "./pages/RecuperoPwd";
import RecuperoCodice from "./pages/RecuperoCodice";
import QrLayout from "./pages/layout/QrLayout";
import NfcLayout from "./pages/layout/NfcLayout";
import CodiceLayout from "./pages/layout/CodiceLayout";
import RicercaNfc from "./pages/RicercaNfc";
import ScansionaQr from "./pages/ScansionaQr";
import InserisciCodice from "./pages/InserisciCodice";
import RicercaContatto from "./pages/RicercaContatto";

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
              {
                path: "recuperoPassword",
                element: <RecuperoPwd />,
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
                      },
                    ],
                  },
                  {
                    path: "calendario",
                    element: <Calendario />,
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
                    path: "aggiungiContatto",
                    element: <AggiungiContatto />,
                  },
                  {
                    path: "tracce",
                    element: <Tracce />,
                  },
                ],
              },
              {
                element: <NfcLayout />,
                path: "aggiungiContatto/nfc",
                children: [
                  {
                    index: true,
                    element: <RicercaNfc />,
                  },
                  {
                    path: "ricerca",
                    element: <RicercaContatto />,
                  },
                ],
              },
              {
                element: <QrLayout />,
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
                element: <CodiceLayout />,
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
            ],
          },
        ],
      },
    ],
  },
]);
