import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import NavBar from "../ui/NavBar";
import AppBar from "../ui/AppBar";
import Stack from "@mui/material/Stack";
import {
  AddContactButton,
  BookletButton,
  QrCodeButton,
} from "../ui/CardButton";
import EventSummaryCard from "../ui/EventSummaryCard";
import FloatingActionButton from "../ui/FloatingActionButton";
import ImageCard from "../ui/ImageCard";

export default function Home() {
  return (
    <>
      <Box sx={{ mt: "40px", mx: "24px", mb: "100px" }}>
        <AppBar />
        <Typography
          fontFamily="Montserrat"
          variant="h6"
          fontSize="20px"
          fontWeight={900}
        >
          Ciao, Gianfilippo
        </Typography>
        <Typography
          fontFamily="Montserrat"
          variant="p"
          fontSize="14px"
          fontWeight={400}
        >
          Bentornato nell'App di RN24
        </Typography>
        <Box height="48px" />
        <AddContactButton />
        <Box height="32px" />
        <Typography
          variant="h5"
          fontFamily="Montserrat"
          fontSize="14px"
          fontWeight={800}
          mb="8px"
        >
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
          <EventSummaryCard
            title="Titolo dell’evento lorem ipsum simplit dolor elment"
            standName="Nome stand"
            startDateTime={new Date(2024, 7, 26, 10, 0, 0, 0)}
            endDateTime={new Date(2024, 7, 26, 12, 0, 0, 0)}
          />
          <EventSummaryCard
            title="Evento2"
            standName="Villa Buri"
            startDateTime={new Date(2024, 7, 26, 15, 0, 0, 0)}
            endDateTime={new Date(2024, 7, 26, 16, 45, 0, 0)}
          />
          <EventSummaryCard
            title="Evento con un titolo decisamente troppo lungo che dovrebbe essere troncato. Se dovessero essere inseriti eventi con titoli esageratamente lunghi, questo non deve forzare la UI verso comportamenti inaspettati"
            standName="Verona piccola Gerusalemme"
            startDateTime={new Date(2024, 7, 27, 9, 0, 0, 0)}
            endDateTime={new Date(2024, 7, 27, 11, 0, 0, 0)}
          />
          <EventSummaryCard
            title=""
            standName="Evento senza titolo?"
            startDateTime={new Date(2024, 7, 27, 14, 30, 0, 0)}
            endDateTime={new Date(2024, 7, 27, 16, 30, 0, 0)}
          />
        </Box>
        <Box height="32px" />
        <Typography
          variant="h5"
          fontFamily="Montserrat"
          fontSize="14px"
          fontWeight={800}
          mb="8px"
        >
          Materiali
        </Typography>
        <Stack direction="row" spacing="16px">
          <BookletButton />
          <QrCodeButton />
        </Stack>
        <Box height="32px" />
        <Typography
          variant="h5"
          fontFamily="Montserrat"
          fontSize="14px"
          fontWeight={800}
          mb="8px"
        >
          Servizio
        </Typography>
        <ImageCard
          imgSrc="Verona.jpg"
          imgAlt="Verona"
          title="Tracce"
          subtitle="Scopri tutte le informazioni logistiche sul servizio della tua Comunità Capi"
        />
      </Box>
      <FloatingActionButton />
      <NavBar />
    </>
  );
}
