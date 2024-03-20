import Button from "@mui/material/Button";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import QrCodeIcon from "@mui/icons-material/QrCode";
import MenuBookIcon from "@mui/icons-material/MenuBook";

export default function CardButton({ text, icon, bgColor }) {
  return (
    <Button
      sx={{
        maxWidth: "400px",
        height: "64px",
        borderRadius: "8px",
        width: "100%",
        textTransform: "none",
        lineHeight: "16px",
        fontSize: "14px",
        fontWeight: "600",
        fontFamily: ["Montserrat"],
        display: "flex",
        justifyContent: "start",
        pl: "16px",
      }}
      disableElevation
      color={bgColor}
      variant="contained"
      startIcon={icon}
    >
      {/* <CardActionArea>
        <CardContent> */}
      {/* <Stack direction="row" spacing="16px"> */}
      {/* <Box
              sx={{
                borderRadius: "200px",
                bgcolor: "#334455",
                height: "40px",
                width: "40px",
                p: "10px 12px 10px 12px",
                // display: "flex",
                // justifyContent: "center",
                // alignItems: "center",
              }}
            > */}
      {/* {icon} */}
      {/* </Box> */}
      {/* <Typography variant="h6" fontWeight={600} fontSize={14}> */}
      {text}
      {/* </Typography> */}
      {/* </Stack> */}
      {/* </CardContent>
      </CardActionArea> */}
    </Button>
  );
}

export function AddContactButton() {
  return (
    <CardButton
      text="Aggiungi Contatto"
      bgColor="agesciPurple"
      icon={<PersonAddAlt1Icon sx={{ mr: "16px" }} />}
    />
  );
}

export function QrCodeButton() {
  return (
    <CardButton
      text="Scansiona QR Code"
      bgColor="agesciRed"
      icon={<QrCodeIcon sx={{ mr: "8px" }} />}
    />
  );
}

export function BookletButton() {
  return (
    <CardButton
      text="Consulta il Libretto"
      bgColor="agesciGreen"
      icon={<MenuBookIcon sx={{ mr: "8px" }} />}
    />
  );
}
