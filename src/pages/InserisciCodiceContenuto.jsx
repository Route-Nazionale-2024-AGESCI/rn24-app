import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";

import AccessButton from "../ui/AccessButton";
import TextField from "../ui/TextField";
import { searchBySlug } from "../lib/cacheManager/pages";

export default function InserisciCodiceContenuto() {
  const [slug, setSlug] = useState("");
  const [page, setPage] = useState(null);
  const [notFound, setNotFound] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const searchView = (
    <>
      <Typography fontSize="16px" fontWeight={600} color="#ffffff">
        Inserisci il Codice del contenuto che vuoi visualizzare
      </Typography>
      <Box sx={{ height: "32px" }} />
      <TextField
        sx={{ maxWidth: "400px" }}
        placeholder="Inserisci Codice"
        value={slug}
        onChange={(event) => {
          setSlug(event.target.value);
        }}
      />
      <Box sx={{ height: "32px" }} />
      <AccessButton
        sx={{ opacity: loading ? "50%" : "100%", marginTop: 0 }}
        disabled={loading}
        onClick={async () => {
          setLoading(true);
          const page = await searchBySlug(slug);
          if (page === null) {
            setNotFound(true);
            setPage(null);
          } else {
            setPage(page);
            setNotFound(false);
          }
          setLoading(false);
        }}
      >
        <Typography fontSize="16px" fontWeight={600}>
          Cerca Contenuto
        </Typography>
        {loading && (
          <CircularProgress
            size="20px"
            sx={{ marginLeft: "12px", color: "#000000" }}
          />
        )}
      </AccessButton>
    </>
  );

  const foundView = (
    <>
      <CheckCircleOutlineIcon sx={{ fontSize: "64px", color: "#ffffff" }} />
      <Box sx={{ height: "32px" }} />
      <Typography fontSize="16px" fontWeight={600} color="#ffffff">
        Contenuto Trovato!
      </Typography>
      <Box sx={{ height: "32px" }} />
      <AccessButton onClick={() => navigate(`/pages/${page.uuid}`)}>
        <Typography fontSize="16px" fontWeight={600}>
          Visualizza
        </Typography>
      </AccessButton>
    </>
  );
  const notFoundView = (
    <>
      <SentimentVeryDissatisfiedIcon
        sx={{ fontSize: "64px", color: "#ffffff" }}
      />
      <Box sx={{ height: "32px" }} />
      <Typography fontSize="16px" fontWeight={600} color="#ffffff">
        Nessun Contenuto Trovato
      </Typography>
      <Box sx={{ height: "32px" }} />
      <AccessButton
        onClick={() => {
          setNotFound(false);
          setPage(null);
        }}
      >
        <Typography fontSize="16px" fontWeight={600}>
          Riprova
        </Typography>
      </AccessButton>
    </>
  );

  if (notFound) return notFoundView;
  if (page !== null) return foundView;
  return searchView;
}
