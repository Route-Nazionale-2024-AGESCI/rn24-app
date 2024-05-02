import { useState } from "react";
import { useLoaderData, Form } from "react-router-dom";

import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import PersonIcon from "@mui/icons-material/Person";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import PlaceIcon from "@mui/icons-material/Place";

import WhitePaper from "../ui/WhitePaper";

import getEventColor from "../lib/eventColor";
import { italianMonth } from "../lib/italianDate";

import { getLocation } from "../lib/dataManager/locations";
import {
  getEvent,
  getEventInvitations,
  getEventRegistrations,
} from "../lib/dataManager/events";
import { getPage } from "../lib/dataManager/pages";
import AccessButton from "../ui/AccessButton";

/*
  Responses:
    201 - {"event":"event-uuid","is_personal":bool}
    400 - ["error message"]
    403 - {"detail":"non sono state immesse le credenziali di autenticazione"}
    404 - {"detail": "No Event matches the given query"}
    415 - {"detail":"tipo di media text/plain... non supportato"}
*/

export async function action({ params }) {
  const eventUuid = params.eventId;
  console.log("TOKEN ", process.env.REACT_APP_API_TOKEN);
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
  ).then((res) => res.json());
  console.log(res);
  return res;
}

export async function loader({ params }) {
  const event = await getEvent(params.eventId);
  const location = await getLocation(event.location);
  const description = await getPage(event.page);
  const invitations = await getEventInvitations();

  // unique real Req, won't be retrieved by cache if we're online
  const registrations = await getEventRegistrations();
  return { event, location, description, invitations, registrations };
}

