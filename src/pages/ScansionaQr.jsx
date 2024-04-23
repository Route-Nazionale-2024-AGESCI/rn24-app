import React, { useState } from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { QrReader } from "react-qr-reader";
import AccessButton from "../ui/AccessButton";

export default function ScansionaQr() {
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  const [vCardUrl, setVCardUrl] = useState(null);

  const handleScan = (data, error) => {
    if (data) {
      try {
        const contactInfo = JSON.parse(data.text);
        // Informazioni di contatto mancanti
        if (
          contactInfo.phone === undefined ||
          contactInfo.first_name === undefined
        ) {
          throw new Error(
            "Il QR Code scansionato non contiene le informazioni di contatto corrette."
          );
        }
        setData(contactInfo);
      } catch (error) {
        setError(error.message);
      }
    }

    // Errore nella scansione del QR Code
    if (error) {
      setError(error.message);
    }
  };

  function generateAndPrepareVCard() {
    const vcardData = `
  BEGIN:VCARD
  VERSION:3.0
  FN:${data.first_name} ${data.last_name}
  TEL:${data.phone}
  ${data.email && `EMAIL:${data.email}`}
  END:VCARD
  `;

    // Crea un nuovo Blob contenente i dati vCard
    const blob = new Blob([vcardData], { type: "text/vcard;charset=utf-8" });

    // Genera un URL per il Blob
    const url = window.URL.createObjectURL(blob);
    setVCardUrl(url);
  }

  return (
    <>
      {/* Canvas per la scansione del QR Code */}
      {!data && !error && (
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
            sx={{ color: "#ffffff" }}
            fontSize="16px"
            fontWeight={600}
          >
            Scansiona il QR CODE della persona che vuoi aggiungere
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
                  sx={{ fontSize: "20px", color: "agesciRed.main" }}
                />
              </Box>
              <Box sx={{ width: "16px" }} />
              <Stack direction={"column"}>
                <Typography fontSize="14px" fontWeight={600}>
                  {data.first_name} {data.last_name}
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
            <AccessButton
              component="a"
              href={vCardUrl}
              sx={{ marginTop: "0px", width: "90%", height: "36px" }}
              onClick={generateAndPrepareVCard}
              download="contact.vcf"
            >
              <Typography fontSize="16px" fontWeight={600}>
                Salva contatto
              </Typography>
            </AccessButton>
          </Box>
        </Box>
      )}

      {/* Errore nell'interpretazione del QR Code */}
      {error && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <ErrorOutlineIcon sx={{ fontSize: "64px" }} />
          <Box sx={{ height: "60px" }} />
          <Typography fontSize="16px" fontWeight={600}>
            Si è verificato un errore...
          </Typography>
          <AccessButton
            onClick={() => {
              setData(null);
              setError(null);
            }}
          >
            <Typography fontSize="16px" fontWeight={600}>
              Riprova
            </Typography>
          </AccessButton>
        </Box>
      )}
    </>
  );
}
