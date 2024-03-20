import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActionArea from "@mui/material/CardActionArea";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import Box from "@mui/material/Box";

export default function CardButton({ text, icon, bgColor }) {
  return (
    <Button
      sx={{
        maxWidth: "400px",
        height: "64px",
        borderRadius: "8px",
        width: "100%",
        textTransform: "none",
        fontSize: "14px",
        fontWeight: "600",
        fontFamily: ["Montserrat"],
        display: "flex",
        justifyContent: "start",
        pl: "16px",
        //bgcolor: bgColor,
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
    ></CardButton>
  );
}
