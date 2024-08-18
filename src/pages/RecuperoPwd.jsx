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

import { passwordReset } from "../lib/dataManager/pwdReset";

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

// TODO: testare funzionamento della procedura di recupero!!
export default function RecuperoPwd() {
  const [codice, setCodice] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const enableSubmit = codice !== "" && email !== "";

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
      await passwordReset({ codice, email });
      setSuccess(true);
    } catch (error) {
      setError("Si è verificato un errore");
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
        <FormControl color="agesciPurple" sx={{ mt: "20px" }}>
          <Typography id="email-label" fontSize="14px" fontWeight={600}>
            Email
          </Typography>
          <TextField
            id="email-input"
            onChange={(ev) => {
              setEmail(ev.target.value);
            }}
            fullWidth
            placeholder="Email censimento AGESCI"
            sx={{
              mt: "8px",
            }}
            inputProps={{ "aria-labelledby": "email-label" }}
          />
        </FormControl>
        {/* <Link component={RouterLink} to="/recuperoCodice" underline="none">
      <Typography
        fontSize="14px"
        fontWeight={600}
        sx={{ mt: "8px", textAlign: "right", color: "#000000" }}
      >
        Codice socio o alias dimenticati?
      </Typography>
    </Link> */}
        <AccessButton
          disabled={!enableSubmit || loading}
          sx={{ opacity: enableSubmit && !loading ? 1.0 : 0.5 }}
          onClick={handleSubmit}
        >
          <Typography fontSize="16px" fontWeight={600}>
            Recupera Password
          </Typography>
          {loading && (
            <CircularProgress
              size="20px"
              sx={{ marginLeft: "12px", color: "#000000" }}
            />
          )}
        </AccessButton>
        <Box sx={{height: '24px'}} />
        <Typography fontSize="14px" fontWeight={500}>
          Ricorda: per poter accedere o recuperare la tua password, devi prima aver effettuato l'accesso almeno una volta all'App AGESCI
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
          Ti abbiamo inviato un'email per resettare la tua password.
        </Typography>
        <Typography fontSize="16px" fontWeight={400} textAlign="center">
          Segui attentamente le istruzioni e scegli la tua nuova password, poi
          potrai usarla per accedere all'App RN24.
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
        Recupera Password
      </Typography>
      {mainContent}
      <Box sx={{ height: "56px" }} />
      <BackToLogin />
      <ErrorAlert errorMsg={error} onClose={() => setError(null)} />
    </Box>
  );
}
