// Scansione del badge QR e navigazione in base al contenuto scansionato

import { useNavigate, useParams } from "react-router-dom";
import Typography from "@mui/material/Typography";

import { QrReader } from "react-qr-reader";

import MainContainer from "../../ui/BadgeControl/MainContainer";
import { decodeQr, QRCodeScanError } from "../../lib/qr";

export default function Scan() {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const baseURL = `/controlloAccessi/${eventId}/`;
  const handleScan = (scanData) => {
    if (scanData) {
      try {
        const decodedQr = decodeQr(scanData.text);
        if (["page", "event", "contact"].includes(decodedQr.type)) {
          navigate(baseURL + "bad-qr");
        } else if (decodedQr.type === "badge") {
          // TODO: search user id in registration list
          navigate(baseURL + "user-found");

          // else navigate("user-not-found")
        } else {
          navigate(baseURL + "qr-not-found");
        }
      } catch (error) {
        if (error instanceof QRCodeScanError) {
          navigate(baseURL + "qr-not-found");
        } else {
          console.error(error);
        }
      }
    }
  };

  return (
    <MainContainer scanButton={false}>
      <QrReader
        delay={300}
        constraints={{
          facingMode: { ideal: "environment" },
        }}
        onResult={handleScan}
        containerStyle={{
          borderRadius: "8px",
          border: "8px solid white",
          backgroundColor: "#000000",
          width: "300px",
          height: "300px",
        }}
      />
      <Typography fontSize="16px" fontWeight={600} mt="24px">
        Inquadra il QR CODE del partecipante all'evento
      </Typography>
    </MainContainer>
  );
}
