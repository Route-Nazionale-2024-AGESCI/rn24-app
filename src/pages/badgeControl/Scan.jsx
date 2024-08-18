// Scansione del badge QR e navigazione in base al contenuto scansionato

import { useNavigate, useParams } from "react-router-dom";
import Typography from "@mui/material/Typography";

import { QrReader } from "react-qr-reader";

import MainContainer from "../../ui/BadgeControl/MainContainer";
import { decodeQr, getCameraConstraints, QRCodeScanError } from "../../lib/qr";
import { useEventAttendees } from "../../lib/cacheManager/events";
import { useEffect, useState } from "react";

export default function Scan() {
  const { eventId } = useParams();
  const { attendees } = useEventAttendees(eventId);

  const navigate = useNavigate();
  const baseURL = `/controlloAccessi/${eventId}/`;

  const attendeesUuid = attendees.map((attendee) => attendee.uuid);

  const handleScan = (scanData) => {
    if (scanData) {
      try {
        const decodedQr = decodeQr(scanData.text);
        if (["page", "event", "contact"].includes(decodedQr.type)) {
          navigate(baseURL + "bad-qr");
        } else if (decodedQr.type === "badge") {
          if (attendeesUuid.includes(decodedQr.userInfo.uuid))
            navigate(baseURL + "user-found/" + decodedQr.userInfo.uuid);
          else navigate(baseURL + "user-not-found");
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
  
  const [constraints, setConstraints] = useState()
 
  useEffect(() => {
    getCameraConstraints(setConstraints)
  },[])

  return (
    <MainContainer scanButton={false}>
      {constraints && <QrReader
        delay={300}
        constraints={constraints}
        onResult={handleScan}
        containerStyle={{
          borderRadius: "8px",
          border: "8px solid white",
          backgroundColor: "#000000",
          width: "300px",
          height: "300px",
        }}
      />}
      <Typography fontSize="16px" fontWeight={600} mt="24px">
        Inquadra il QR CODE del partecipante all'evento
      </Typography>
    </MainContainer>
  );
}
