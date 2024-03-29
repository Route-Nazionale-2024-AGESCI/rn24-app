import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { Link as RouterLink } from "react-router-dom";
import Typography from "@mui/material/Typography";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
export default function BackToOtherMethods() {
  return (
    <Box
      sx={{
        mt: "40px",
        ml: "24px",
      }}
    >
      <Button
        variant="text"
        startIcon={<ArrowBackIcon />}
        component={RouterLink}
      >
        Torna agli altri metodi
      </Button>
    </Box>
  );
}
