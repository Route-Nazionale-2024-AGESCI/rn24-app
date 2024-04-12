import { Link as RouterLink } from "react-router-dom";
import Button from "@mui/material/Button";

export default function BoxButton({ bgColor, icon, text, to, big = false }) {
  return (
    <Button
      color={bgColor}
      sx={{
        maxWidth: big ? "532px" : "260px",
        width: big ? "90%" : "45%",
        height: "130px",
        borderRadius: "8px",
        textTransform: "none",
        fontSize: "14px",
        lineHeight: "16px",
        fontWeight: "600",
        display: "flex",
        flexDirection: "column",
        gap: "8px",
        justifyContent: "center",
        textAlign: "center",
      }}
      component={RouterLink}
      to={to}
      variant="contained"
      disableElevation
    >
      {icon}
      {text}
    </Button>
  );
}
