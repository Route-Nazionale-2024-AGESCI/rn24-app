import { Link } from "react-router-dom";
import * as React from "react";
import { useNetworkState } from "@uidotdev/usehooks";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Tab from "@mui/material/Tab";

import { QRCodeSVG } from "qrcode.react";

import WhitePaper from "../ui/WhitePaper";

import { useUser } from "../lib/cacheManager/user";
import { notifyAvailabilityForExtraServices } from "../lib/dataManager/user";

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

const TabTitle = ({ children }) => (
  <Typography fontSize="18px" fontWeight="600" sx={{ marginY: "24px" }}>
    {children}
  </Typography>
);

export default function Profilo() {
  const { user, mutate } = useUser();
  const [tab, setTab] = React.useState(0);
  const networkState = useNetworkState();
  let happinessPath = user?.scout_group?.happiness_path ?? "";
  //   .replace(/_/g, " ")
  //   .toLowerCase();
  // happinessPath =
  //   happinessPath.charAt(0).toUpperCase() + happinessPath.slice(1);

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          mx: "24px",
        }}
      >
        <Typography fontSize="20px" fontWeight={900} sx={{ color: "#2B2D2B" }}>
          Profilo Utente
        </Typography>
        <Box
          sx={{
            backgroundColor: "#ffffff",
            padding: "0px",
            borderRadius: "2px",
            border: "2px solid #6D5095",
            height: "40px",
            width: "40px",
          }}
          component={Link}
          to="/badge"
        >
          <img
            src="/qr_example.gif"
            alt="Link al QR code personale"
            height={40}
            width={40}
          />
        </Box>
      </Box>
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
          <TabContext value={tab}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <TabList
                variant="scrollable"
                onChange={(_, newValue) => setTab(newValue)}
              >
                <Tab
                  label="Base"
                  value={0}
                  sx={{
                    textTransform: "none",
                    fontSize: "14px",
                    fontWeight: 600,
                  }}
                />
                <Tab
                  label="Documento"
                  value={1}
                  sx={{
                    textTransform: "none",
                    fontSize: "14px",
                    fontWeight: 600,
                  }}
                />
                <Tab
                  label="Accessibilità"
                  value={2}
                  sx={{
                    textTransform: "none",
                    fontSize: "14px",
                    fontWeight: 600,
                  }}
                />
                <Tab
                  label="Alimentazione"
                  value={3}
                  sx={{
                    textTransform: "none",
                    fontSize: "14px",
                    fontWeight: 600,
                  }}
                />
              </TabList>
            </Box>
            <TabPanel value={0} sx={{ paddingX: 0 }}>
              <TabTitle>Informazioni base</TabTitle>
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
                  <UserInfo title="Pattuglie" fullWidth autoFormat={false}>
                    {user.squads.map((s) => (
                      <React.Fragment key={s}>
                        <Link to={`/pages/${s.page}`}>
                          <Typography
                            variant="subtitle2"
                            fontSize="12px"
                            fontWeight={600}
                            sx={{
                              color: "agesciPurple.main",
                              textDecoration: "underline",
                            }}
                          >
                            {s.name}
                          </Typography>
                        </Link>

                        {networkState.online && s.name === "Tangram Team" && (
                          <>
                            <Typography
                              variant="subtitle2"
                              fontSize="12px"
                              fontWeight={400}
                              sx={{ mt: "8px", mb: "4px" }}
                            >
                              {user.is_available_for_extra_service
                                ? "Sei disponibile a fare dei servizi aggiuntivi. Vuoi ritirare la tua disponibilità?"
                                : "Sei disponibile a fare dei servizi aggiuntivi?"}
                            </Typography>
                            <Button
                              variant="outlined"
                              color="agesciPurple"
                              size="small"
                              sx={{ maxWidth: "80px" }}
                              onClick={() =>
                                notifyAvailabilityForExtraServices(
                                  !user.is_available_for_extra_service
                                ).then(() => mutate())
                              }
                            >
                              {user.is_available_for_extra_service
                                ? "Ritira"
                                : "Si"}
                            </Button>
                          </>
                        )}
                        <br />
                      </React.Fragment>
                    ))}
                  </UserInfo>
                )}
              </Grid>
            </TabPanel>
            <TabPanel value={1} sx={{ paddingX: 0 }}>
              <TabTitle>Informazioni documento</TabTitle>
              <Grid container rowSpacing={"24px"}>
                <UserInfo title="Tipologia documento" fullWidth>
                  {user?.personal_data?.identity_document_type}
                </UserInfo>
                <UserInfo title="Numero documento" fullWidth>
                  {user?.personal_data?.identity_document_number}
                </UserInfo>
                <UserInfo title="Data rilascio documento" fullWidth>
                  {formatDate(
                    user?.personal_data?.identity_document_issue_date
                  )}
                </UserInfo>
                <UserInfo title="Data scadenza documento" fullWidth>
                  {formatDate(
                    user?.personal_data?.identity_document_expiry_date
                  )}
                </UserInfo>
              </Grid>
            </TabPanel>
            <TabPanel value={2} sx={{ paddingX: 0 }}>
              <TabTitle>Accessibilità</TabTitle>
              <Grid container rowSpacing={"24px"}>
                <UserInfo title="Sedia a rotelle">
                  {user?.personal_data?.accessibility_has_wheelchair
                    ? "Si"
                    : "No"}
                </UserInfo>
                <UserInfo title="Accompagnatore">
                  {user?.personal_data
                    ?.accessibility_has_caretaker_not_registered
                    ? "Si"
                    : "No"}
                </UserInfo>
                <UserInfo title="Tenda">
                  {user?.personal_data?.sleeping_is_sleeping_in_tent
                    ? "Si"
                    : "No"}
                </UserInfo>
                <UserInfo title="Richieste per il pernotto" fullWidth>
                  {user?.personal_data?.sleeping_requests}
                </UserInfo>
                <UserInfo
                  title="Per motivi di disabilità/patologie ho bisogno di dormire"
                  fullWidth
                >
                  {user?.personal_data?.sleeping_place}
                </UserInfo>
                <UserInfo title="Altre richieste pernotto" fullWidth>
                  {user?.personal_data?.sleeping_requests_2}
                </UserInfo>

                <UserInfo title="Problemi negli spostamenti a piedi" fullWidth>
                  {user?.personal_data
                    ?.transportation_has_problems_moving_on_foot
                    ? "Si"
                    : "No"}
                </UserInfo>
                <UserInfo
                  title="Necessità di un accompagnatore fornito dall'organizzazione durante l'evento"
                  fullWidth
                >
                  {user?.personal_data?.transportation_need_transport}
                </UserInfo>
              </Grid>
              <TabTitle>Salute</TabTitle>
              <Grid container rowSpacing={"24px"}>
                <UserInfo title="Disturbi motori" fullWidth>
                  {user?.personal_data?.health_has_movement_disorders
                    ? "Si"
                    : "No"}
                </UserInfo>
                {user?.personal_data?.health_has_movement_disorders && (
                  <UserInfo title="Descrizione disturbi motori" fullWidth>
                    {user?.personal_data?.health_movement_disorders}
                  </UserInfo>
                )}
                <UserInfo title="Patologie" fullWidth>
                  {user?.personal_data?.health_has_patologies ? "Si" : "No"}
                </UserInfo>
                {user?.personal_data?.health_has_patologies && (
                  <UserInfo title="Patologie accertate" fullWidth>
                    {user?.personal_data?.health_patologies}
                  </UserInfo>
                )}
                <UserInfo title="Allergie" fullWidth>
                  {user?.personal_data?.health_has_allergies ? "Si" : "No"}
                </UserInfo>
                {user?.personal_data?.health_has_allergies && (
                  <UserInfo title="Descrizione allergie" fullWidth>
                    {user?.personal_data?.health_allergies}
                  </UserInfo>
                )}
              </Grid>
            </TabPanel>
            <TabPanel value={3} sx={{ paddingX: 0 }}>
              <Grid container rowSpacing={"24px"}>
                <UserInfo title="Dieta" fullWidth>
                  {user?.personal_data?.food_diet_needed}
                </UserInfo>
                <UserInfo title="Allergie o intolleranze alimentari" fullWidth>
                  {user?.personal_data?.food_allergies}
                </UserInfo>
                <UserInfo title="Dieta Vegana">
                  {user?.personal_data?.food_is_vegan ? "Si" : "No"}
                </UserInfo>
              </Grid>
            </TabPanel>
          </TabContext>
        </Box>
        <Box sx={{ height: "40px" }} />
      </WhitePaper>
    </>
  );
}
