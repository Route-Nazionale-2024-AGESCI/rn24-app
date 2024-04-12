import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { Link as RouterLink } from "react-router-dom";
import Typography from "@mui/material/Typography";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export default function BackToOtherMethods({ back }) {
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
        to={back}
      >
        <Typography
          fontSize="16px"
          fontWeight={600}
          sx={{ color: "#ffffff", textTransform: "none" }}
        >
          Torna agli altri metodi
        </Typography>
      </Button>
    </Box>
  );
}
