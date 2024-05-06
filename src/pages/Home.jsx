import { useState, useContext } from "react";
import { useLoaderData } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import {
  AddContactButton,
  BookletButton,
  QrCodeButton,
} from "../ui/CardButton";
import EventSummaryCard from "../ui/EventSummaryCard";
import ImageCard from "../ui/ImageCard";

import {
  getEventList,
  getEventRegistrations,
} from "../lib/cacheManager/events";
import { getLocationList } from "../lib/cacheManager/locations";

import { AuthContext } from "../contexts/auth";

export async function loader() {
  const events = await getEventList();
  const registrations = await getEventRegistrations();
  const locations = await getLocationList();
  return { events, registrations, locations };
}

export default function Home() {
  const { user } = useContext(AuthContext);
  const { events, registrations, locations } = useLoaderData();
  // Nelle eventCards l'utente vede l'elenco degli eventi a cui parteciperà, presenti in registrations
  const buildEventCards = (events) => {
    const regUuid = registrations.map((reg) => reg.event);
    return events
      .filter((ev) => regUuid.includes(ev.uuid))
      .map((ev, index) => (
        <EventSummaryCard
          event={ev}
          location={locations.find((l) => l.uuid === ev.location)}
          key={index}
        />
      ));
  };
  return (
    <Box sx={{ mx: "24px" }}>
      <Typography variant="h6" fontSize="20px" fontWeight={900}>
        Ciao, {user.first_name}
      </Typography>
      <Typography variant="body1" fontSize="14px" fontWeight={400}>
        Bentornato nell'App di RN24
      </Typography>
      <Box height="48px" />
      <AddContactButton />
      <Box height="32px" />
      <Typography variant="h5" fontSize="14px" fontWeight={800} mb="8px">
        Prossimi eventi
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          overflow: "auto",
          gap: "8px",
        }}
      >
        {buildEventCards(events)}
      </Box>
      <Box height="32px" />
      <Typography variant="h5" fontSize="14px" fontWeight={800} mb="8px">
        Materiali
      </Typography>
      <Stack direction="row" spacing="16px">
        <BookletButton />
        <QrCodeButton />
      </Stack>
      <Box height="32px" />
      <Typography variant="h5" fontSize="14px" fontWeight={800} mb="8px">
        Servizio
      </Typography>
      <ImageCard
        imgSrc="Verona.jpg"
        imgAlt="Verona"
        title="Tracce"
        subtitle="Scopri tutte le informazioni logistiche sul servizio della tua Comunità Capi"
      />
    </Box>
  );
}
