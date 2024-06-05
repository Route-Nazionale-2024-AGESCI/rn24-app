import Box from "@mui/material/Box";
import { QRCodeSVG } from "qrcode.react";

import { useUser } from "../lib/cacheManager/user";

export default function FullScreenBadge() {
  const { user } = useUser();
  return (
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
  );
}
