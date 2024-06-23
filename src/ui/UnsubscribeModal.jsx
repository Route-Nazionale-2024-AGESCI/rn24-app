// import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Typography from "@mui/material/Typography";

import AccessButton from "./AccessButton";

export default function UnsubscribeModal({ open, onClose, unsubscribe }) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="unsubscribe-dialog-title"
      slotProps={{
        backdrop: { style: { backgroundColor: "rgba(109, 80, 149, 0.3)" } },
      }}
    >
      <DialogTitle id="unsubscribe-dialog-title" textAlign={"center"}>
        <Typography fontSize={"20px"} fontWeight={600}>
          Vuoi davvero cancellare l'iscrizione all'evento?
        </Typography>
      </DialogTitle>
      <DialogContent>
        <DialogContentText sx={{ fontSize: "16px", color: "#000000" }}>
          Se l'evento ha un numero di posti limitato, potresti non poterti più
          iscrivere
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        {/* <Button autoFocus onClick={onClose}>
          <Typography
            fontSize="16px"
            fontWeight={400}
            color="agesciPurple.main"
          >
            Annulla
          </Typography>
        </Button> */}
        <AccessButton
          onClick={unsubscribe}
          autoFocus
          sx={{
            my: "16px",
            color: "agesciRed.main",
            borderColor: "agesciRed.main",
            width: "85%",
            maxWidth: "400px",
          }}
        >
          <Typography fontSize="16px" fontWeight={600} color="agesciRed.main">
            Conferma Eliminzione
          </Typography>
        </AccessButton>
      </DialogActions>
    </Dialog>
  );
}
