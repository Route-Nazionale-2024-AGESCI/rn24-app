import { useFetcher, useLoaderData } from "react-router-dom";

import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Button from "@mui/material/Button";

import AccessButton from "../ui/AccessButton";

import {
  getEvent,
  getEventInvitations,
  getEventRegistrations,
} from "../lib/cacheManager/events";

import {
  registerToEvent,
  deleteRegistrationToEvent,
} from "../lib/dataManager/events";

const GreenBox = styled(Box)({
  backgroundColor: "#EBF6F0",
  border: "2px solid #38A368",
  padding: "12px 24px",
  borderRadius: "8px",
  color: "#38A368",
  textAlign: "center",
  maxWidth: "400px",
  marginRight: "auto",
  marginLeft: "auto",
});

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

export async function action({ params, request }) {
  const eventUuid = params.eventId;
  let res;
  switch (request.method) {
    case "POST":
      res = await registerToEvent(eventUuid);
      return res;
    case "DELETE":
      res = await deleteRegistrationToEvent(eventUuid);
      return res;
    default:
      return null;
  }
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

  /*
    Clausola di sicurezza: l'utente non dovrebbe poter vedere gli eventi a cui non è
    invitato.
  */
  if (!invUuid.includes(event.uuid)) return null;

  // Evento senza registrazione personale: aperto a tutti i capi, oppure con registrazione di Co.Ca. o simili
  if (!event.is_registration_required) {
    if (regUuid.includes(event.uuid)) {
      return (
        <GreenBox>
          <Typography fontWeight={600} fontSize="16px">
            Sei registrato a questo evento
          </Typography>
        </GreenBox>
      );
    }
    return null;
  } else {
    // event.is_registration_required === true
    if (regUuid.includes(event.uuid)) {
      return (
        <>
          <GreenBox>
            <Typography fontWeight={600} fontSize="16px">
              Sei registrato a questo evento
            </Typography>
          </GreenBox>
          <Box height="16px" />
          <fetcher.Form
            method="DELETE"
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <Button
              variant="text"
              sx={{
                textTransform: "none",
                color: "#000000",
                opacity: fetcher.state === "submitting" ? "50%" : "100%",
              }}
              type="submit"
            >
              <Typography fontSize="16px" fontWeight={600}>
                Annulla Iscrizione
              </Typography>
              {fetcher.state !== "idle" && (
                <CircularProgress
                  size="20px"
                  sx={{ marginLeft: "12px", color: "#000000" }}
                />
              )}
            </Button>
          </fetcher.Form>
        </>
      );
    } else {
      // event.is_registration_required === true, regUuid doesn't include event
      return (
        <fetcher.Form
          method="POST"
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
    }
  }

  // TODO: introdurre isOnline
}
