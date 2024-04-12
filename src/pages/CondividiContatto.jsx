import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";

import QrCodeIcon from "@mui/icons-material/QrCode";
import KeyboardIcon from "@mui/icons-material/Keyboard";
import ContactlessIcon from "@mui/icons-material/Contactless";

import WhitePaper from "../ui/WhitePaper";
import BoxButton from "../ui/BoxButton";

export default function CondividiContatto() {
  const userCode = "1234567";
  return (
    <>
      <Typography fontSize="25px" fontWeight={900} sx={{ ml: "24px" }}>
        Condividi il tuo Contatto
      </Typography>
      <WhitePaper>
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
              to="/condividiContatto/nfc"
            />
            <BoxButton
              bgColor="agesciRed"
              text="Condividi QR Code"
              icon={<QrCodeIcon />}
              to="/condividiContatto/qr"
            />
          </Box>
          <Typography fontSize="14px" fontWeight={800} textAlign="center">
            Oppure
          </Typography>
          <Box
            color="#ffffff"
            sx={{
              backgroundColor: "agesciPurple.main",
              width: "90%",
              height: "130px",
              borderRadius: "8px",
              display: "flex",
              flexDirection: "column",
              gap: "8px",
              justifyContent: "center",
              textAlign: "center",
              padding: "12px",
            }}
          >
            <KeyboardIcon sx={{ mx: "auto" }} />
            <Typography fontSize="14px" fontWeight={600} textAlign="center">
              Condividi manualmente il tuo codice
            </Typography>
            <Typography fontSize="18px" fontWeight={800} textAlign="center">
              {userCode}
            </Typography>
          </Box>
        </Stack>
      </WhitePaper>
    </>
  );
}
