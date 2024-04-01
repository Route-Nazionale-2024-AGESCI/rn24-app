import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { Link as RouterLink } from "react-router-dom";
import Typography from "@mui/material/Typography";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export default function BackToLogin() {
  return (
    <Box
      sx={{
        pt: "24px",
        // borderSize: "1px",
        // borderColor: "#B4B4B4",
        borderTop: "1px solid #B4B4B4",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Button
        variant="text"
        startIcon={<ArrowBackIcon sx={{ color: "#000000" }} />}
        component={RouterLink}
        to="/login"
      >
        <Typography
          fontSize="16px"
          fontWeight={600}
          sx={{ color: "#000000", textTransform: "none" }}
        >
          Torna al Login
        </Typography>
      </Button>
    </Box>
  );
}
