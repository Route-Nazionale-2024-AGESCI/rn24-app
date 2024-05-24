import WhitePaper from "../ui/WhitePaper";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";

export default function ToS() {
  return (
    <>
      <Typography
        fontSize={"25px"}
        fontWeight={900}
        ml={"16px"}
        color={"#2B2D2B"}
        alignSelf={"start"}
      >
        Condizioni di utilizzo
      </Typography>
      <WhitePaper
        sx={{
          paddingX: "24px",
          paddingTop: "20px",
          paddingBottom: "20px",
          width: "80%",
          maxWidth: "600px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          minHeight: `calc(100vh - 300px)`,
        }}
      >
        <Box>
          <Typography variant="h3">Condizioni</Typography>
          <Typography variant="body1">Usare con cura</Typography>
          <Typography variant="h4">Privacy</Typography>
          <Typography variant="body2">Solite dell'AGESCI</Typography>
        </Box>
        <Button
          color="agesciPurple"
          variant="contained"
          disableElevation
          component={Link}
          to="/login"
          sx={{
            width: "80px",
            alignSelf: "end",
          }}
        >
          OK
        </Button>
      </WhitePaper>
    </>
  );
}
