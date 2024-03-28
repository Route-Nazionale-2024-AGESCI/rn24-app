import { useRouteError } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import HomeIcon from "@mui/icons-material/Home";
import CardButton from "./CardButton";
export default function RootError() {
  const error = useRouteError();
  console.error(error);
  return (
    <Container
      sx={{
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography
        variant="h4"
        fontSize="20px"
        fontWeight={700}
        sx={{ mb: "30px", mt: "40px" }}
      >
        Ops!
      </Typography>
      <Typography
        variant="h6"
        fontSize="16px"
        fontWeight={500}
        sx={{ mb: "16px" }}
      >
        Si è verificato un errore...
      </Typography>
      <Typography
        variant="body2"
        fontSize="14px"
        fontWeight={400}
        sx={{ mb: "40px" }}
      >
        {error.statusText || error.message}
      </Typography>
      <CardButton
        icon={<HomeIcon />}
        text="Torna alla Home"
        bgColor="agesciPurple"
        to="/"
      />
    </Container>
  );
}
