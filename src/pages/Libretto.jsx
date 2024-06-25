import Typography from "@mui/material/Typography";
import WhitePaper from "../ui/WhitePaper";
import { getLibretto } from "../lib/cacheManager/pages";
import { redirect } from "react-router-dom";

export async function loader() {
  const paginaLibretto = await getLibretto();
  if (paginaLibretto !== null && paginaLibretto !== undefined)
    return redirect(`/pages/${paginaLibretto.uuid}`);
  return null;
}

export default function Libretto() {
  return (
    <>
      <Typography
        fontSize="25px"
        fontWeight={900}
        sx={{ margin: "16px", color: "#2B2D2B" }}
      >
        Libretto
      </Typography>
      <WhitePaper sx={{ paddingX: "24px", paddingTop: "20px" }}>
        <Typography variant="body1" mt={6}>
          Al momento non sono ancora stati caricati materiali per il libretto
          della Route Nazionale.
        </Typography>
      </WhitePaper>
    </>
  );
}
