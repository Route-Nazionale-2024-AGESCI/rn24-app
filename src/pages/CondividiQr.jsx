import Box from "@mui/material/Box";
import { QRCodeSVG } from "qrcode.react";

import useUser from "../lib/hooks/useUser";

export default function CondividiQr() {
  const user = useUser();
  const userInfo = JSON.stringify(user);
  return (
    <Box
      sx={{
        backgroundColor: "#ffffff",
        padding: "8px",
        borderRadius: "8px",
      }}
    >
      <QRCodeSVG value={userInfo} size={200} />
    </Box>
  );
}
