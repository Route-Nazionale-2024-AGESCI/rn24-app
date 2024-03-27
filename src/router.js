import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import Avvisi from "./pages/Avvisi";
import Mappa from "./pages/Mappa";
import Calendario from "./pages/Calendario";
import Tracce from "./pages/Tracce";
import Root from "./pages/Root";
import RootError from "./ui/RootError";
import SegmentedError from "./ui/SegmentError";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <RootError />,
    children: [
      {
        errorElement: <SegmentedError />,
        children: [
          {
            index: true,
            element: <Home />,
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
        ],
      },
    ],
  },
]);
