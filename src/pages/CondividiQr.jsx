import Box from "@mui/material/Box";
import { QRCodeSVG } from "qrcode.react";

import { useUser } from "../lib/hooks/user";

export default function CondividiQr() {
  const user = useUser();
  const { first_name, last_name, phone, email } = user;
  const sharableInfo = JSON.stringify({ first_name, last_name, phone, email });
  return (
    <Box
      sx={{
        backgroundColor: "#ffffff",
        padding: "8px",
        borderRadius: "8px",
      }}
    >
      <QRCodeSVG value={sharableInfo} size={200} />
    </Box>
  );
}
