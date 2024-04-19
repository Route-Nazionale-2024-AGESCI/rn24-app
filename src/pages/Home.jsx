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

import { useUser } from "../lib/hooks/user";
import { useEventList } from "../lib/hooks/events";
import { useLocations } from "../lib/hooks/locations";

const buildEventCards = (events, locations) => {
  return events.map((ev) => (
    <EventSummaryCard
      title={ev.name}
      standName={
        locations.find((loc) => loc.uuid === ev.location)?.name ||
        "Unnamed location"
      }
      startDateTime={new Date(ev.starts_at)}
      endDateTime={new Date(ev.ends_at)}
    />
  ));
};

export default function Home() {
  const user = useUser();
  const events = useEventList();
  const locations = useLocations();
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
        {buildEventCards(events, locations)}
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
