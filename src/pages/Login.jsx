import { useState, useEffect } from "react";
import { Form, Link as RouterLink, useNavigate } from "react-router-dom";

import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import CircularProgress from "@mui/material/CircularProgress";
import Link from "@mui/material/Link";
import Alert from "@mui/material/Alert";
import Fade from "@mui/material/Fade";

import ToS from "./ToS";
import CheckBox from "../ui/CheckBox";
import TextField from "../ui/TextField";
import AccessButton from "../ui/AccessButton";

import { useAuth, AuthStatus } from "../contexts/auth";

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

export default function Login() {
  const { loginAction, status } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [tos, setTos] = useState(false);
  const [error, setError] = useState(null);
  const [openTos, setOpenTos] = useState(false);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const enableSubmit = username !== "" && password !== "" && tos;

  useEffect(() => {
    if (status !== AuthStatus.LoggedOut) {
      navigate("/");
    }
  }, [status, navigate]);

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
      await loginAction({ username, password });
    } catch (error) {
      setError(
        error?.response?.data?.detail ??
          "Si è verificato un errore, riprova più tardi"
      );
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (status !== AuthStatus.LoggedOut) return <h4>Loading...</h4>;

  if (openTos)
    return (
      <ToS
        onClose={() => setOpenTos(false)}
        onAccept={() => {
          setOpenTos(false);
          setTos(true);
        }}
      />
    );
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
        Accedi a RN24
      </Typography>
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
            <Typography fontSize="14px" fontWeight={600}>
              Codice socio / Alias
            </Typography>
            <TextField
              id="codice-input"
              fullWidth
              value={username}
              onChange={(ev) => {
                setUsername(ev.target.value);
              }}
              placeholder="Inserisci codice socio o alias"
              sx={{
                mt: "8px",
                mb: "24px",
              }}
            />
          </FormControl>
          <FormControl color="agesciPurple">
            <Typography fontSize="14px" fontWeight={600}>
              Password
            </Typography>
            <TextField
              id="password-input"
              fullWidth
              value={password}
              onChange={(ev) => {
                setPassword(ev.target.value);
              }}
              type="password"
              placeholder="Password"
              sx={{
                mt: "8px",
              }}
            />
          </FormControl>

          <Link component={RouterLink} to="/recuperoPassword" underline="none">
            <Typography
              fontSize="14px"
              fontWeight={600}
              sx={{ mt: "8px", textAlign: "right", color: "#000000" }}
            >
              Password dimenticata?
            </Typography>
          </Link>
          <FormGroup sx={{ mt: "40px" }}>
            <FormControlLabel
              control={
                <CheckBox
                  checked={tos}
                  onChange={(ev) => {
                    setTos(ev.target.checked);
                  }}
                />
              }
              label={
                <Typography fontSize="12px">
                  Dichiaro di accettare le{" "}
                  <Button
                    variant="text"
                    component="span"
                    sx={{
                      color: "#6D5095",
                      fontWeight: 500,
                      fontSize: "12px",
                      margin: 0,
                      padding: 0,
                      translate: "0 -1px",
                      textTransform: "none",
                    }}
                    onClick={() => setOpenTos(true)}
                  >
                    condizioni di utilizzo
                  </Button>{" "}
                  dell'app ed acconsentire al trattamento dei dati *
                </Typography>
              }
            />
          </FormGroup>
          <AccessButton
            onClick={handleSubmit}
            disabled={!enableSubmit || loading}
            sx={{ opacity: enableSubmit && !loading ? 1.0 : 0.5 }}
          >
            <Typography fontSize="16px" fontWeight={600}>
              Accedi
            </Typography>
            {loading && (
              <CircularProgress
                size="20px"
                sx={{ marginLeft: "12px", color: "#000000" }}
              />
            )}
          </AccessButton>
        </Box>
      </Form>
      <ErrorAlert errorMsg={error} onClose={() => setError(null)} />
    </Box>
  );
}