export default function Evento() {
  const [registrationsRequestStatus, setRegistrationsRequestStatus] =
    useState();
  // pending, {response.status}, not-started
  const { event, location, description, invitations, registrations } =
    useLoaderData();

  const standName = location?.name ?? "Luogo non definito";
  const startDT = event?.starts_at ? new Date(event.starts_at) : undefined;
  const endDT = event?.ends_at ? new Date(event.ends_at) : undefined;
  const registrationDT = event?.registrations_open_at
    ? new Date(event.registrations_open_at)
    : undefined;
  const regUuid = registrations.map((r) => r.event);
  const invUuid = invitations.map((i) => i.uuid);

  // TODO: introdurre isOnline
  const canUserRegister =
    event.is_registration_required === true && invUuid.includes(event.uuid);
  const userAlreadyRegistered =
    canUserRegister && registrations.includes(event.uuid);

  return (
    <>
      <Typography
        variant="h1"
        fontSize="25px"
        fontWeight={900}
        sx={{ margin: "16px", color: "#2B2D2B" }}
      >
        {event.name}
      </Typography>
      <WhitePaper
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <Box
          sx={{
            marginX: "24px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-around",
          }}
        >
          <Grid container rowSpacing={"24px"}>
            <Grid item xs={6}>
              <Stack direction="column">
                <Typography fontSize="14px" fontWeight={600}>
                  Modulo:
                </Typography>
                <Typography
                  fontSize="16px"
                  fontWeight={600}
                  textTransform="capitalize"
                  color={getEventColor(event.kind).main}
                >
                  {event.kind.toLowerCase()}
                </Typography>
              </Stack>
            </Grid>
            <Grid item xs={6}>
              <Stack direction="column">
                <Typography fontSize="14px" fontWeight={600}>
                  Numero Iscritti:
                </Typography>
                <Stack direction={"row"} alignItems={"center"}>
                  <Typography
                    fontSize="14px"
                    fontWeight={600}
                    color="agesciPurple.main"
                  >
                    10/25
                  </Typography>
                  <PersonIcon
                    fontSize="14px"
                    color="agesciPurple"
                    sx={{
                      translate: "0 -1px",
                    }}
                  />
                </Stack>
              </Stack>
            </Grid>
            <Grid item xs={6}>
              <Stack direction="column">
                <Typography fontSize="14px" fontWeight={600}>
                  Data:
                </Typography>
                <Stack direction="row" spacing="8px" alignItems="center">
                  <CalendarMonthIcon sx={{ fontSize: 12, color: "#666A66" }} />
                  <Typography
                    variant="subtitle2"
                    fontSize="12px"
                    fontWeight={400}
                    sx={{ color: "#666A66" }}
                  >
                    {startDT.getDate()} {italianMonth[startDT.getMonth()]}
                  </Typography>
                </Stack>
              </Stack>
            </Grid>
            <Grid item xs={6}>
              <Stack direction="column">
                <Typography fontSize="14px" fontWeight={600}>
                  Orario:
                </Typography>

                <Stack direction="row" spacing="8px" alignItems="center">
                  <AccessTimeIcon sx={{ fontSize: 12, color: "#666A66" }} />
                  <Typography
                    variant="subtitle2"
                    fontSize="12px"
                    fontWeight={400}
                    sx={{ color: "#666A66" }}
                  >
                    {startDT.getHours().toString().padStart(2, "0")}:
                    {startDT.getMinutes().toString().padStart(2, "0")} -{" "}
                    {endDT.getHours().toString().padStart(2, "0")}:
                    {endDT.getMinutes().toString().padStart(2, "0")}
                  </Typography>
                </Stack>
              </Stack>
            </Grid>
            {registrationDT !== undefined ? (
              <>
                <Grid item xs={6}>
                  <Stack direction="column">
                    <Typography fontSize="14px" fontWeight={600}>
                      Apertura iscrizioni:
                    </Typography>
                    <Stack direction="row" spacing="8px" alignItems="center">
                      <CalendarMonthIcon
                        sx={{ fontSize: 12, color: "#666A66" }}
                      />
                      <Typography
                        variant="subtitle2"
                        fontSize="12px"
                        fontWeight={400}
                        sx={{ color: "#666A66" }}
                      >
                        {registrationDT.getDate()}{" "}
                        {italianMonth[registrationDT.getMonth()]}
                      </Typography>
                    </Stack>
                  </Stack>
                </Grid>
                <Grid item xs={6}>
                  <Stack direction="column">
                    <Typography fontSize="14px" fontWeight={600}>
                      Orario iscrizioni:
                    </Typography>
                    <Stack direction="row" spacing="8px" alignItems="center">
                      <AccessTimeIcon sx={{ fontSize: 12, color: "#666A66" }} />
                      <Typography
                        variant="subtitle2"
                        fontSize="12px"
                        fontWeight={400}
                        sx={{ color: "#666A66" }}
                      >
                        {registrationDT.getHours().toString().padStart(2, "0")}:
                        {registrationDT
                          .getMinutes()
                          .toString()
                          .padStart(2, "0")}
                      </Typography>
                    </Stack>
                  </Stack>
                </Grid>
              </>
            ) : null}
          </Grid>
          <Stack direction="column" marginY={"24px"}>
            <Typography fontSize="14px" fontWeight={600}>
              Luogo:
            </Typography>
            <Stack direction="row" spacing="8px" alignItems="center">
              <PlaceIcon sx={{ fontSize: 12, color: "#666A66" }} />
              <Typography
                variant="subtitle2"
                fontSize="12px"
                fontWeight={400}
                textAlign="left"
                mb="4px"
                sx={{ color: "#666A66" }}
              >
                {standName}
              </Typography>
            </Stack>
          </Stack>
          {description && (
            <Stack direction="column">
              <Typography fontSize="14px" fontWeight={600}>
                Descrizione:
              </Typography>
              <Typography
                dangerouslySetInnerHTML={{ __html: description.body }}
              />
            </Stack>
          )}
        </Box>
        {canUserRegister && !userAlreadyRegistered && (
          <Form method="post">
            <AccessButton
              sx={{ opacity: "50%" }}
              type="submit"
              //onClick={() => {
              // set req status on 'pending'
              // POST req
              // optimistic UI: if POST succeeded, show green box
              // optimistic UI: if posti-esauriti, show red box
              // if POST succeeded, GET registrations (will automatically rerender component, on useLoaderData change?)
              // if posti-esauriti ... how to track registrations number?
              //}}
              disabled={registrationsRequestStatus === "pending"}
            >
              <Typography fontSize="16px" fontWeight={600}>
                Registrati a questo evento
              </Typography>
            </AccessButton>
          </Form>
        )}
      </WhitePaper>
    </>
  );
}
