import React, { useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import Stack from "@mui/material/Stack";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import useMediaQuery from "@mui/material/useMediaQuery";

import { useUser } from "../lib/cacheManager/user";
import { useEventAttendees } from "../lib/cacheManager/events";

const UserInfo = ({
  title,
  children,
  autoFormat = true,
  fullWidth = false,
}) => (
  <Grid item xs={fullWidth ? 12 : 6}>
    <Stack direction="column">
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
  </Grid>
);

const UserDialog = ({ user, open, onClose }) => {
  const theme = useTheme();

  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <Dialog fullScreen={fullScreen} open={open} onClose={onClose}>
      <DialogTitle>
        {user?.first_name} {user?.last_name}{" "}
      </DialogTitle>
      <Grid container rowSpacing={"24px"} sx={{ m: 2 }}>
        {/* <UserInfo title="Nome">{user?.first_name}</UserInfo>
        <UserInfo title="Cognome">{user?.last_name}</UserInfo> */}
        <UserInfo title="Codice socio">{user?.agesci_id}</UserInfo>
        <UserInfo title="Gruppo">{user?.scout_group?.name}</UserInfo>
        <UserInfo title="Zona">{user?.scout_group?.zone}</UserInfo>
        <UserInfo title="Regione">{user?.scout_group?.region}</UserInfo>
        <UserInfo title="Sottocampo">
          {user?.scout_group?.line?.subdistrict?.district?.name}
        </UserInfo>
        <UserInfo title="Contrada - Fila" autoFormat={false}>
          <Link to={`/mappa/?location=${user?.scout_group?.line?.location}`}>
            <Typography
              variant="subtitle2"
              fontSize="12px"
              fontWeight={600}
              sx={{
                color: "agesciPurple.main",
                textDecoration: "underline",
              }}
            >
              {user?.scout_group?.line?.subdistrict?.name} -{" "}
              {user?.scout_group?.line?.name}
            </Typography>
          </Link>
        </UserInfo>
        <UserInfo title="Email" fullWidth>
          {user?.email}
        </UserInfo>
        <UserInfo title="Numero" fullWidth>
          {user?.phone}
        </UserInfo>
        {user?.squads && user?.squads.length > 0 && (
          <UserInfo title="Pattuglie" fullWidth>
            {user.squads.map((s) => (
              <React.Fragment key={s}>
                {s.name}
                <br />
              </React.Fragment>
            ))}
          </UserInfo>
        )}
      </Grid>
      <DialogActions>
        <Button onClick={onClose} color="agesciPurple">
          Chiudi
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default function AttendeesList() {
  const { eventId } = useParams();
  const { user } = useUser();
  const { attendees } = useEventAttendees(eventId);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const navigate = useNavigate();

  if (!user.permissions.can_scan_qr) {
    navigate(`/eventi/${eventId}/`);
  }

  return (
    <>
      <Box sx={{ m: 2 }}>
        <Link to={`/eventi/${eventId}/`}>
          <Typography
            sx={{
              color: "agesciPurple.main",
              textDecoration: "underline",
            }}
          >
            Ritorna all'evento
          </Typography>
        </Link>
        <Typography fontSize="20px" fontWeight={600}>
          Elenco partecipanti
        </Typography>

        {attendees.map((attendee) => (
          <Card key={attendee.uuid} sx={{ m: 1 }}>
            <CardActionArea
              onClick={() => {
                setSelectedUser(attendee);
                setOpenDialog(true);
              }}
            >
              <CardContent>
                <Stack direction="row" justifyContent="space-between">
                  <Typography fontSize="14px" fontWeight={600}>
                    {attendee.first_name} {attendee.last_name}
                  </Typography>
                  <Typography fontSize="14px" fontWeight={400}>
                    {attendee.agesci_id}
                  </Typography>
                </Stack>
                <Typography fontSize="12px" fontWeight={400}>
                  {attendee.scout_group?.name} - {attendee.scout_group?.zone} -{" "}
                  {attendee.scout_group?.region}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        ))}
      </Box>
      <UserDialog
        user={selectedUser}
        open={openDialog}
        onClose={() => setOpenDialog(false)}
      />
    </>
  );
}
