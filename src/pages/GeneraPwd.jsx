import { useState, useEffect } from "react";

import { Form } from "react-router-dom";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import FormControl from "@mui/material/FormControl";
import Alert from "@mui/material/Alert";
import Fade from "@mui/material/Fade";
import CircularProgress from "@mui/material/CircularProgress";

import TextField from "../ui/TextField";
import AccessButton from "../ui/AccessButton";
import BackToLogin from "../ui/BackToLogin";

import { passwordGenerate } from "../lib/dataManager/pwdReset";

const ErrorAlert = ({ errorMsg, onClose }) => (
  <Fade in={errorMsg !== null}>
    <Alert
      severity="error"
      onClose={onClose}
      sx={{
        width: "80%",
        maxWidth: "400px",
        position: "fixed",
        bottom: "100px",
        left: "50%",
        translate: `calc(-50%)`, // - 16px)`,
        zIndex: "2000",
      }}
    >
      {errorMsg}
    </Alert>
  </Fade>
);

const SuccessAlert = ({ msg, onClose }) => (
  <Fade in={msg !== null}>
    <Alert
      severity="success"
      onClose={onClose}
      sx={{
        width: "80%",
        maxWidth: "400px",
        position: "fixed",
        bottom: "100px",
        left: "50%",
        translate: `calc(-50%)`, // - 16px)`,
        zIndex: "2000",
      }}
    >
      {msg}
    </Alert>
  </Fade>
);

export default function GeneraPwd() {
  const [codice, setCodice] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const enableSubmit = codice !== "";

  useEffect(() => {
    if (error !== null) {
      const timer = setTimeout(() => {
        setError(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  const handleSubmit = async () => {
    try {
      setLoading(true);
      await passwordGenerate({ username: codice });
      setSuccess(true);
    } catch (error) {
      setError("Si è verificato un errore: " + error.response.data.message);
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const RecoveryForm = (
    <Form
      style={{
        width: "100%",
        maxWidth: "400px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <FormControl color="agesciPurple">
          <Typography id="codice-label" fontSize="14px" fontWeight={600}>
            Codice socio / Alias
          </Typography>
          <TextField
            id="codice-input"
            onChange={(ev) => {
              setCodice(ev.target.value);
            }}
            fullWidth
            placeholder="Inserisci codice socio o alias"
            sx={{
              mt: "8px",
            }}
            inputProps={{ "aria-labelledby": "codice-label" }}
          />
        </FormControl>
        <AccessButton
          disabled={!enableSubmit || loading}
          sx={{ opacity: enableSubmit && !loading ? 1.0 : 0.5 }}
          onClick={handleSubmit}
        >
          <Typography fontSize="16px" fontWeight={600}>
            Registrati
          </Typography>
          {loading && (
            <CircularProgress
              size="20px"
              sx={{ marginLeft: "12px", color: "#000000" }}
            />
          )}
        </AccessButton>
        <Box sx={{ height: "24px" }} />
        <Typography fontSize="14px" fontWeight={500}>
          Una volta registrato, ti invieremo all'indirizzo email che hai
          indicato su BuonaStrada una email contenente le tue nuove credenziali
          che potrai usare per accedere a questa App.
        </Typography>
      </Box>
    </Form>
  );

  let mainContent = null;
  if (!success) {
    mainContent = RecoveryForm;
  } else {
    mainContent = (
      <Box
        sx={{
          height: "240px",
          maxWidth: "400px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          border: "2px solid",
          borderColor: "agesciGreen.main",
          backgroundColor: "#ffffff",
          padding: "24px",
          borderRadius: "16px",
        }}
      >
        <Typography fontSize="20px" fontWeight={600} color="agesciGreen.main">
          Email inviata!
        </Typography>
        <Box sx={{ height: "20px" }} />
        <Typography
          fontSize="16px"
          fontWeight={400}
          textAlign="center"
          sx={{ mb: "12px" }}
        >
          Ti abbiamo inviato un'email contenente le tue nuove credenziali. Ora
          potrai usarle per accedere all'App RN24!
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Typography fontWeight={900} fontSize="25px" sx={{ mb: "40px" }}>
        Registrati
      </Typography>
      {mainContent}
      <Box sx={{ height: "56px" }} />
      <BackToLogin />
      <ErrorAlert errorMsg={error} onClose={() => setError(null)} />
    </Box>
  );
}
