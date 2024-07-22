import { Outlet } from "react-router-dom";
import React from "react";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import { register } from "../../serviceWorkerRegistration";

export default function RootLayout() {
  const [waitingWorker, setWaitingWorker] = React.useState(null);
  React.useEffect(() => {
    register({
      onUpdate: (registration) => {
        if (registration && registration.waiting)
          setWaitingWorker(registration.waiting);
      },
    });
  }, []);

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
      {waitingWorker !== null && (
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
