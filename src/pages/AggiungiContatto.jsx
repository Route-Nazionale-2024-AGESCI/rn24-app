import { Link as RouterLink } from "react-router-dom";

import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

import QrCodeIcon from "@mui/icons-material/QrCode";
import KeyboardIcon from "@mui/icons-material/Keyboard";
import ContactlessIcon from "@mui/icons-material/Contactless";

function BoxButton({ bgColor, icon, text, to, big = false }) {
  return (
    <Button
      color={bgColor}
      sx={{
        maxWidth: big ? "532px" : "260px",
        width: big ? "90%" : "45%",
        height: "130px",
        borderRadius: "8px",
        textTransform: "none",
        fontSize: "14px",
        lineHeight: "16px",
        fontWeight: "600",
        display: "flex",
        flexDirection: "column",
        gap: "8px",
        justifyContent: "center",
        textAlign: "center",
      }}
      component={RouterLink}
      to={to}
      variant="contained"
      disableElevation
    >
      {icon}
      {text}
    </Button>
  );
}

export default function AggiungiContatto() {
  return (
    <>
      <Typography
        fontSize="25px"
        fontWeight={900}
        sx={{ ml: "24px", height: "40px" }}
      >
        Aggiungi Contatto
      </Typography>
      <Box
        sx={{
          background: "white",
          textAlign: "center",
          borderRadius: "16px 16px 0 0",
          mt: "16px",
          mb: "-20px",
          pt: "40px",
          height: `calc(100vh - 228px)`,
        }}
      >
        <Stack spacing="32px" alignItems="center">
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              gap: "12px",
              justifyContent: "center",
              width: "100%",
            }}
          >
            <BoxButton
              bgColor="agesciGreen"
              icon={<ContactlessIcon />}
              text="Utilizza Sensore NFC"
              to="/"
            />
            <BoxButton
              bgColor="agesciRed"
              text="Scansiona QR Code"
              icon={<QrCodeIcon />}
              to="/"
            />
          </Box>
          <Typography fontSize="14px" fontWeight={800}>
            Oppure
          </Typography>
          <BoxButton
            bgColor="agesciPurple"
            to="/"
            text="Inserisci Codice Manualmente"
            icon={<KeyboardIcon />}
            big
          />
        </Stack>
      </Box>
    </>
  );
}
