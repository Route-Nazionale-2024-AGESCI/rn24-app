import { Outlet, useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import BackToOtherMethods from "../../ui/BackToOtherMethods";

const ColorLayout = ({ back, color, backText }) => (
  <Box
    sx={{
      minHeight: "100vh",
      mb: "-80px",
      display: "flex",
      flexDirection: "column",
      bgcolor: color,
    }}
  >
    <BackToOtherMethods back={back} backText={backText} />
    <Box
      sx={{
        textAlign: "center",
        flexGrow: "1",
        display: "flex",
        flexDirection: "column",
        justifyContent: "start",
        alignItems: "center",
        paddingTop: "40px",
      }}
    >
      <Outlet />
    </Box>
  </Box>
);

export function PurpleLayout({ back, backText }) {
  return (
    <ColorLayout back={back} backText={backText} color="agesciPurple.main" />
  );
}

export function BadgeLayout() {
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        minHeight: "100vh",
        mb: "-80px",
        display: "flex",
        flexDirection: "column",
        bgcolor: "agesciPurple.main",
      }}
    >
      <Box
        sx={{
          mt: "40px",
          ml: "24px",
        }}
      >
        <Button
          variant="text"
          startIcon={<ArrowBackIcon sx={{ color: "#ffffff" }} />}
          onClick={() => navigate(-1)}
        >
          <Typography
            fontSize="16px"
            fontWeight={600}
            sx={{ color: "#ffffff", textTransform: "none" }}
          >
            Indietro
          </Typography>
        </Button>
      </Box>
      <Box
        sx={{
          textAlign: "center",
          flexGrow: "1",
          display: "flex",
          flexDirection: "column",
          justifyContent: "start",
          alignItems: "center",
          paddingTop: "40px",
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
}

export function RedLayout({ back, backText }) {
  return <ColorLayout back={back} backText={backText} color="agesciRed.main" />;
}

export function GreenLayout({ back, backText }) {
  return (
    <ColorLayout back={back} backText={backText} color="agesciGreen.main" />
  );
}
