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

import { getUser } from "../lib/dataManager/user";
import { getEventList, getEventRegistrations } from "../lib/dataManager/events";
import { getLocationList } from "../lib/dataManager/locations";

export async function loader() {
  const user = await getUser();
  const events = await getEventList();
  const registrations = await getEventRegistrations();
  const locations = await getLocationList();
  return { user, events, locations, registrations };
}

export default function Home() {
  const { user, events, locations, registrations } = useLoaderData();
  console.log(registrations);

  const buildEventCards = (events) => {
    const regUuid = registrations.map((reg) => reg.event);
    console.log(regUuid);
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
