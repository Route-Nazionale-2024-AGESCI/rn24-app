import { Form, Link as RouterLink } from "react-router-dom";

import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import CheckBox from "../ui/CheckBox";
import Link from "@mui/material/Link";

import TextField from "../ui/TextField";
import AccessButton from "../ui/AccessButton";

export default function Login() {
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
              control={<CheckBox />}
              //required
              label={
                <Typography fontSize="12px">
                  Dichiaro di accettare le condizioni di utilizzo dell'app ed
                  acconsentire al trattamento dei dati *
                </Typography>
              }
            />
          </FormGroup>
          <AccessButton>
            <Typography fontSize="16px" fontWeight={600}>
              Accedi
            </Typography>
          </AccessButton>
        </Box>
      </Form>
    </Box>
  );
}
