import Typography from "@mui/material/Typography";
import WhitePaper from "../ui/WhitePaper";
import { redirect } from "react-router-dom";
import { getSicurezza } from "../lib/cacheManager/pages";

export async function loader() {
  const paginaSicurezza = await getSicurezza();
  if (paginaSicurezza !== null && paginaSicurezza !== undefined)
    return redirect(`/pages/${paginaSicurezza.uuid}`);
  return null;
}

export default function Avvisi() {
  return (
    <>
      <Typography
        fontSize="25px"
        fontWeight={900}
        sx={{ margin: "16px", color: "#2B2D2B" }}
      >
        Sicurezza
      </Typography>
      <WhitePaper sx={{ paddingX: "24px", paddingTop: "20px" }}>
        <Typography variant="h6">Informazioni di sicurezza</Typography>
        <Typography variant="body1" mt={6}>
          Al momento non sono disponibili indicazioni per la sicurezza durante
          la Route Nazionale.
        </Typography>
        <Typography variant="body1" mt={6}>
          Mantieni sempre aggioranta la tua App controllando l'icona delle
          notifiche!
        </Typography>
      </WhitePaper>
    </>
  );
}
