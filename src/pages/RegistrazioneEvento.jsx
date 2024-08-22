import { useLoaderData, Link } from "react-router-dom";
import { useState, useEffect, useMemo } from "react";

import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import Fade from "@mui/material/Fade";

import { useNetworkState } from "@uidotdev/usehooks";

import AccessButton from "../ui/AccessButton";
import UnsubscribeModal from "../ui/UnsubscribeModal";

import {
  getEvent,
  getEventList,
  useEventInvitations,
  useEventRegistrations,
} from "../lib/cacheManager/events";

import {
  registerToEvent,
  deleteRegistrationToEvent,
} from "../lib/dataManager/events";

import { useUser } from "../lib/cacheManager/user";

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

const ErrorAlert = ({ errorMsg, onClose }) => (
  <Fade in={errorMsg !== null}>
    <Alert
      severity="error"
      onClose={onClose}
      sx={{
        width: "80%",
        maxWidth: "400px",
        position: "fixed",
        bottom: "100px",
        left: "50%",
        translate: `calc(-50%)`, // - 16px)`,
        zIndex: "2000",
      }}
    >
      {errorMsg}
    </Alert>
  </Fade>
);

const capitalize = (str) => `${str[0].toUpperCase()}${str.slice(1)}`;

export async function loader({ params }) {
  const event = await getEvent(params.eventId);
  const { events } = await getEventList();
  return { event, events };
}

export default function RegistrazioneEvento() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const { event, events } = useLoaderData();
  const regStartDT = event.registrations_open_at ?? null;
  const regEndDT = event.registrations_close_at ?? null;
  const startDt = event.starts_at;
  const { invitations } = useEventInvitations();
  const { registrations, mutate } = useEventRegistrations();
  const networkState = useNetworkState();
  const { user } = useUser();

  const regUuid = registrations.map((r) => r.event);
  const invUuid = invitations.map((i) => i.uuid);

  const registeredEvent = useMemo(
    () =>
      regUuid.find((uuid) =>
        events.filter((e) => e.kind === event.kind).some((e) => e.uuid === uuid)
      ),
    [events, regUuid, event.kind]
  );

  useEffect(() => {
    if (error !== null) {
      const timer = setTimeout(() => {
        setError(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  const checkRegistrationPeriod = () => {
    const now = new Date();
    if (new Date(startDt) < now) return false;
    if (regStartDT !== null && new Date(regStartDT) > now) return false;
    if (regEndDT !== null && new Date(regEndDT) < now) return false;
    return true;
  };

  /*
    Clausola di sicurezza: l'utente non dovrebbe poter vedere gli eventi a cui non è
    invitato.
  */
  if (!invUuid.includes(event.uuid)) return null;

  if (registeredEvent && registeredEvent !== event.uuid) {
    return (
      <Box
        sx={{
          paddingX: "24px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <GreenBox>
          <Typography fontWeight={600} fontSize="16px">
            Sei già registrato ad un evento di questo tipo.
          </Typography>
        </GreenBox>
        <Box sx={{ height: "32px" }} />
        <AccessButton component={Link} to={`/eventi/${registeredEvent}`}>
          <Typography fontSize="16px" fontWeight={600}>
            Modifica la tua iscrizione
          </Typography>
        </AccessButton>
      </Box>
    );
  }

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
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <GreenBox>
            <Typography fontWeight={600} fontSize="16px">
              Sei registrato a questo evento
            </Typography>
            <Typography fontWeight={400} fontSize="14px">
              ID: {event.id} - {user?.first_name} {user?.last_name}
            </Typography>
          </GreenBox>
          <Box height="16px" />
          {networkState.online && checkRegistrationPeriod() && (
            <>
              <Box
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Button
                  variant="text"
                  sx={{
                    textTransform: "none",
                    color: "#000000",
                    opacity: loading ? "50%" : "100%",
                    maxWidth: "400px",
                  }}
                  onClick={() => setOpenModal(true)}
                >
                  <Typography fontSize="16px" fontWeight={600}>
                    Annulla Iscrizione
                  </Typography>
                  {loading && (
                    <CircularProgress
                      size="20px"
                      sx={{ marginLeft: "12px", color: "#000000" }}
                    />
                  )}
                </Button>
              </Box>
              <UnsubscribeModal
                open={openModal}
                onClose={() => setOpenModal(false)}
                unsubscribe={async () => {
                  setOpenModal(false);
                  try {
                    setLoading(true);
                    await deleteRegistrationToEvent(event.uuid);
                    mutate(
                      registrations.filter((reg) => reg.event !== event.uuid)
                    );
                  } catch (err) {
                    console.error(err);
                    if (
                      Array.isArray(err?.response?.data) &&
                      err?.response?.status === 400
                    ) {
                      setError(capitalize(err.response.data[0]));
                    } else {
                      setError("Si è verificato un errore, riprova più tardi");
                    }
                  } finally {
                    setLoading(false);
                  }
                }}
              />
            </>
          )}
          <ErrorAlert errorMsg={error} onClose={() => setError(null)} />
        </Box>
      );
    } else if (networkState.online && checkRegistrationPeriod()) {
      return (
        <>
          <Box
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <AccessButton
              sx={{ opacity: loading ? "50%" : "100%" }}
              disabled={loading}
              onClick={async () => {
                try {
                  setLoading(true);
                  const res = await registerToEvent(event.uuid);
                  mutate([...registrations, { event: res.event }]);
                } catch (err) {
                  console.error(err);
                  if (
                    Array.isArray(err?.response?.data) &&
                    err?.response?.status === 400
                  ) {
                    setError(capitalize(err.response.data[0]));
                  } else {
                    setError("Si è verificato un errore, riprova più tardi");
                  }
                } finally {
                  setLoading(false);
                }
              }}
            >
              <Typography fontSize="16px" fontWeight={600}>
                Registrati a questo evento
              </Typography>
              {loading && (
                <CircularProgress
                  size="20px"
                  sx={{ marginLeft: "12px", color: "#000000" }}
                />
              )}
            </AccessButton>
          </Box>
          <ErrorAlert errorMsg={error} onClose={() => setError(null)} />
        </>
      );
    }
    return null;
  }
}
