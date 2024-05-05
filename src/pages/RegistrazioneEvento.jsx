import { useFetcher, useLoaderData } from "react-router-dom";

import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";

import AccessButton from "../ui/AccessButton";

import {
  getEvent,
  getEventInvitations,
  getEventRegistrations,
} from "../lib/dataManager/events";

/*
  Responses:
    201 - {"event":"event-uuid","is_personal":bool}
    400 - ["error message"]
    403 - {"detail":"non sono state immesse le credenziali di autenticazione"}
    404 - {"detail": "No Event matches the given query"}
    415 - {"detail":"tipo di media text/plain... non supportato"}
*/

/*
  BASIC LOGIC
  
  se l'app è offline, mostrare solo "sei registrato..." se l'evento è nelle registrazioni
  
  se l'app è online
    if event.is_registration_required === false => don't show button subscribe or delete subscription
    se l'evento è nell'elenco delle registrazioni, mostrare "sei registrato all'evento"

    is_registration_required === true
    se l'evento è nelle registrazioni mostrare "sei registrato..." e il button "cancella iscrizione"
    se l'evento non è nelle registrazioni mostrare "registra iscrizione"



*/

export async function action({ params }) {
  const eventUuid = params.eventId;
  const res = await fetch(
    "https://rn24-dev.fly.dev/api/v1/events/registrations/",
    {
      method: "POST",
      body: JSON.stringify({
        // event: eventUuid,
        event: "5eff8281-80c6-46aa-b6bd-713a543f18a1",
      }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${process.env.REACT_APP_API_TOKEN}`,
      },
    }
  ).then((res) =>
    res.json().then((data) => ({ status: res.status, body: data }))
  );
  return res;
}

export async function loader({ params }) {
  const event = await getEvent(params.eventId);
  const invitations = await getEventInvitations();

  // unique real Req, won't be retrieved by cache if we're online
  const registrations = await getEventRegistrations();

  return { event, invitations, registrations };
}

export default function RegistrazioneEvento() {
  const { event, invitations, registrations } = useLoaderData();
  const fetcher = useFetcher();

  console.log("Response status: ", fetcher.data?.status);
  console.log("Response body: ", fetcher.data?.body);
  const regUuid = registrations.map((r) => r.event);
  const invUuid = invitations.map((i) => i.uuid);

  if (!event.is_registration_required) return null;

  // TODO: introdurre isOnline
  // TODO: rimuovere canUserRegister? is_registration_required viene testata sopra...
  const canUserRegister =
    event.is_registration_required === true && invUuid.includes(event.uuid);
  const userAlreadyRegistered = canUserRegister && regUuid.includes(event.uuid);

  if (canUserRegister && !userAlreadyRegistered)
    return (
      <fetcher.Form
        method="post"
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <AccessButton
          sx={{ opacity: fetcher.state === "submitting" ? "50%" : "100%" }}
          type="submit"
          disabled={fetcher.state !== "idle"}
        >
          <Typography fontSize="16px" fontWeight={600}>
            Registrati a questo evento
          </Typography>
          {fetcher.state !== "idle" && (
            <CircularProgress
              size="20px"
              sx={{ marginLeft: "12px", color: "#000000" }}
            />
          )}
        </AccessButton>
      </fetcher.Form>
    );

  // Capo iscritto, possibilita di ritirare l'iscrizione
  if (canUserRegister && userAlreadyRegistered) return <></>;

  // Caso offline...

  // POST precedente ha dato una error response
  // Generare forse un componente tipo Toast Notify che viene renderizzato su tutte le view?
  // Usare useEffect con le giuste dipendenze, per non generarne infiniti
  if (fetcher.data?.status !== undefined && fetcher.data.status === 201) {
  }

  return <></>;
}
