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

export default function Home() {
  return (
    <>
      <Box sx={{ mt: "40px", mx: "24px" }}>
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
        <EventSummaryCard
          title="Titolo dell’evento lorem ipsum simplit dolor elment"
          standName="Nome stand"
          startDateTime={new Date(2024, 7, 26, 10, 0, 0, 0)}
          endDateTime={new Date(2024, 7, 26, 12, 0, 0, 0)}
        />
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
      </Box>
      <NavBar />
    </>
  );
}
