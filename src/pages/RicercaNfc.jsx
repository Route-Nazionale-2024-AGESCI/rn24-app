import Typography from "@mui/material/Typography";
import ContactlessIcon from "@mui/icons-material/Contactless";

export default function RicercaNfc() {
  return (
    <>
      <ContactlessIcon sx={{ fontSize: "40px", color: "#ffffff" }} />
      <Typography
        fontSize="16px"
        fontWeight={600}
        sx={{
          mt: "72px",
          color: "#ffffff",
        }}
      >
        Avvicina al Device della persona che vuoi aggiungere
      </Typography>
    </>
  );
}
