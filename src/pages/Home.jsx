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
  useEventRegistrations,
} from "../lib/cacheManager/events";
import { useEventInvitations } from "../lib/cacheManager/events";
import { getLocationList } from "../lib/cacheManager/locations";

import { useUser } from "../lib/cacheManager/user";

import { getLocalStorageFirstName } from "../lib/shareContactInfo";

export async function loader() {
  const { events } = await getEventList();
  const { locations } = await getLocationList();
  return { events, locations };
}

// TODO: mostrare diversamente dagli altri gli eventi di tipo LOGISTICO ??
export default function Home() {
  const { user } = useUser();
  const { events, locations } = useLoaderData();
  const { registrations } = useEventRegistrations();
  useEventInvitations(); // caching locally
  const name = getLocalStorageFirstName() ?? user.first_name ?? "";
  // Nelle eventCards l'utente vede l'elenco degli eventi a cui parteciperà, presenti in registrations
  const buildEventCards = (events) => {
    const regUuid = registrations.map((reg) => reg.event);
    return events
      .filter((ev) => regUuid.includes(ev.uuid))
      .filter((ev) => {
        const endDt = new Date(ev.ends_at);
        const now = new Date();
        return endDt >= now;
      })
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
        Ciao, {name}
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
        Non stare a guardare!
      </Typography>
      <ImageCard
        imgSrc="Verona.jpg"
        imgAlt="Verona"
        title="Iscriviti a un Evento"
        subtitle="Progetta la tua Route Capi scegliendo quale Felicità vuoi vivere"
      />
      <Box sx={{ height: "40px" }} />
    </Box>
  );
}
