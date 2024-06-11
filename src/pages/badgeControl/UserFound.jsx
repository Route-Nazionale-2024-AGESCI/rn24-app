// Utente regolarmente iscritto all'evento
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import PersonIcon from "@mui/icons-material/Person";

import MainContainer from "../../ui/BadgeControl/MainContainer";
export default function UserFound() {
  return (
    <MainContainer>
      <CheckCircleOutlineIcon
        sx={{
          fontSize: "64px",
          mb: "24px",
        }}
      />
      <Typography fontSize="16px" fontWeight={600} mb="24px">
        Utente Registrato
      </Typography>
      <Typography fontSize="16px" mb="24px">
        L'utente risulta regolarmente registrato all'evento e può partecipare
      </Typography>
      <Accordion sx={{ maxWidth: "400px" }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <Stack direction="row" alignItems="center">
            <Box
              sx={{
                display: "inline-flex",
                justifyContent: "center",
                alignItems: "center",
                width: "40px",
                height: "40px",
                backgroundColor: "#EBF6F0",
                borderRadius: "200px",
                mr: "16px",
              }}
            >
              <PersonIcon
                sx={{ fontSize: "16px", color: "agesciGreen.main" }}
              />
            </Box>
            <Typography fontSize="16px" fontWeight={600}>
              Nome e cognome
            </Typography>
          </Stack>
        </AccordionSummary>
        <AccordionDetails>Altre info dell'utente</AccordionDetails>
      </Accordion>
    </MainContainer>
  );
}
