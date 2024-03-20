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
