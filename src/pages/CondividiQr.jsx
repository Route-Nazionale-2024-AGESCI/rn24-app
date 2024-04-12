import Box from "@mui/material/Box";
import { QRCodeSVG } from "qrcode.react";

export default function CondividiQr() {
  return (
    <Box
      sx={{
        backgroundColor: "#ffffff",
        padding: "8px",
        borderRadius: "8px",
      }}
    >
      <QRCodeSVG value="1234567" size={200} />
    </Box>
  );
}
