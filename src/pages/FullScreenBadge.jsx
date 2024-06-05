import Box from "@mui/material/Box";
import { QRCodeSVG } from "qrcode.react";

import { getUser } from "../lib/cacheManager/user";
import { useLoaderData } from "react-router-dom";

export async function loader() {
  const user = await getUser();
  return { user };
}

export default function FullScreenBadge() {
  const { user } = useLoaderData();
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
