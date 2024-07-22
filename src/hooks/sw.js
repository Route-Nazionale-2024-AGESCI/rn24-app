import { useEffect, useState } from "react";
import { register } from "../serviceWorkerRegistration";

function useServiceWorker() {
  const [waitingWorker, setWaitingWorker] = useState(null);

  useEffect(() => {
    const onServiceWorkerUpdate = (registration) => {
      if (registration && registration.waiting) {
        setWaitingWorker(registration.waiting);
      }
    };

    register({
      onUpdate: onServiceWorkerUpdate,
    });

    const handleControllerChange = () => {
      window.location.reload();
    };

    navigator.serviceWorker.addEventListener(
      "controllerchange",
      handleControllerChange
    );

    return () => {
      navigator.serviceWorker.removeEventListener(
        "controllerchange",
        handleControllerChange
      );
    };
  }, []);

  return waitingWorker;
}

export default useServiceWorker;
