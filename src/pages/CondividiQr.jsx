import { useLoaderData } from "react-router-dom";
import Box from "@mui/material/Box";
import { QRCodeSVG } from "qrcode.react";

import { getUser } from "../lib/dataManager/user";

export async function loader() {
  const user = await getUser();
  return { user };
}

export default function CondividiQr() {
  const { user } = useLoaderData();
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
