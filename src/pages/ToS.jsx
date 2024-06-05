import WhitePaper from "../ui/WhitePaper";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";

// TODO: richiedere contenuto alla pattuglia competente
export default function ToS({ onClose, onAccept }) {
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
        <Stack direction="row" justifyContent="end" gap="20px">
          <Button
            color="agesciPurple"
            variant="outlined"
            disableElevation
            onClick={onClose}
            sx={{
              width: "100px",
              alignSelf: "end",
              textTransform: "none",
            }}
          >
            Chiudi
          </Button>
          <Button
            color="agesciPurple"
            variant="contained"
            disableElevation
            onClick={onAccept}
            sx={{
              width: "100px",
              alignSelf: "end",
              textTransform: "none",
            }}
          >
            Accetto
          </Button>
        </Stack>
      </WhitePaper>
    </>
  );
}
