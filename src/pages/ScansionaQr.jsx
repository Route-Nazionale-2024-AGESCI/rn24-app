import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import TipsAndUpdatesIcon from "@mui/icons-material/TipsAndUpdates";
import { QrReader } from "react-qr-reader";
import AccessButton from "../ui/AccessButton";
import generateVCardBlob from "../lib/vCard";
import { decodeQr } from "../lib/qr";

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

export default function ScansionaQr() {
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  const [urlDetected, setUrlDetected] = useState(null);
  const [vCardUrl, setVCardUrl] = useState(null);
  const [savedContact, setSavedContact] = useState(false);
  const navigate = useNavigate();

  const handleScan = (scanData) => {
    if (scanData) {
      const decodedQr = decodeQr(scanData);
      if (decodedQr.error) {
        setError(decodedQr.errorMsg);
        setData(null);
        setUrlDetected(null);
        console.error(decodedQr.errorMsg);
      } else if (decodedQr.url) {
        setError(null);
        setData(null);
        setUrlDetected({ url: decodedQr.url, type: decodedQr.type });
      } else {
        setError(null);
        setUrlDetected(null);
        setData(decodedQr);
      }
    }
    //}
  };

  return (
    <>
      {/* Canvas per la scansione del QR Code */}
      {!data && !error && !urlDetected && (
        <>
          <QrReader
            delay={300}
            constraints={{
              facingMode: { exact: "environment" },
            }}
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
            Inquadra il QR CODE della persona che vuoi aggiungere
          </Typography>
        </>
      )}

      {/* Card con le informazioni del contatto trovato */}
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
            Contatto Trovato!
          </Typography>
          <Box sx={{ height: "56px" }} />
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
                  sx={{ fontSize: "20px", color: "agesciGreen.main" }}
                />
              </Box>
              <Box sx={{ width: "16px" }} />
              <Stack direction={"column"}>
                <Typography fontSize="14px" fontWeight={600}>
                  {data.firstName} {data.lastName}
                </Typography>
                {data.phone && (
                  <Typography
                    fontSize="12px"
                    fontWeight={400}
                    sx={{ color: "#6D5095" }}
                  >
                    {data.phone}
                  </Typography>
                )}
                {data.email && (
                  <Typography
                    fontSize="12px"
                    fontWeight={400}
                    sx={{ color: "#6D5095" }}
                  >
                    {data.email}
                  </Typography>
                )}
              </Stack>
            </Stack>
            <Box sx={{ height: "16px" }} />
            {/* TODO: aggiungere le altre info nel link di aggiunta ai contatti */}
            {!savedContact ? (
              <AccessButton
                component="a"
                href={vCardUrl}
                sx={{ marginTop: "0px", width: "90%", height: "36px" }}
                onClick={() => {
                  const vCardBlob = generateVCardBlob(
                    data.firstName,
                    data.lastName,
                    data.phone,
                    data.email
                  );
                  const url = window.URL.createObjectURL(vCardBlob);
                  setVCardUrl(url);
                }}
                download={`${data.firstName}-${data.lastName}.vcf`}
                onAnimationEnd={() => setSavedContact(true)}
              >
                <Typography fontSize="16px" fontWeight={600}>
                  Salva contatto
                </Typography>
              </AccessButton>
            ) : (
              <Box
                sx={{
                  backgroundColor: "agesciGreen.main",
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
            Si è verificato un errore...
          </Typography>
          <Typography fontSize="14px" fontWeight={400} sx={{ marginX: "24px" }}>
            {error}
          </Typography>
          <AccessButton
            onClick={() => {
              setData(null);
              setError(null);
              setUrlDetected(null);
            }}
            sx={{ marginTop: 0 }}
          >
            <Typography fontSize="16px" fontWeight={600} color={"#000000"}>
              Riprova
            </Typography>
          </AccessButton>
        </Box>
      )}
      {urlDetected && (
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
          <Typography fontSize="16px" fontWeight={600} sx={{ marginX: "24px" }}>
            Sembra che si tratti di{" "}
            {urlDetected.type === "page" && "una pagina"}{" "}
            {urlDetected.type === "event" && "un evento"}
          </Typography>
          <AccessButton
            onClick={() => {
              setData(null);
              setError(null);
              const { url } = urlDetected;
              setUrlDetected(null);
              navigate(url);
            }}
          >
            <Typography fontSize="16px" fontWeight={600} color="#000000">
              Vai!
            </Typography>
          </AccessButton>
        </Box>
      )}
    </>
  );
}
