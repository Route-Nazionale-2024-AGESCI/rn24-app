import { Form, Navigate } from "react-router-dom";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import FormControl from "@mui/material/FormControl";

import TextField from "../ui/TextField";
import AccessButton from "../ui/AccessButton";
import BackToLogin from "../ui/BackToLogin";

import { useAuth } from "../contexts/auth";

export default function RecuperoCodice() {
  const { user } = useAuth();
  
  if(user) {
    console.log('non dovresti essere qui');
    return <Navigate to="/" />;
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
        Recupera Codice Socio
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
              Email
            </Typography>
            <TextField
              id="email-input"
              fullWidth
              placeholder="Inserisci email"
              sx={{
                mt: "8px",
              }}
            />
          </FormControl>

          <AccessButton>
            <Typography fontSize="16px" fontWeight={600}>
              Recupera Codice Socio
            </Typography>
          </AccessButton>
          <Box sx={{ height: "56px" }} />
          <BackToLogin />
        </Box>
      </Form>
    </Box>
  );
}
