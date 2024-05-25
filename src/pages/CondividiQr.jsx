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
  getLocalStorageNote,
  getLocalStorageShareNote,
  getLocalStorageUrl,
  getLocalStorageShareUrl,
  setLocalStorageFirstName,
  setLocalStorageShareFirstName,
  setLocalStorageLastName,
  setLocalStorageShareLastName,
  setLocalStoragePhone,
  setLocalStorageSharePhone,
  setLocalStorageEmail,
  setLocalStorageShareEmail,
  setLocalStorageNote,
  setLocalStorageShareNote,
  setLocalStorageUrl,
  setLocalStorageShareUrl,
  initLocalSharableInfo,
} from "../lib/shareContactInfo";

import { encodeContact } from "../lib/qr";

import { useAuth } from "../contexts/auth";

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

export default function CondividiQr() {
  const { user } = useAuth();
  const userInfo = {
    firstName: user.first_name,
    lastName: user.last_name,
    phone: user.phone,
    email: user.email,
    note: "",
    url: "",
  };
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
  const [note, setNote] = useState(getLocalStorageNote());
  const [shareNote, setShareNote] = useState(getLocalStorageShareNote());
  const [url, setUrl] = useState(getLocalStorageUrl());
  const [shareUrl, setShareUrl] = useState(getLocalStorageShareUrl());
  const encodedString = encodeContact(
    user.uuid,
    shareFirstName ? firstName.trim() : null,
    shareLastName ? lastName.trim() : null,
    sharePhone ? phone : null,
    shareEmail ? email : null,
    shareNote ? note.trim() : null,
    shareUrl ? url : null
  );
  return (
    <>
      <Box
        sx={{
          backgroundColor: "#ffffff",
          padding: "8px",
          marginTop: " 20px",
          borderRadius: "8px",
        }}
      >
        {((shareFirstName && firstName !== "") ||
          (shareLastName && lastName !== "")) &&
        ((sharePhone && phone !== "") ||
          (shareEmail && email !== "") ||
          (shareUrl && url !== "")) ? (
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
              fontWeight={600}
              fontSize="20px"
              color="agesciPurple.main"
            >
              Devi condividere almeno{" "}
              {!(shareFirstName && firstName !== "") &&
              !(shareLastName && lastName !== "")
                ? "il nome o il cognome"
                : "il numero di telefono, l'email o un link"}
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
          width: "90%",
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
                  const val = event.target.value.trim();
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
                  const val = event.target.value.trim();
                  setEmail(val);
                  setLocalStorageEmail(val);
                }}
              />
            </Stack>
          </Grid>
        </InfoBox>
        <InfoBox>
          <Grid item xs={2} sx={{ display: "flex" }} alignItems={"center"}>
            <CheckBox
              checked={shareNote}
              onChange={(event) => {
                const val = event.target.checked;
                setShareNote(val);
                setLocalStorageShareNote(val);
              }}
            />
          </Grid>
          <Grid item xs={10}>
            <Stack direction="column" gap="8px">
              <Typography variant="body1" fontSize="14px" fontWeight={600}>
                Note
              </Typography>
              <TextField
                value={note}
                onChange={(event) => {
                  const val = event.target.value;
                  setNote(val);
                  setLocalStorageNote(val);
                }}
              />
            </Stack>
          </Grid>
        </InfoBox>
        <InfoBox>
          <Grid item xs={2} sx={{ display: "flex" }} alignItems={"center"}>
            <CheckBox
              checked={shareUrl}
              onChange={(event) => {
                const val = event.target.checked;
                setShareUrl(val);
                setLocalStorageShareUrl(val);
              }}
            />
          </Grid>
          <Grid item xs={10}>
            <Stack direction="column" gap="8px">
              <Typography variant="body1" fontSize="14px" fontWeight={600}>
                Link
              </Typography>
              <TextField
                value={url ? url : ""}
                onChange={(event) => {
                  const val = event.target.value.trim();
                  setUrl(val);
                  setLocalStorageUrl(val);
                }}
              />
            </Stack>
          </Grid>
        </InfoBox>
      </Stack>
      <Box sx={{ height: "120px" }} />
    </>
  );
}
