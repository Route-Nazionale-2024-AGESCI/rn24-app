import { Outlet } from "react-router-dom";
import React from "react";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import { register } from "../../serviceWorkerRegistration";
import useServiceWorker from "../../hooks/sw";

export default function RootLayout() {
  //const [waitingWorker, setWaitingWorker] = React.useState(null);
  const waitingWorker = useServiceWorker();
  const [updateAvailable, setUpdateAvailable] = React.useState(false);
  React.useEffect(() => {
    if (waitingWorker !== null) {
      setUpdateAvailable(true);
    }
  }, [waitingWorker]);

  const reloadPage = () => {
    if (waitingWorker) {
      waitingWorker.postMessage({ type: "SKIP_WAITING" });
      waitingWorker.addEventListener("statechange", (event) => {
        if (event.target.state === "activated") {
          window.location.reload();
        }
      });
    }
  };
  return (
    <>
      {updateAvailable && (
        <Alert
          severity="success"
          action={
            <Button color="inherit" size="small" onClick={reloadPage}>
              Aggiorna
            </Button>
          }
        >
          È disponibile un aggiornamento. Clicca su "Aggiorna" per installarlo.
        </Alert>
      )}
      <Outlet />
    </>
  );
}
