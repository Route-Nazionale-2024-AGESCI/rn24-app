import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Typography from "@mui/material/Typography";

export default function UnsubscribeModal({ open, onClose, unsubscribe }) {
  return (
    <Dialog open={open} onClose={onClose} aria-labelledby="logout-dialog-title">
      <DialogTitle id="logout-dialog-title">
        <Typography
          fontSize={"20px"}
          fontWeight={600}
          color={"agesciPurple.main"}
        >
          Vuoi davvero cancellare l'iscrizione all'evento?
        </Typography>
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          <Typography fontSize="14px" fontWeight={400} color="#2B2D2B">
            Se l'evento ha un numero di posti limitato, potresti non poterti più
            iscrivere
          </Typography>
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
            Cancella iscrizione
          </Typography>
        </Button>
      </DialogActions>
    </Dialog>
  );
}
