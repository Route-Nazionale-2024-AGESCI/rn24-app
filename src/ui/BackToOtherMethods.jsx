import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export default function BackToOtherMethods({
  back,
  backText = "Torna agli altri metodi",
}) {
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        mt: "40px",
        ml: "24px",
      }}
    >
      <Button
        variant="text"
        startIcon={<ArrowBackIcon sx={{ color: "#ffffff" }} />}
        component={RouterLink}
        onClick={() => navigate(-1)}
      >
        <Typography
          fontSize="16px"
          fontWeight={600}
          sx={{ color: "#ffffff", textTransform: "none" }}
        >
          {backText}
        </Typography>
      </Button>
    </Box>
  );
}
