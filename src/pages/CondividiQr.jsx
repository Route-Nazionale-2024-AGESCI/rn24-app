import { useLoaderData } from "react-router-dom";
import { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import CheckBox from "../ui/CheckBox";
import TextField from "../ui/TextField";
import { QRCodeSVG } from "qrcode.react";
import {
  getLocalStorageFirstName,
  getLocalStorageShareFirstName,
  getLocalStorageLastName,
  getLocalStorageShareLastName,
  getLocalStoragePhone,
  getLocalStorageSharePhone,
  getLocalStorageEmail,
  getLocalStorageShareEmail,
  setLocalStorageFirstName,
  setLocalStorageShareFirstName,
  setLocalStorageLastName,
  setLocalStorageShareLastName,
  setLocalStoragePhone,
  setLocalStorageSharePhone,
  setLocalStorageEmail,
  setLocalStorageShareEmail,
  initLocalSharableInfo,
} from "../lib/shareContactInfo";

import { encodeContact } from "../lib/qr";

import { getUser } from "../lib/dataManager/user";

const InfoBox = ({ children }) => (
  <Grid
    container
    sx={{
      bgcolor: "#E2DCEA",
      borderRadius: "8px",
      paddingX: "12px",
      paddingY: "8px",
    }}
  >
    {children}
  </Grid>
);

export async function loader() {
  const user = await getUser();
  const { first_name, last_name, phone, email } = user;

  return {
    userInfo: { firstName: first_name, lastName: last_name, phone, email },
  };
}

export default function CondividiQr() {
  const { userInfo } = useLoaderData();
  initLocalSharableInfo(userInfo);
  const [firstName, setFirstName] = useState(getLocalStorageFirstName());
  const [shareFirstName, setShareFirstName] = useState(
    getLocalStorageShareFirstName()
  );
  const [lastName, setLastName] = useState(getLocalStorageLastName());
  const [shareLastName, setShareLastName] = useState(
    getLocalStorageShareLastName()
  );
  const [phone, setPhone] = useState(getLocalStoragePhone());
  const [sharePhone, setSharePhone] = useState(getLocalStorageSharePhone());
  const [email, setEmail] = useState(getLocalStorageEmail());
  const [shareEmail, setShareEmail] = useState(getLocalStorageShareEmail());
  const encodedString = encodeContact(
    shareFirstName ? firstName : null,
    shareLastName ? lastName : null,
    sharePhone ? phone : null,
    shareEmail ? email : null
  );
  return (
    <Box
      sx={{
        width: "100%",
        paddingX: "16px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: "100px",
      }}
    >
      <Box
        sx={{
          backgroundColor: "#ffffff",
          padding: "8px",
          borderRadius: "8px",
        }}
      >
        {(shareFirstName || shareLastName) && (sharePhone || shareEmail) ? (
          <QRCodeSVG value={encodedString} size={200} />
        ) : (
          <Box
            sx={{
              width: "200px",
              height: "200px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography
              // variant="h4"
              fontWeight={600}
              fontSize="20px"
              color="agesciPurple.main"
            >
              Devi condividere almeno{" "}
              {!shareFirstName && !shareLastName
                ? "il nome o il cognome"
                : "il numero di telefono o l'email"}
            </Typography>
          </Box>
        )}
      </Box>
      <Typography color="#ffffff" fontSize="16px" fontWeight={600} my="24px">
        Seleziona i dati che vuoi condividere
      </Typography>
      <Stack
        gap="8px"
        direction="column"
        sx={{
          maxWidth: "400px",
          width: "100%",
          marginX: "16px",
          textAlign: "left",
        }}
      >
        <InfoBox>
          <Grid item xs={2} sx={{ display: "flex" }} alignItems={"center"}>
            <CheckBox
              checked={shareFirstName}
              onChange={(event) => {
                const val = event.target.checked;
                setShareFirstName(val);
                setLocalStorageShareFirstName(val);
              }}
            />
          </Grid>
          <Grid item xs={10}>
            <Stack direction="column" gap="8px">
              <Typography variant="body1" fontSize="14px" fontWeight={600}>
                Nome
              </Typography>
              <TextField
                value={firstName}
                onChange={(event) => {
                  const val = event.target.value;
                  setFirstName(val);
                  setLocalStorageFirstName(val);
                }}
              />
            </Stack>
          </Grid>
        </InfoBox>
        <InfoBox>
          <Grid item xs={2} sx={{ display: "flex" }} alignItems={"center"}>
            <CheckBox
              checked={shareLastName}
              onChange={(event) => {
                const val = event.target.checked;
                setShareLastName(val);
                setLocalStorageShareLastName(val);
              }}
            />
          </Grid>
          <Grid item xs={10}>
            <Stack direction="column" gap="8px">
              <Typography variant="body1" fontSize="14px" fontWeight={600}>
                Cognome
              </Typography>
              <TextField
                value={lastName}
                onChange={(event) => {
                  const val = event.target.value;
                  setLastName(val);
                  setLocalStorageLastName(val);
                }}
              />
            </Stack>
          </Grid>
        </InfoBox>
        <InfoBox>
          <Grid item xs={2} sx={{ display: "flex" }} alignItems={"center"}>
            <CheckBox
              checked={sharePhone}
              onChange={(event) => {
                const val = event.target.checked;
                setSharePhone(val);
                setLocalStorageSharePhone(val);
              }}
            />
          </Grid>
          <Grid item xs={10}>
            <Stack direction="column" gap="8px">
              <Typography variant="body1" fontSize="14px" fontWeight={600}>
                Telefono
              </Typography>
              <TextField
                value={phone}
                onChange={(event) => {
                  const val = event.target.value;
                  setPhone(val);
                  setLocalStoragePhone(val);
                }}
              />
            </Stack>
          </Grid>
        </InfoBox>
        <InfoBox>
          <Grid item xs={2} sx={{ display: "flex" }} alignItems={"center"}>
            <CheckBox
              checked={shareEmail}
              onChange={(event) => {
                const val = event.target.checked;
                setShareEmail(val);
                setLocalStorageShareEmail(val);
              }}
            />
          </Grid>
          <Grid item xs={10}>
            <Stack direction="column" gap="8px">
              <Typography variant="body1" fontSize="14px" fontWeight={600}>
                Email
              </Typography>
              <TextField
                value={email}
                onChange={(event) => {
                  const val = event.target.value;
                  setEmail(val);
                  setLocalStorageEmail(val);
                }}
              />
            </Stack>
          </Grid>
        </InfoBox>
      </Stack>
    </Box>
  );
}
