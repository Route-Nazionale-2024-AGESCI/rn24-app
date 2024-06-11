// Problema nella scansione del qr code (messa a fuoco, schermo sporco...)
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import Typography from "@mui/material/Typography";

import MainContainer from "../../ui/BadgeControl/MainContainer";

export default function BadQr() {
  return (
    <MainContainer>
      <SentimentVeryDissatisfiedIcon
        sx={{
          fontSize: "64px",
          mb: "24px",
        }}
      />
      <Typography fontSize="16px" fontWeight={600} mb="24px">
        QR Code Errato
      </Typography>
      <Typography fontSize="16px" mb="24px">
        Verifica che l'utente ti abbia mostrato il QR Code dalla pagina di
        profilo
      </Typography>
    </MainContainer>
  );
}
