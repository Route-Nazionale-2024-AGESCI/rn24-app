import { useRef, useState, useEffect } from "react";
import { Form, Link as RouterLink, useNavigate } from "react-router-dom";

import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import CheckBox from "../ui/CheckBox";
import Link from "@mui/material/Link";

import TextField from "../ui/TextField";
import AccessButton from "../ui/AccessButton";

import { useAuth, AuthStatus } from "../contexts/auth";

export default function Login() {
  const { loginAction, status } = useAuth();
  const usernameRef = useRef(null);
  const passwordRef = useRef(null);
  const tosRef = useRef(null);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (status !== AuthStatus.LoggedOut) {
      navigate("/");
    }
  }, [status, navigate]);

  const handleSubmit = async () => {
    const username = usernameRef.current.value;
    const password = passwordRef.current.value;

    // TODO: migliorare visualizzazione errori
    if (username === "" || password === "" || !tosRef.current?.checked) {
      alert("Campi obbligatori!");
      return;
    }
    setLoading(true);
    try {
      await loginAction({ username, password });
    } catch (error) {
      alert("ERRORE!");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading || status !== AuthStatus.LoggedOut)
    // TODO: to improve
    return <h4>Loading...</h4>;

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
              placeholder="Inserisci codice socio o alias"
              sx={{
                mt: "8px",
                mb: "24px",
              }}
              inputRef={usernameRef}
            />
          </FormControl>
          <FormControl color="agesciPurple">
            <Typography fontSize="14px" fontWeight={600}>
              Password
            </Typography>
            <TextField
              id="password-input"
              fullWidth
              type="password"
              placeholder="Password"
              sx={{
                mt: "8px",
              }}
              inputRef={passwordRef}
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
              control={<CheckBox inputRef={tosRef} />}
              label={
                <Typography fontSize="12px">
                  Dichiaro di accettare le condizioni di utilizzo dell'app ed
                  acconsentire al trattamento dei dati *
                </Typography>
              }
            />
          </FormGroup>
          <AccessButton onClick={handleSubmit}>
            <Typography fontSize="16px" fontWeight={600}>
              Accedi
            </Typography>
          </AccessButton>
        </Box>
      </Form>
    </Box>
  );
}
