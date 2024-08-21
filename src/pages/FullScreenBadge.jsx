import Box from "@mui/material/Box";
import { QRCodeSVG } from "qrcode.react";

import { useUser } from "../lib/cacheManager/user";
import { Typography } from "@mui/material";

export default function FullScreenBadge() {
  const { user } = useUser();
  return (
    <>
    <Box
      sx={{
        paddingX: "12px",
      }}>
      <Typography color="#ffffff" variant="body1" fontWeight={600} mb="32px">
        Badge per il controllo degli accessi
      </Typography>
    </Box>
    <Box
      sx={{
        backgroundColor: "#ffffff",
        padding: "8px",
        borderRadius: "8px",
        border: "8px solid #FDEEEE",
      }}
    >
      <QRCodeSVG value={user.qr_code} size={300} />
    </Box>
    <Box
      sx={{
        paddingX: "12px",
      }}>
      <Typography variant="body2" color="#ffffff" my="32px">
        {user.agesci_id ? user.agesci_id + " - " : ""}
        {user.first_name ? user.first_name + " " : ""}
        {user.last_name ? user.last_name : ""}
      </Typography>
    </Box>
  </>
  );
}
