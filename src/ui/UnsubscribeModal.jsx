import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Typography from "@mui/material/Typography";

export default function UnsubscribeModal({ open, onClose, unsubscribe }) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="unsubscribe-dialog-title"
    >
      <DialogTitle id="unsubscribe-dialog-title">
        <Typography
          fontSize={"20px"}
          fontWeight={600}
          color={"agesciPurple.main"}
        >
          Vuoi davvero cancellare l'iscrizione all'evento?
        </Typography>
      </DialogTitle>
      <DialogContent>
        <DialogContentText
          sx={{ fontSize: "14px", fontWeight: 400, color: "#2B2B2B" }}
        >
          Se l'evento ha un numero di posti limitato, potresti non poterti più
          iscrivere
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={onClose}>
          <Typography
            fontSize="16px"
            fontWeight={400}
            color="agesciPurple.main"
          >
            Annulla
          </Typography>
        </Button>
        <Button onClick={unsubscribe} autoFocus>
          <Typography fontSize="16px" fontWeight={600} color="agesciRed.main">
            Cancella
          </Typography>
        </Button>
      </DialogActions>
    </Dialog>
  );
}
