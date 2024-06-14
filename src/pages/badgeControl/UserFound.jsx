// Utente regolarmente iscritto all'evento
import React from "react";
import { useParams, Link } from "react-router-dom";
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
import { useEventAttendees } from "../../lib/cacheManager/events";

const UserInfo = ({
  title,
  children,
  autoFormat = true,
  //fullWidth = false,
}) => (
  <Stack direction="column" mt="12px">
    <Typography fontSize="14px" fontWeight={600}>
      {title}:
    </Typography>
    {autoFormat ? (
      <Typography
        variant="subtitle2"
        fontSize="12px"
        fontWeight={400}
        sx={{ color: "#666A66" }}
      >
        {children}
      </Typography>
    ) : (
      children
    )}
  </Stack>
);

export default function UserFound() {
  const { userId, eventId } = useParams();
  const { attendees } = useEventAttendees(eventId);

  const attendee = attendees.find((attendee) => attendee.uuid === userId);
  console.log(attendee);

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
              {attendee.first_name} {attendee.last_name}
            </Typography>
          </Stack>
        </AccordionSummary>
        <AccordionDetails sx={{ textAlign: "left" }}>
          <UserInfo title="Codice socio">{attendee.agesci_id}</UserInfo>
          <UserInfo title="Gruppo">{attendee.scout_group?.name}</UserInfo>
          <UserInfo title="Zona">{attendee.scout_group?.zone}</UserInfo>
          <UserInfo title="Regione">{attendee.scout_group?.region}</UserInfo>
          <UserInfo title="Sottocampo">
            {attendee.scout_group?.line?.subdistrict?.district?.name}
          </UserInfo>
          <UserInfo title="Contrada - Fila" autoFormat={false}>
            <Link
              to={`/mappa/?location=${attendee.scout_group?.line?.location}`}
            >
              <Typography
                variant="subtitle2"
                fontSize="12px"
                fontWeight={600}
                sx={{
                  color: "agesciPurple.main",
                  textDecoration: "underline",
                }}
              >
                {attendee.scout_group?.line?.subdistrict?.name} -{" "}
                {attendee.scout_group?.line?.name}
              </Typography>
            </Link>
          </UserInfo>
          <UserInfo title="Email" fullWidth>
            {attendee.email}
          </UserInfo>
          <UserInfo title="Numero" fullWidth>
            {attendee.phone}
          </UserInfo>
          {attendee.squads && attendee.squads.length > 0 && (
            <UserInfo title="Pattuglie" fullWidth>
              {attendee.squads.map((s) => (
                <React.Fragment key={s}>
                  {s.name}
                  <br />
                </React.Fragment>
              ))}
            </UserInfo>
          )}
        </AccordionDetails>
      </Accordion>
    </MainContainer>
  );
}
