import React, { useState } from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import KeyboardIcon from "@mui/icons-material/Keyboard";
import TipsAndUpdatesIcon from "@mui/icons-material/TipsAndUpdates";
import { QrReader } from "react-qr-reader";
import AccessButton from "../ui/AccessButton";
import generateVCardBlob from "../lib/vCard";
import decodeQr from "../lib/qrDecoder";
import BoxButton from "../ui/BoxButton";

// Struttura dei dati codificati nel QR Code:
// {
//   'contact': {
//     "firstName":"Pierino",
//     "lastName":"Rossi",
//     "phone":"1231231231",
//     "email":"pr@email.com"
//   }
// }

// oppure
// {
//   'url': 'link/to/page/'
// }

export default function ScansionaQrContenuto() {
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  const [profileDetected, setProfileDetected] = useState(null);
  const [vCardUrl, setVCardUrl] = useState(null);
  const [savedContact, setSavedContact] = useState(false);

  const handleScan = (scanData) => {
    if (scanData) {
      const decodedQr = decodeQr(scanData);
      if (decodedQr.error) {
        setError(decodedQr.errorMsg);
        setData(null);
        setProfileDetected(null);
        console.error(decodedQr.errorMsg);
      } else if (decodedQr.url) {
        setError(null);
        setData(decodedQr);
        setProfileDetected(null);
      } else {
        setError(null);
        setData(null);
        setProfileDetected(decodedQr);
      }
    }
  };

  return (
    <>
      {/* Canvas per la scansione del QR Code */}
      {!data && !error && !profileDetected && (
        <>
          <QrReader
            delay={300}
            facingMode="environment"
            onResult={handleScan}
            containerStyle={{
              borderRadius: "8px",
              border: "8px solid white",
              backgroundColor: "#000000",
              width: "240px",
              height: "240px",
            }}
          />
          <Box sx={{ height: "24px" }} />
          <Typography
            sx={{ color: "#ffffff", marginX: "24px" }}
            fontSize="16px"
            fontWeight={600}
          >
            Inquadra il QR CODE della pagina che vuoi visualizzare
          </Typography>
        </>
      )}

      {/* Url trovato: Button per la navigazione */}
      {data && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            color: "#ffffff",
            width: "100%",
          }}
        >
          <CheckCircleOutlineIcon sx={{ fontSize: "64px" }} />
          <Box sx={{ height: "60px" }} />
          <Typography fontSize="16px" fontWeight={600}>
            Contenuto Trovato!
          </Typography>
          <Box sx={{ height: "56px" }} />

          <AccessButton
            component="a"
            href={/* TODO: page link */ ""}
            sx={{
              marginTop: "0px",
              width: "90%",
              maxWidth: "400px",
              height: "36px",
              color: "#000000",
            }}
          >
            <Typography fontSize="16px" fontWeight={600}>
              Visualizza
            </Typography>
          </AccessButton>
        </Box>
      )}

      {/* Errore nell'interpretazione del QR Code */}
      {error && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            color: "#ffffff",
            justifyContent: "space-around",
            height: "100%",
            marginBottom: "80px",
            overflow: "scroll",
          }}
        >
          <SentimentVeryDissatisfiedIcon sx={{ fontSize: "64px" }} />
          <Typography fontSize="16px" fontWeight={600}>
            Nessun contenuto Trovato
          </Typography>
          <Typography fontSize="14px" fontWeight={400} sx={{ marginX: "24px" }}>
            {error}
          </Typography>
          <AccessButton
            onClick={() => {
              setData(null);
              setError(null);
              setProfileDetected(null);
            }}
            sx={{ marginTop: 0 }}
          >
            <Typography fontSize="16px" fontWeight={600} color={"#000000"}>
              Riprova
            </Typography>
          </AccessButton>
          <Typography>Oppure</Typography>
          <BoxButton
            bgColor="white"
            to="/ricercaContenuto/codice"
            text="Inserisci Codice Manualmente"
            icon={<KeyboardIcon />}
            big
          />
        </Box>
      )}
      {profileDetected && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            color: "#ffffff",
          }}
        >
          <TipsAndUpdatesIcon sx={{ fontSize: "64px" }} />
          <Box sx={{ height: "60px" }} />
          <Typography
            fontSize="16px"
            fontWeight={600}
            sx={{ marginX: "24px", marginBottom: "24px" }}
          >
            Sembra che si tratti di un contatto
          </Typography>
          <Box
            sx={{
              bgcolor: "#ffffff",
              borderRadius: "8px",
              padding: "16px",
              display: "flex",
              flexDirection: "column",
              color: "#000000",
              textAlign: "left",
              maxWidth: "400px",
              minWidth: "260px",
            }}
          >
            <Stack direction={"row"} alignItems={"center"}>
              <Box
                sx={{
                  width: "40px",
                  height: "40px",
                  bgcolor: "#FDEEEE",
                  borderRadius: "20px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <PersonAddAlt1Icon
                  sx={{ fontSize: "20px", color: "agesciRed.main" }}
                />
              </Box>
              <Box sx={{ width: "16px" }} />
              <Stack direction={"column"}>
                <Typography fontSize="14px" fontWeight={600}>
                  {profileDetected.firstName} {profileDetected.lastName}
                </Typography>
                {profileDetected.phone && (
                  <Typography
                    fontSize="12px"
                    fontWeight={400}
                    sx={{ color: "#6D5095" }}
                  >
                    {profileDetected.phone}
                  </Typography>
                )}
                {profileDetected.email && (
                  <Typography
                    fontSize="12px"
                    fontWeight={400}
                    sx={{ color: "#6D5095" }}
                  >
                    {profileDetected.email}
                  </Typography>
                )}
              </Stack>
            </Stack>
            <Box sx={{ height: "16px" }} />
            {!savedContact ? (
              <AccessButton
                component="a"
                href={vCardUrl}
                sx={{ marginTop: "0px", width: "90%", height: "36px" }}
                onClick={() => {
                  const vCardBlob = generateVCardBlob(
                    profileDetected.firstName,
                    profileDetected.lastName,
                    profileDetected.phone,
                    profileDetected.email
                  );
                  const url = window.URL.createObjectURL(vCardBlob);
                  setVCardUrl(url);
                }}
                download={`${profileDetected.firstName}-${profileDetected.lastName}.vcf`}
                onAnimationEnd={() => setSavedContact(true)}
              >
                <Typography fontSize="16px" fontWeight={600}>
                  Salva contatto
                </Typography>
              </AccessButton>
            ) : (
              <Box
                sx={{
                  backgroundColor: "agesciRed.main",
                  borderRadius: "8px",
                  marginTop: "0px",
                  width: "90%",
                  height: "36px",
                  marginLeft: "auto",
                  marginRight: "auto",
                  color: "#ffffff",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Typography fontSize="16px" fontWeight={600}>
                  Salvato con Successo
                </Typography>
              </Box>
            )}
          </Box>
        </Box>
      )}
    </>
  );
}
