import { Link } from "react-router-dom";
import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";

import { QRCodeSVG } from "qrcode.react";

import WhitePaper from "../ui/WhitePaper";

import { useUser } from "../lib/cacheManager/user";

const formatDate = (date) =>
  date
    ? new Date(date)
        .toLocaleDateString("it-IT", {
          year: "numeric",
          month: "numeric",
          day: "numeric",
        })
        .replace(/\//g, "-")
    : "-";

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

export default function Profilo() {
  const { user } = useUser();
  let happinessPath = (user?.scout_group?.happiness_path ?? "")
    .replace(/_/g, " ")
    .toLowerCase();
  happinessPath =
    happinessPath.charAt(0).toUpperCase() + happinessPath.slice(1);

  return (
    <>
      <Typography
        fontSize="20px"
        fontWeight={900}
        sx={{ ml: "24px", color: "#2B2D2B" }}
      >
        Profilo Utente
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "start",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            backgroundColor: "#ffffff",
            padding: "8px",
            marginTop: " 20px",
            borderRadius: "8px",
            border: "4px solid #6D5095",
          }}
          component={Link}
          to="/badge"
        >
          <QRCodeSVG value={user.qr_code} size={100} />
        </Box>
      </Box>
      <Box sx={{ height: "32px" }} />
      <WhitePaper
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <Box
          sx={{
            marginX: "24px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-around",
          }}
        >
          <Grid container rowSpacing={"24px"}>
            <UserInfo title="Nome">{user?.first_name}</UserInfo>
            <UserInfo title="Cognome">{user?.last_name}</UserInfo>
            <UserInfo title="Codice socio">{user?.agesci_id}</UserInfo>
            <UserInfo title="Gruppo">{user?.scout_group?.name}</UserInfo>
            <UserInfo title="Zona">{user?.scout_group?.zone}</UserInfo>
            <UserInfo title="Regione">{user?.scout_group?.region}</UserInfo>
            <UserInfo title="Sottocampo">
              {user?.scout_group?.line?.subdistrict?.district?.name}
            </UserInfo>
            <UserInfo title="Contrada - Fila" autoFormat={false}>
              <Link
                to={`/mappa/?location=${user?.scout_group?.line?.location}`}
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
                  {user?.scout_group?.line?.subdistrict?.name} -{" "}
                  {user?.scout_group?.line?.name}
                </Typography>
              </Link>
            </UserInfo>
            <UserInfo title="Percorso di felicità" fullWidth>
              {happinessPath}
            </UserInfo>
            <UserInfo title="Email" fullWidth>
              {user?.email}
            </UserInfo>
            <UserInfo title="Numero" fullWidth>
              {user?.phone}
            </UserInfo>
            {user.squads && user.squads.length > 0 && (
              <UserInfo title="Pattuglie" fullWidth>
                {user.squads.map((s) => (
                  <React.Fragment key={s}>
                    {s.name}
                    <br />
                  </React.Fragment>
                ))}
              </UserInfo>
            )}
            <UserInfo title="Tipo documento">
              {user?.personal_data?.identity_document_type}
            </UserInfo>
            <UserInfo title="Numero documento">
              {user?.personal_data?.identity_document_number}
            </UserInfo>
            <UserInfo title="Data rilascio documento">
              {formatDate(user?.personal_data?.identity_document_issue_date)}
            </UserInfo>
            <UserInfo title="Data scadenza documento">
            {formatDate(user?.personal_data?.identity_document_expiry_date)}
            </UserInfo>
            <UserInfo title="Sedia a rotelle">
              {user?.personal_data?.accessibility_has_wheelchair ? "Si" : "No"}
            </UserInfo>
            <UserInfo title="Viaggia con accompagnatore non iscritto?">
              {user?.personal_data?.accessibility_has_caretaker_not_registered ? "Si" : "No"}
            </UserInfo>
            <UserInfo title="Pernotto in tenda">
              {user?.personal_data?.sleeping_is_sleeping_in_tent ? "Si" : "No"}
            </UserInfo>
            <UserInfo title="Richieste per il pernotto" fullWidth>
              {user?.personal_data?.sleeping_requests}
            </UserInfo>
            <UserInfo title="Per motivi di disabilità/patologie ho bisogno di dormire" fullWidth>
              {user?.personal_data?.sleeping_place}
            </UserInfo>
            <UserInfo title="Altre richieste pernotto" fullWidth>
              {user?.personal_data?.sleeping_requests_2}
            </UserInfo>
            <UserInfo title="Dieta Vegana">
              {user?.personal_data?.food_is_vegan ? "Si" : "No"}
            </UserInfo>
            <UserInfo title="Allergie/intolleranze ad alimenti da segnalare" fullWidth>
              {user?.personal_data?.food_diet_needed}
            </UserInfo>
            <UserInfo title="Elenco allergie/intolleranze alimentari" fullWidth>
              {user?.personal_data?.food_allergies}
            </UserInfo>
            <UserInfo title="Problemi negli spostamenti a piedi"  fullWidth>
              {user?.personal_data?.transportation_has_problems_moving_on_foot ? "Si" : "No"}
            </UserInfo>
            <UserInfo title="Necessita di trasporto" fullWidth>
              {user?.personal_data?.transportation_need_transport}
            </UserInfo>

            <UserInfo title="Allergie">
              {user?.personal_data?.health_has_allergies ? "Si" : "No"}
            </UserInfo>
            <UserInfo title="Descrizione allergie" fullWidth>
              {user?.personal_data?.health_allergies}
            </UserInfo>
            <UserInfo title="Disturbi motori">
              {user?.personal_data?.health_has_movement_disorders ? "Si" : "No"}
            </UserInfo>
            <UserInfo title="Descrizione disturbi motori" fullWidth>
              {user?.personal_data?.health_movement_disorders}
            </UserInfo>
            <UserInfo title="Patologie cardiovascolari/respiratorie/neurologiche">
              {user?.personal_data?.health_has_patologies ? "Si" : "No"}
            </UserInfo>
            <UserInfo title="Patologie accertate" fullWidth>
              {user?.personal_data?.health_patologies}
            </UserInfo>
          </Grid>
        </Box>
        <Box sx={{ height: "40px" }} />
      </WhitePaper>
    </>
  );
}
