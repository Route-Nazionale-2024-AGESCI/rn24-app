import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";

import QrCodeIcon from "@mui/icons-material/QrCode";
import KeyboardIcon from "@mui/icons-material/Keyboard";

import WhitePaper from "../ui/WhitePaper";
import BoxButton from "../ui/BoxButton";

export default function Contatti() {
  return (
    <>
      <Typography
        fontSize="25px"
        fontWeight={900}
        sx={{ ml: "24px", height: "40px" }}
      >
        Contatti
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
              text="Scansiona QR Code"
              icon={<QrCodeIcon />}
              to="/aggiungiContatto/qr"
              big
            />
          </Box>
          <Typography fontSize="14px" fontWeight={800} textAlign="center">
            Oppure
          </Typography>
          <BoxButton
            bgColor="agesciPurple"
            to="/condividiContatto"
            text="Condividi il tuo QR Code"
            icon={<KeyboardIcon />}
            big
          />
        </Stack>
      </WhitePaper>
    </>
  );
}
