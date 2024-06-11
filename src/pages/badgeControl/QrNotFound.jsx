// Qr code non di tipo badge
import { useNavigate } from "react-router-dom";

import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import Typography from "@mui/material/Typography";

import MainContainer from "../../ui/BadgeControl/MainContainer";
import AccessButton from "../../ui/AccessButton";

export default function QrNotFound() {
  const navigate = useNavigate();
  return (
    <MainContainer scanButton={false}>
      <SentimentVeryDissatisfiedIcon
        sx={{
          fontSize: "64px",
          mb: "24px",
        }}
      />
      <Typography fontSize="16px" fontWeight={600} mb="24px">
        QR Code Non Trovato
      </Typography>
      <Typography fontSize="16px" mb="24px">
        Non risulta nessun QR Code corrispondente, riprova a scansionarlo
      </Typography>
      <AccessButton
        sx={{ mt: 0, color: "black" }}
        onClick={() => navigate("..", { relative: "path" })}
      >
        <Typography fontSize="14px" fontWeight={600}>
          Riprova
        </Typography>
      </AccessButton>
    </MainContainer>
  );
}
