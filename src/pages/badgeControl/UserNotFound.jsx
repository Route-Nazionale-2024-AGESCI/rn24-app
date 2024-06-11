// L'utente non risulta nell'elenco delle iscrizioni
import CancelIcon from "@mui/icons-material/Cancel";
import Typography from "@mui/material/Typography";

import MainContainer from "../../ui/BadgeControl/MainContainer";

export default function UserNotFound() {
  return (
    <MainContainer>
      <CancelIcon
        sx={{
          fontSize: "64px",
          mb: "24px",
        }}
      />
      <Typography fontSize="16px" fontWeight={600} mb="24px">
        Utente Non Registrato
      </Typography>
      <Typography fontSize="16px" mb="24px">
        L'utente non può partecipare all'evento in quanto non risulta essere
        iscritto
      </Typography>
    </MainContainer>
  );
}
